import "server-only";

// Server-managed integration secrets. Set in the admin console (stored in
// Upstash/KV when configured, else in-memory for the session) and/or via env.
// Raw values NEVER leave the server — the API only ever returns masked status.

export interface IntegrationSettings {
  anthropicPrimary?: string;
  anthropicFallback?: string;
  stripeSecret?: string;
  stripeWebhookSecret?: string;
}

const KEY = "iqcdl:settings:v1";
let memory: IntegrationSettings = {};

function redisCreds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis(redisCreds()!);
}

export async function loadSettings(): Promise<IntegrationSettings> {
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      return (await redis.get<IntegrationSettings>(KEY)) ?? {};
    } catch (err) {
      console.error("Settings Redis load failed, using memory:", err);
    }
  }
  return memory;
}

// Only overwrites keys that are provided (non-empty). Empty/undefined = leave as-is.
export async function saveSettings(patch: Partial<IntegrationSettings>): Promise<void> {
  const current = await loadSettings();
  const next: IntegrationSettings = { ...current };
  for (const k of ["anthropicPrimary", "anthropicFallback", "stripeSecret", "stripeWebhookSecret"] as const) {
    const v = patch[k];
    if (typeof v === "string" && v.trim()) next[k] = v.trim();
  }
  memory = next;
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, next);
    } catch (err) {
      console.error("Settings Redis save failed:", err);
    }
  }
}

function mask(v?: string): { set: boolean; hint: string } {
  if (!v) return { set: false, hint: "" };
  const last4 = v.slice(-4);
  return { set: true, hint: `••••${last4}` };
}

export async function maskedStatus() {
  const s = await loadSettings();
  return {
    anthropicPrimary: mask(s.anthropicPrimary || process.env.ANTHROPIC_API_KEY),
    anthropicFallback: mask(s.anthropicFallback || process.env.ANTHROPIC_API_KEY_FALLBACK),
    stripeSecret: mask(s.stripeSecret || process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: mask(s.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET),
    // surface where each value comes from (without leaking the value)
    sources: {
      anthropicPrimary: s.anthropicPrimary ? "admin" : process.env.ANTHROPIC_API_KEY ? "env" : "none",
      anthropicFallback: s.anthropicFallback ? "admin" : process.env.ANTHROPIC_API_KEY_FALLBACK ? "env" : "none",
      stripeSecret: s.stripeSecret ? "admin" : process.env.STRIPE_SECRET_KEY ? "env" : "none",
      stripeWebhookSecret: s.stripeWebhookSecret ? "admin" : process.env.STRIPE_WEBHOOK_SECRET ? "env" : "none",
    },
  };
}

// Accessors used by the AI/payment code. Admin-set values take precedence over env.
export async function getAnthropicKeys(): Promise<string[]> {
  const s = await loadSettings();
  const primary = s.anthropicPrimary || process.env.ANTHROPIC_API_KEY;
  const fallback = s.anthropicFallback || process.env.ANTHROPIC_API_KEY_FALLBACK;
  return [primary, fallback].filter((k): k is string => !!k && k.trim().length > 0);
}

export async function getStripeKey(): Promise<string | undefined> {
  const s = await loadSettings();
  return s.stripeSecret || process.env.STRIPE_SECRET_KEY || undefined;
}

export async function getStripeWebhookSecret(): Promise<string | undefined> {
  const s = await loadSettings();
  return s.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET || undefined;
}
