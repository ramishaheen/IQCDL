import "server-only";

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const KEY = "iqcdl:contacts:v1";
let memory: ContactRecord[] | null = null;

function redisCreds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis(redisCreds()!);
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
  };
  const all = await listContacts();
  const next = [record, ...all].slice(0, 5000);
  memory = next;
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, next);
    } catch (err) {
      console.error("Contacts Redis save failed:", err);
    }
  }
  return record;
}
