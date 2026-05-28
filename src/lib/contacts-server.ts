import "server-only";
import { randomBytes } from "node:crypto";

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  /** Marketing-drip state */
  sequenceStep: number;
  /** When the next marketing email is due (ISO). */
  nextSendAt: string;
  lastSentAt?: string;
  lastTopic?: string;
  /** Set once the person has joined as a member, or an admin tagged them. */
  converted: boolean;
  convertedAt?: string;
  convertedReason?: "member" | "admin-tag";
  unsubscribed: boolean;
  unsubscribeToken: string;
}

const KEY = "iqcdl:contacts:v1";
let memory: ContactRecord[] | null = null;

/** Random delay in ms between 3 and 6 days. */
export function nextSendDelayMs(): number {
  const minDays = 3;
  const maxDays = 6;
  const days = minDays + Math.random() * (maxDays - minDays);
  return Math.floor(days * 24 * 60 * 60 * 1000);
}

function redisCreds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis(redisCreds()!);
}

async function persist(next: ContactRecord[]): Promise<void> {
  memory = next;
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, next);
    } catch (err) {
      console.error("Contacts Redis save failed:", err);
    }
  }
}

export async function listContacts(): Promise<ContactRecord[]> {
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      return (await redis.get<ContactRecord[]>(KEY)) ?? [];
    } catch (err) {
      console.error("Contacts Redis load failed, using memory:", err);
    }
  }
  return memory ?? (memory = []);
}

export async function addContact(input: {
  name: string;
  email: string;
  phone: string;
}): Promise<ContactRecord> {
  const record: ContactRecord = {
    id: `IQCDL-C-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    createdAt: new Date().toISOString(),
    sequenceStep: 0,
    nextSendAt: new Date(Date.now() + nextSendDelayMs()).toISOString(),
    converted: false,
    unsubscribed: false,
    unsubscribeToken: randomBytes(18).toString("hex"),
  };
  const all = await listContacts();
  const next = [record, ...all].slice(0, 5000);
  await persist(next);
  return record;
}

export async function updateContact(
  id: string,
  patch: Partial<ContactRecord>,
): Promise<ContactRecord | null> {
  const all = await listContacts();
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const updated: ContactRecord = { ...all[idx], ...patch, id: all[idx].id };
  const next = [...all];
  next[idx] = updated;
  await persist(next);
  return updated;
}

/** Mark the contact as converted (drip stops; cross-sell drip starts). */
export async function markConverted(
  emailOrId: string,
  reason: "member" | "admin-tag",
): Promise<ContactRecord | null> {
  const all = await listContacts();
  const norm = emailOrId.trim().toLowerCase();
  const idx = all.findIndex(
    (c) => c.id === emailOrId || c.email === norm,
  );
  if (idx === -1) return null;
  if (all[idx].converted) return all[idx];
  const updated: ContactRecord = {
    ...all[idx],
    converted: true,
    convertedAt: new Date().toISOString(),
    convertedReason: reason,
  };
  const next = [...all];
  next[idx] = updated;
  await persist(next);
  return updated;
}

export async function findByUnsubscribeToken(
  token: string,
): Promise<ContactRecord | null> {
  if (!token) return null;
  const all = await listContacts();
  return all.find((c) => c.unsubscribeToken === token) ?? null;
}
