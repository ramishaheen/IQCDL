import { NextResponse } from "next/server";
import { findByToken, findByEmail, markReplied } from "@/lib/outreach-server";

export const runtime = "nodejs";

/**
 * Generic inbound-mail webhook for reply detection. Accepts a wide range of
 * payload shapes from Resend / Mailgun / Postmark / SendGrid so the user can
 * point whichever inbound parser they wire up.
 *
 * Detection strategy:
 *   1. Pull the destination address (To / recipient) and parse a `+<token>` tag
 *      from it (we send Reply-To: reply+<token>@iqcdl.org).
 *   2. If no token, fall back to From / sender address matching against a known
 *      target's email.
 *
 * Optional auth via INBOUND_SECRET query param.
 */
function extractTokenFromAddr(addr?: string): string | null {
  if (!addr) return null;
  const m = addr.match(/\+([a-f0-9]{6,})@/i);
  return m ? m[1] : null;
}

function firstString(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && v.length > 0 && typeof v[0] === "string")
    return v[0];
  return undefined;
}

interface InboundPayload {
  to?: string | string[];
  recipient?: string;
  envelope?: { to?: string | string[] };
  from?: string;
  sender?: string;
  message?: { headers?: { To?: string; From?: string } };
  headers?: Record<string, string>;
}

export async function POST(request: Request) {
  const expected = process.env.INBOUND_SECRET;
  if (expected) {
    const url = new URL(request.url);
    if (url.searchParams.get("secret") !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: InboundPayload = {};
  try {
    body = (await request.json()) as InboundPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const to =
    firstString(body.to) ??
    body.recipient ??
    firstString(body.envelope?.to) ??
    body.message?.headers?.To ??
    body.headers?.To ??
    body.headers?.to;
  const from =
    body.from ??
    body.sender ??
    body.message?.headers?.From ??
    body.headers?.From ??
    body.headers?.from;

  const token = extractTokenFromAddr(to);
  let targetId: string | null = null;
  if (token) {
    const t = await findByToken(token);
    if (t) targetId = t.id;
  }
  if (!targetId && typeof from === "string") {
    const t = await findByEmail(from.replace(/^.*<([^>]+)>.*$/, "$1").trim());
    if (t) targetId = t.id;
  }

  if (!targetId) {
    return NextResponse.json({ ok: true, matched: false });
  }
  await markReplied(targetId);
  return NextResponse.json({ ok: true, matched: true, targetId });
}
