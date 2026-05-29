import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { isAdminRequest } from "@/lib/admin-guard";
import { sendEmail, DEFAULT_FROM } from "@/lib/resend-client";
import { appendOutbox, type OutboxEntry } from "@/lib/email-outbox";

export const runtime = "nodejs";

interface SendBody {
  to: string[];
  subject: string;
  html: string;
  /** Optional cohort label for grouping in the outbox (e.g. "all-students-cairo"). */
  cohort?: string;
  /** When true, log but don't actually send (admin can preview). */
  test?: boolean;
  /** Override the default from address. */
  from?: string;
  /** Reply-to override. */
  replyTo?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: SendBody = { to: [], subject: "", html: "" };
  try {
    body = (await request.json()) as SendBody;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const to = Array.from(
    new Set(
      (Array.isArray(body.to) ? body.to : [])
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter((s) => EMAIL_RE.test(s)),
    ),
  );
  if (to.length === 0) {
    return NextResponse.json({ error: "At least one valid recipient required" }, { status: 400 });
  }
  if (to.length > 100) {
    return NextResponse.json({ error: "Per-send cap is 100 recipients" }, { status: 400 });
  }
  if (!body.subject?.trim() || !body.html?.trim()) {
    return NextResponse.json({ error: "Subject and body required" }, { status: 400 });
  }

  const id = `obx_${Date.now()}_${randomBytes(4).toString("hex")}`;
  const fromAddr = body.from?.trim() || DEFAULT_FROM;
  const cohort = body.cohort?.trim().slice(0, 80);

  // Test mode = log only, no Resend hop.
  if (body.test) {
    const entry: OutboxEntry = {
      id,
      to,
      from: fromAddr,
      subject: body.subject.trim(),
      bodyHtml: body.html,
      cohort,
      status: "sent",
      createdAt: new Date().toISOString(),
      test: true,
    };
    await appendOutbox(entry);
    return NextResponse.json({ ok: true, mode: "test", id, recipients: to.length });
  }

  const result = await sendEmail({
    to,
    subject: body.subject.trim(),
    html: body.html,
    from: fromAddr,
    replyTo: body.replyTo,
    tags: cohort ? [{ name: "cohort", value: cohort.replace(/[^A-Za-z0-9_-]/g, "-") }] : undefined,
  });

  const entry: OutboxEntry = {
    id,
    resendId: result.messageId,
    to,
    from: fromAddr,
    subject: body.subject.trim(),
    bodyHtml: body.html,
    cohort,
    status: result.ok ? "sent" : "failed",
    reason: result.error,
    createdAt: new Date().toISOString(),
  };
  await appendOutbox(entry);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, mode: "live", id, error: result.error },
      { status: 502 },
    );
  }
  return NextResponse.json({
    ok: true,
    mode: "live",
    id,
    messageId: result.messageId,
    recipients: to.length,
  });
}
