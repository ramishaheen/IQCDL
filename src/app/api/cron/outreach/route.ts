import { NextResponse } from "next/server";
import {
  listTargets,
  updateTarget,
  nextSendForStep,
  type OutreachTarget,
} from "@/lib/outreach-server";
import { generateOutreachEmail } from "@/lib/outreach-agent";
import { renderOutreachEmail } from "@/lib/outreach-template";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_SENDS_PER_RUN = 20;
const TOTAL_TOUCHES = 3;

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://iqcdl.org"
  ).replace(/\/$/, "");
}

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

async function send(opts: {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[outreach-cron] (no RESEND_API_KEY) would send to ${opts.to}: ${opts.subject}`);
    return { ok: true };
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const res = await resend.emails.send({
      from: process.env.RESEND_FROM || "IQCDL <onboarding@resend.dev>",
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    const id =
      (res as { data?: { id?: string } }).data?.id ??
      (res as { id?: string }).id;
    return { ok: true, id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function runOutreach(): Promise<{
  sent: number;
  skipped: number;
  failed: number;
  dormant: number;
  total: number;
}> {
  const all = await listTargets();
  const now = Date.now();
  const summary = { sent: 0, skipped: 0, failed: 0, dormant: 0, total: all.length };

  for (const t of all) {
    if (summary.sent >= MAX_SENDS_PER_RUN) break;
    if (
      t.status === "unsubscribed" ||
      t.status === "replied" ||
      t.status === "dormant" ||
      t.status === "engaged" // pause cold sequence once they engaged
    ) {
      summary.skipped += 1;
      continue;
    }
    if (new Date(t.nextSendAt).getTime() > now) {
      summary.skipped += 1;
      continue;
    }
    if (t.step >= TOTAL_TOUCHES) {
      // Sequence complete — mark dormant.
      await updateTarget(t.id, { status: "dormant" });
      summary.dormant += 1;
      continue;
    }

    const touchIdx = t.step; // 0 => touch 1, etc.
    const email = await generateOutreachEmail(t, touchIdx);
    const baseDest = `${siteUrl()}${email.ctaPath}`;
    const trackedCta = `${siteUrl()}/api/outreach/click?t=${encodeURIComponent(t.token)}&u=${encodeURIComponent(baseDest)}`;
    const html = renderOutreachEmail({
      title: email.title,
      paragraphs: email.paragraphs,
      ctaLabel: email.ctaLabel,
      ctaUrl: trackedCta,
    });
    // Reply-To with the target token so the inbound webhook can map back to the target.
    const replyDomain = (process.env.OUTREACH_REPLY_DOMAIN || "iqcdl.org").replace(/^@/, "");
    const replyTo = `reply+${t.token}@${replyDomain}`;

    const result = await send({
      to: t.email,
      replyTo,
      subject: email.subject,
      html,
    });
    if (!result.ok) {
      summary.failed += 1;
      console.error(`[outreach-cron] send failed for ${t.email}:`, result.error);
      continue;
    }

    const nextStep = t.step + 1;
    const patch: Partial<OutreachTarget> = {
      step: nextStep,
      lastSentAt: new Date().toISOString(),
      lastMessageId: result.id,
      status: nextStep >= TOTAL_TOUCHES ? "dormant" : "in-sequence",
      nextSendAt:
        nextStep >= TOTAL_TOUCHES
          ? new Date().toISOString()
          : nextSendForStep(nextStep),
    };
    await updateTarget(t.id, patch);
    summary.sent += 1;
  }
  return summary;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const summary = await runOutreach();
  return NextResponse.json({ ok: true, ...summary });
}

export async function POST(request: Request) {
  return GET(request);
}
