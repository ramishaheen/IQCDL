import { NextResponse } from "next/server";
import { listTargets, markOpened, markClicked } from "@/lib/outreach-server";

export const runtime = "nodejs";

interface ResendWebhookPayload {
  type?: string;
  data?: {
    email_id?: string;
    to?: string | string[];
    [key: string]: unknown;
  };
}

/**
 * Resend webhook receiver. Reads the event type and looks up the matching
 * outreach target by the recipient address or message id, then advances
 * engagement state automatically:
 *   email.opened  -> markOpened
 *   email.clicked -> markClicked
 *
 * Optional auth via RESEND_WEBHOOK_SECRET (query string `secret`).
 */
function recipientsFromPayload(d: ResendWebhookPayload["data"]): string[] {
  if (!d) return [];
  const t = d.to;
  if (Array.isArray(t)) return t.map((x) => String(x).trim().toLowerCase());
  if (typeof t === "string") return [t.trim().toLowerCase()];
  return [];
}

export async function POST(request: Request) {
  const expected = process.env.RESEND_WEBHOOK_SECRET;
  if (expected) {
    const url = new URL(request.url);
    if (url.searchParams.get("secret") !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let payload: ResendWebhookPayload = {};
  try {
    payload = (await request.json()) as ResendWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = payload.type || "";
  const recipients = recipientsFromPayload(payload.data);
  const messageId = payload.data?.email_id;

  if (!type || (recipients.length === 0 && !messageId)) {
    return NextResponse.json({ ok: true, matched: false });
  }

  const all = await listTargets();
  const match = all.find(
    (t) =>
      (messageId && t.lastMessageId === messageId) ||
      recipients.includes(t.email),
  );
  if (!match) {
    return NextResponse.json({ ok: true, matched: false });
  }

  if (type === "email.opened") {
    await markOpened(match.id);
  } else if (type === "email.clicked") {
    await markClicked(match.id);
  }
  return NextResponse.json({ ok: true, matched: true, type });
}
