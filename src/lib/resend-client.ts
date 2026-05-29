import "server-only";

/**
 * Thin wrapper around the Resend SDK. Uses RESEND_API_KEY from env.
 *
 * The dashboard / outreach features depend on this — when no key is set, the
 * helpers return a clear error so the UI can fall back to "demo mode" instead
 * of crashing.
 */

export const DEFAULT_FROM =
  process.env.RESEND_FROM || "IQCDL <admin@iqcdl.org>";

export function resendKey(): string | null {
  return process.env.RESEND_API_KEY?.trim() || null;
}

export interface SendInput {
  to: string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  /** Resend tag list — useful for cohort analytics. */
  tags?: { name: string; value: string }[];
}

export interface SendResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(input: SendInput): Promise<SendResult> {
  const key = resendKey();
  if (!key) {
    return { ok: false, error: "RESEND_API_KEY not set" };
  }
  try {
    const { Resend } = await import("resend");
    const client = new Resend(key);
    const res = await client.emails.send({
      from: input.from || DEFAULT_FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
      tags: input.tags,
    });
    if (res.error) return { ok: false, error: String(res.error.message ?? res.error) };
    return { ok: true, messageId: res.data?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
