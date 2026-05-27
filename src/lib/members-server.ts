import "server-only";

export interface MemberRecord {
  id: string;
  email: string;
  name: string;
  product: string;
  status: "active" | "canceled";
  createdAt: string;
  stripeCustomerId?: string;
}

const KEY = "iqcdl:members:v1";
let memory: MemberRecord[] | null = null;

function redisCreds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis(redisCreds()!);
}

export async function listMembers(): Promise<MemberRecord[]> {
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      return (await redis.get<MemberRecord[]>(KEY)) ?? [];
    } catch (err) {
      console.error("Members Redis load failed, using memory:", err);
    }
  }
  return memory ?? (memory = []);
}

// Upserts a member by email (idempotent — webhooks can be delivered more than once).
export async function upsertMember(input: {
  email: string;
  name?: string;
  product?: string;
  stripeCustomerId?: string;
}): Promise<MemberRecord> {
  const all = await listMembers();
  const email = input.email.trim().toLowerCase();
  const existing = all.find((m) => m.email === email);
  const record: MemberRecord = existing ?? {
    id: `IQCDL-M-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    email,
    name: input.name ?? "Member",
    product: input.product ?? "membership",
    status: "active",
    createdAt: new Date().toISOString(),
    stripeCustomerId: input.stripeCustomerId,
  };
  if (existing) {
    existing.status = "active";
    if (input.name) existing.name = input.name;
    if (input.stripeCustomerId) existing.stripeCustomerId = input.stripeCustomerId;
  }
  const next = existing ? all : [record, ...all].slice(0, 5000);
  memory = next;
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, next);
    } catch (err) {
      console.error("Members Redis save failed:", err);
    }
  }
  return record;
}

export async function setMemberStatusByCustomer(
  stripeCustomerId: string,
  status: "active" | "canceled",
): Promise<void> {
  const all = await listMembers();
  const m = all.find((x) => x.stripeCustomerId === stripeCustomerId);
  if (!m) return;
  m.status = status;
  memory = all;
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, all);
    } catch (err) {
      console.error("Members Redis status update failed:", err);
    }
  }
}
