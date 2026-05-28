import "server-only";
import { randomBytes } from "node:crypto";

export type OutreachSegment = "minister" | "policymaker" | "partner" | "sponsor";
export type OutreachStatus =
  | "queued"
  | "in-sequence"
  | "engaged" // opened or clicked
  | "replied"
  | "dormant"
  | "unsubscribed";

export interface OutreachTarget {
  id: string;
  /** Recipient name (or contact name at the org). */
  name: string;
  /** Title / role — e.g. "Minister of Digital Economy". */
  title?: string;
  /** Organisation or ministry. */
  org: string;
  country?: string;
  email: string;
  segment: OutreachSegment;
  language?: string;
  /** Optional human notes (admin). */
  notes?: string;
  createdAt: string;

  // Sequencing
  /** 0 = nothing sent yet; 1 = after touch 1; up to 3. */
  step: number;
  status: OutreachStatus;
  nextSendAt: string; // ISO
  lastSentAt?: string;
  /** Last Resend message id we sent (useful for cross-referencing webhooks). */
  lastMessageId?: string;
  /** Token used to identify the target via click-tracking and inbound mail (+id alias). */
  token: string;

  // Engagement
  openedAt?: string;
  lastClickAt?: string;
  clickCount: number;
  repliedAt?: string;
}

/** Number of days to wait between touches. */
export const TOUCH_DELAYS_DAYS = [5, 6, 7];

const KEY = "iqcdl:outreach:v1";
let memory: OutreachTarget[] | null = null;

function redisCreds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis(redisCreds()!);
}

async function persist(next: OutreachTarget[]): Promise<void> {
  memory = next;
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, next);
    } catch (err) {
      console.error("Outreach Redis save failed:", err);
    }
  }
}

export async function listTargets(): Promise<OutreachTarget[]> {
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      return (await redis.get<OutreachTarget[]>(KEY)) ?? [];
    } catch (err) {
      console.error("Outreach Redis load failed, using memory:", err);
    }
  }
  return memory ?? (memory = []);
}

export async function addTarget(input: {
  name: string;
  title?: string;
  org: string;
  country?: string;
  email: string;
  segment: OutreachSegment;
  language?: string;
  notes?: string;
}): Promise<OutreachTarget> {
  const all = await listTargets();
  const email = input.email.trim().toLowerCase();
  const existing = all.find((t) => t.email === email);
  if (existing) return existing;

  const target: OutreachTarget = {
    id: `IQCDL-O-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    name: input.name.trim(),
    title: input.title?.trim(),
    org: input.org.trim(),
    country: input.country?.trim(),
    email,
    segment: input.segment,
    language: input.language?.trim(),
    notes: input.notes?.trim(),
    createdAt: new Date().toISOString(),
    step: 0,
    status: "queued",
    nextSendAt: new Date().toISOString(),
    token: randomBytes(14).toString("hex"),
    clickCount: 0,
  };
  const next = [target, ...all].slice(0, 10_000);
  await persist(next);
  return target;
}

export async function updateTarget(
  id: string,
  patch: Partial<OutreachTarget>,
): Promise<OutreachTarget | null> {
  const all = await listTargets();
  const idx = all.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const next = [...all];
  next[idx] = { ...all[idx], ...patch, id: all[idx].id };
  await persist(next);
  return next[idx];
}

export async function deleteTarget(id: string): Promise<boolean> {
  const all = await listTargets();
  const next = all.filter((t) => t.id !== id);
  if (next.length === all.length) return false;
  await persist(next);
  return true;
}

export async function findByToken(token: string): Promise<OutreachTarget | null> {
  if (!token) return null;
  const all = await listTargets();
  return all.find((t) => t.token === token) ?? null;
}

export async function findByEmail(email: string): Promise<OutreachTarget | null> {
  if (!email) return null;
  const norm = email.trim().toLowerCase();
  const all = await listTargets();
  return all.find((t) => t.email === norm) ?? null;
}

export async function markOpened(targetId: string): Promise<void> {
  await updateTarget(targetId, {
    openedAt: new Date().toISOString(),
    status: "engaged",
  });
}

export async function markClicked(targetId: string): Promise<void> {
  const all = await listTargets();
  const t = all.find((x) => x.id === targetId);
  if (!t) return;
  await updateTarget(targetId, {
    lastClickAt: new Date().toISOString(),
    clickCount: t.clickCount + 1,
    status: "engaged",
  });
}

export async function markReplied(targetId: string): Promise<void> {
  await updateTarget(targetId, {
    repliedAt: new Date().toISOString(),
    status: "replied",
  });
}

export function nextSendForStep(step: number): string {
  if (step < 1 || step > TOUCH_DELAYS_DAYS.length) {
    return new Date(Date.now() + 60_000).toISOString(); // safety: 1m fallback
  }
  const days = TOUCH_DELAYS_DAYS[step - 1];
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}
