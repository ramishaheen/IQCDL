import { NextResponse } from "next/server";
import {
  addSubmission,
  listSubmissions,
  type Submission,
  type SubmissionKind,
} from "@/lib/submissions-server";
import { juryAssess } from "@/lib/ai-jury";

export const runtime = "nodejs";

function makeId(kind: SubmissionKind): string {
  const prefix = kind === "award" ? "GQA" : "IQCI";
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function GET() {
  const all = await listSubmissions();
  return NextResponse.json({ submissions: all });
}

export async function POST(request: Request) {
  let body: Partial<Submission> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const kind: SubmissionKind = body.kind === "award" ? "award" : "evidence";
  if (!body.officialEmail || !body.org || !body.contactName) {
    return NextResponse.json({ error: "Official email, organisation and contact name are required" }, { status: 400 });
  }
  // Evidence submissions require identity verification (passport) per policy.
  if (kind === "evidence") {
    const hasPassport = (body.files ?? []).some((f) => /passport|id/i.test(f.name));
    if (!body.phone || !hasPassport) {
      return NextResponse.json(
        { error: "A contact number and a passport/ID copy are required for evidence submissions" },
        { status: 400 },
      );
    }
  }

  const assessText = [
    body.title,
    body.summary,
    body.claim,
    body.category && `Category: ${body.category}`,
    body.pillar && `Pillar: ${body.pillar}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const ai = await juryAssess(assessText);

  const submission: Submission = {
    id: makeId(kind),
    kind,
    createdAt: new Date().toISOString(),
    org: String(body.org).slice(0, 200),
    contactName: String(body.contactName).slice(0, 120),
    officialEmail: String(body.officialEmail).slice(0, 160),
    phone: String(body.phone ?? "").slice(0, 60),
    country: String(body.country ?? "").slice(0, 80),
    pillar: body.pillar ? String(body.pillar).slice(0, 80) : undefined,
    claim: body.claim ? String(body.claim).slice(0, 4000) : undefined,
    category: body.category ? String(body.category).slice(0, 120) : undefined,
    title: body.title ? String(body.title).slice(0, 200) : undefined,
    summary: body.summary ? String(body.summary).slice(0, 4000) : undefined,
    files: Array.isArray(body.files) ? body.files.slice(0, 8) : [],
    aiScore: ai.score,
    aiVerdict: ai.verdict,
    aiNeedsEvidence: ai.needsEvidence,
  };

  await addSubmission(submission);

  // Optional email notification.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const to = process.env.SUBMISSIONS_INBOX || (kind === "award" ? "admin@iqcdl.org" : "admin@iqcdl.org");
      await resend.emails.send({
        from: process.env.RESEND_FROM || "IQCDL <onboarding@resend.dev>",
        to,
        subject: `${kind === "award" ? "GQA award" : "IQCI evidence"} submission — ${submission.org} (${submission.id})`,
        text:
          `ID: ${submission.id}\nOrg: ${submission.org}\nContact: ${submission.contactName} <${submission.officialEmail}>\n` +
          `Phone: ${submission.phone}\nCountry: ${submission.country}\n` +
          `${submission.category ? `Category: ${submission.category}\n` : ""}${submission.pillar ? `Pillar: ${submission.pillar}\n` : ""}` +
          `\nAI score: ${submission.aiScore}\nAI verdict: ${submission.aiVerdict}\nNeeds evidence: ${submission.aiNeedsEvidence}\n` +
          `\nFiles:\n${submission.files.map((f) => `- ${f.name}${f.url ? ` (${f.url})` : ""}`).join("\n")}\n` +
          `\n${submission.title ?? ""}\n${submission.summary ?? submission.claim ?? ""}`,
      });
    } catch (err) {
      console.error("Submission email failed:", err);
    }
  }

  return NextResponse.json({
    ok: true,
    id: submission.id,
    aiScore: submission.aiScore,
    aiVerdict: submission.aiVerdict,
    aiNeedsEvidence: submission.aiNeedsEvidence,
  });
}
