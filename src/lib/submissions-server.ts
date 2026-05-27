import "server-only";

export type SubmissionKind = "evidence" | "award";

export interface FileRef {
  name: string;
  url: string | null;
}

export interface Submission {
  id: string;
  kind: SubmissionKind;
  createdAt: string;
  // Common contact / verification
  org: string;
  contactName: string;
  officialEmail: string;
  phone: string;
  country: string;
  // Evidence (IQCI) specifics
  pillar?: string;
  claim?: string;
  // Award (GQA) specifics
  category?: string;
  title?: string;
  summary?: string;
  // Attachments (passport, evidence docs, deck, etc.)
  files: FileRef[];
  // AI jury output
  aiScore?: number;
  aiVerdict?: string;
  aiNeedsEvidence?: boolean;
}

const KEY = "iqcdl:submissions:v1";

let memory: Submission[] | null = null;

function redisCreds(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis(redisCreds()!);
}

export async function listSubmissions(): Promise<Submission[]> {
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      const stored = (await redis.get<Submission[]>(KEY)) ?? [];
      return stored;
    } catch (err) {
      console.error("Submissions Redis load failed, using memory:", err);
    }
  }
  if (!memory) memory = [];
  return memory;
}

export async function addSubmission(s: Submission): Promise<void> {
  const all = await listSubmissions();
  const next = [s, ...all].slice(0, 500);
  memory = next;
  if (redisCreds()) {
    try {
      const redis = await getRedis();
      await redis.set(KEY, next);
    } catch (err) {
      console.error("Submissions Redis save failed:", err);
    }
  }
}
