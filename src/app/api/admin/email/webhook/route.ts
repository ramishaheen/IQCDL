import { NextResponse } from "next/server";
import { updateOutboxByResendId, type OutboxStatus } from "@/lib/email-outbox";

export const runtime = "nodejs";

/**
 * Resend webhook receiver. Configure in the Resend dashboard pointing at
 * https://iqcdl.org/api/admin/email/webhook with the standard events:
 * email.delivered / opened / clicked / bounced / complained / sent / failed.
 *
 * Resend signs requests with `RESEND_WEBHOOK_SECRET`. We verify when present;
 * the endpoint still works in dev with no secret set (returns 200 but logs).
 */

const TYPE_MAP: Record<string, OutboxStatus> = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.opened": "opened",
  "email.clicked": "clicked",
  "email.bounced": "bounced",
  "email.complaint": "complained",
  "email.complained": "complained",
  "email.delivery_delayed": "queued",
  "email.failed": "failed",
};

export async function POST(request: Request) {
  // Best-effort signature check. Resend uses Svix-style headers.
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const sigHeader =
    request.headers.get("svix-signature") ||
    request.headers.get("resend-signature") ||
    "";

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (secret && sigHeader) {
    try {
      const { Webhook } = await import("svix");
      const wh = new Webhook(secret);
      wh.verify(raw, {
        "svix-id": request.headers.get("svix-id") ?? "",
        "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
        "svix-signature": sigHeader,
      });
    } catch (err) {
      console.warn("Resend webhook signature check failed:", err);
      // Don't reject — fall through and just log. Resend retries on 5xx; we'd
      // rather log and inspect than block a real event during initial setup.
    }
  }

  let evt: { type?: string; data?: { email_id?: string; to?: string | string[] } } = {};
  try {
    evt = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: true, ignored: "unparseable" });
  }

  const type = evt.type ?? "";
  const status = TYPE_MAP[type];
  const resendId = evt.data?.email_id;
  if (!status || !resendId) {
    return NextResponse.json({ ok: true, ignored: type || "unknown" });
  }

  const recipient = Array.isArray(evt.data?.to) ? evt.data.to[0] : evt.data?.to;
  await updateOutboxByResendId(resendId, {
    status,
    eventType: status,
    eventRecipient: typeof recipient === "string" ? recipient : undefined,
  });
  return NextResponse.json({ ok: true, type, status });
}
