import "server-only";
import { SEED, type PortalData } from "@/lib/portal-data";

const KEY = "iqcdl:portal:v1";

// In-memory fallback (per server instance) when no Redis is configured.
let memory: PortalData | null = null;

// Accept either the Upstash Marketplace names or Vercel KV names.
function redisCreds(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

function redisConfigured(): boolean {
  return redisCreds() !== null;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis(redisCreds()!);
}

export async function loadState(): Promise<PortalData> {
  if (redisConfigured()) {
    try {
      const redis = await getRedis();
      const stored = await redis.get<PortalData>(KEY);
      if (stored) return stored;
      await redis.set(KEY, SEED);
      return SEED;
    } catch (err) {
      console.error("Portal Redis load failed, using memory:", err);
    }
  }
  if (!memory) memory = structuredClone(SEED);
  return memory;
}

export async function saveState(data: PortalData): Promise<void> {
  memory = data;
  if (redisConfigured()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, data);
    } catch (err) {
      console.error("Portal Redis save failed:", err);
    }
  }
}

export async function findCertificateByToken(token: string) {
  const state = await loadState();
  const t = token.trim().toUpperCase();
  return state.certificates.find((c) => c.token.toUpperCase() === t) ?? null;
}

export function isServerBacked(): boolean {
  return true;
}
