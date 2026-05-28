import { NextResponse } from "next/server";
import {
  listContacts,
  markConverted,
  updateContact,
  nextSendDelayMs,
  type ContactRecord,
} from "@/lib/contacts-server";
import { listMembers } from "@/lib/members-server";
import { generateMarketingEmail, topicFor } from "@/lib/marketing-agent";
import { renderMarketingEmail } from "@/lib/email-template";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_SENDS_PER_RUN = 25;

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://iqcdl.org"
  ).replace(/\/$/, "");
}

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization") || "";
  return auth === `Bearer ${secret}`;
}

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[marketing-cron] (no RESEND_API_KEY) would send to ${opts.to}: ${opts.subject}`);
    return { ok: true };
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM || "IQCDL <onboarding@resend.dev>",
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

async function runMarketing() {
  const contacts = await listContacts();
  const members = await listMembers();
  const memberEmails = new Set(members.map((m) => m.email.toLowerCase()));

  const now = Date.now();
  let sent = 0;
  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const c of contacts) {
    if (sent >= MAX_SENDS_PER_RUN) break;
    if (c.unsubscribed) {
      skipped += 1;
      continue;
    }
    // Auto-convert: if the contact's email now matches a member, stop the prospect drip.
    if (!c.converted && memberEmails.has(c.email)) {
      await markConverted(c.id, "member");
      c.converted = true;
      c.convertedAt = new Date().toISOString();
      c.convertedReason = "member";
      converted += 1;
    }
    if (new Date(c.nextSendAt).getTime() > now) {
      skipped += 1;
      continue;
    }
    const topic = topicFor(c.sequenceStep, c.converted);
    const email = await generateMarketingEmail({
      name: c.name,
      topic,
      converted: c.converted,
      sequenceStep: c.sequenceStep,
    });
    const unsubscribeUrl = `${siteUrl()}/api/unsubscribe?token=${encodeURIComponent(c.unsubscribeToken)}`;
    const html = renderMarketingEmail({
      title: email.title,
      paragraphs: email.paragraphs,
      ctaLabel: email.ctaLabel,
      ctaUrl: email.ctaUrl,
      unsubscribeUrl,
    });
    const result = await sendEmail({ to: c.email, subject: email.subject, html });
    if (!result.ok) {
      failed += 1;
      console.error(`[marketing-cron] send failed for ${c.email}:`, result.error);
      continue;
    }
    await updateContact(c.id, {
      sequenceStep: c.sequenceStep + 1,
      lastSentAt: new Date().toISOString(),
      lastTopic: topic.key,
      nextSendAt: new Date(Date.now() + nextSendDelayMs()).toISOString(),
    });
    sent += 1;
  }

  return { sent, converted, skipped, failed, total: contacts.length };
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const summary = await runMarketing();
  return NextResponse.json({ ok: true, ...summary });
}

export async function POST(request: Request) {
  return GET(request);
}
