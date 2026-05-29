import "server-only";
import { Redis } from "@upstash/redis";

/**
 * Email outbox — persistent log of every email we send from the admin console.
 * Each entry is keyed by Resend message id (when available) so webhook events
 * can update its status in place. Falls back to in-memory when Upstash isn't
 * configured (dev / preview).
 *
 * Stored under the Redis key `iqcdl:outbox:v1` as a list of OutboxEntry objects.
 */

export type OutboxStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "opened"
  | "clicked"
  | "bounced"
  | "complained"
  | "failed";

export interface OutboxEntry {
  id: string;
  /** Resend message id once known (also matches the webhook `email_id`). */
  resendId?: string;
  to: string[];
  from: string;
  subject: string;
  bodyHtml: string;
  cohort?: string;
  status: OutboxStatus;
  /** Free-form status notes (e.g. Resend error string). */
  reason?: string;
  /** ISO timestamps. */
  createdAt: string;
  lastEventAt?: string;
  /** Per-recipient mini-stats from webhook events. */
  events?: { type: OutboxStatus; at: string; recipient?: string }[];
  /** Set when an admin marked it as draft / test send. */
  test?: boolean;
}

const KEY = "iqcdl:outbox:v1";
const MAX_ENTRIES = 500;

function redisCreds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

let memory: OutboxEntry[] = [];

async function readAll(): Promise<OutboxEntry[]> {
  const creds = redisCreds();
  if (!creds) return memory;
  try {
    const redis = new Redis(creds);
    return (await redis.get<OutboxEntry[]>(KEY)) ?? [];
  } catch (err) {
    console.error("outbox redis read failed:", err);
    return memory;
  }
}

async function writeAll(entries: OutboxEntry[]): Promise<void> {
  const trimmed = entries.slice(0, MAX_ENTRIES);
  memory = trimmed;
  const creds = redisCreds();
  if (!creds) return;
  try {
    const redis = new Redis(creds);
    await redis.set(KEY, trimmed);
  } catch (err) {
    console.error("outbox redis write failed:", err);
  }
}

export async function listOutbox(limit = 100): Promise<OutboxEntry[]> {
  const all = await readAll();
  return all.slice(0, limit);
}

export async function appendOutbox(entry: OutboxEntry): Promise<void> {
  const all = await readAll();
  await writeAll([entry, ...all]);
}

export async function updateOutboxByResendId(
  resendId: string,
  patch: Partial<OutboxEntry> & { eventType?: OutboxStatus; eventRecipient?: string },
): Promise<void> {
  const all = await readAll();
  const idx = all.findIndex((e) => e.resendId === resendId);
  if (idx === -1) return;
  const cur = all[idx];
  const events = cur.events ?? [];
  if (patch.eventType) {
    events.push({
      type: patch.eventType,
      at: new Date().toISOString(),
      recipient: patch.eventRecipient,
    });
  }
  const next: OutboxEntry = {
    ...cur,
    ...patch,
    events,
    lastEventAt: new Date().toISOString(),
  };
  // Remove transient patch helpers.
  delete (next as Partial<OutboxEntry> & { eventType?: OutboxStatus }).eventType;
  delete (next as Partial<OutboxEntry> & { eventRecipient?: string }).eventRecipient;
  all[idx] = next;
  await writeAll(all);
}

/** Look up the most recent outbox entry sent to a particular recipient. */
export async function lastContactedAt(email: string): Promise<string | null> {
  const all = await readAll();
  const target = email.trim().toLowerCase();
  const hit = all.find((e) => e.to.some((r) => r.trim().toLowerCase() === target));
  return hit?.createdAt ?? null;
}
