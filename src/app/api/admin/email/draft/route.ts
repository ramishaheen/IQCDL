import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-guard";
import { anthropicText } from "@/lib/anthropic";

export const runtime = "nodejs";

interface DraftBody {
  intent: string;
  audience?: string;
  tone?: "warm" | "formal" | "concise" | "celebratory";
  recipientName?: string;
  variables?: Record<string, string>;
}

const SYSTEM = `You are IQCDL's admin email-drafting assistant.

Write a single email — subject + HTML body — for the IQCDL admin to review and send to their CRM contacts (chapter leads, accredited training centres, students, trainers, partners, ambassadors, ministries, sponsors).

Rules:
- IQCDL = International Quantum Computing Driving License. Member of the IAIDL Group. Vendor-neutral, multilingual, standards-aligned (NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132, EU PQC Roadmap, NIS2).
- Always sign off as "The IQCDL team — admin@iqcdl.org". Single contact address.
- Keep paragraphs short. No marketing fluff. No emoji unless explicitly requested.
- The output must be a single line of strict JSON:
  {"subject":"...", "html":"<p>...</p><p>...</p>", "preview":"<one-line preview text>"}
- Do NOT wrap the JSON in code fences. Do NOT add any prose before or after.`;

function parseJson(raw: string): { subject?: string; html?: string; preview?: string } | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: DraftBody = { intent: "" };
  try {
    body = (await request.json()) as DraftBody;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (!body.intent || body.intent.trim().length < 4) {
    return NextResponse.json({ error: "Intent required" }, { status: 400 });
  }

  const user = [
    `Intent: ${body.intent.trim()}`,
    body.audience ? `Audience: ${body.audience}` : "",
    body.tone ? `Tone: ${body.tone}` : "",
    body.recipientName ? `Recipient first name: ${body.recipientName}` : "",
    body.variables
      ? `Variables: ${Object.entries(body.variables).map(([k, v]) => `${k}=${v}`).join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const llm = await anthropicText({
    system: SYSTEM,
    maxTokens: 700,
    messages: [{ role: "user", content: user }],
  });
  if (!llm) {
    return NextResponse.json(
      { error: "AI provider not configured. Set ANTHROPIC_API_KEY or DEEPSEEK_API_KEY in env." },
      { status: 503 },
    );
  }
  const parsed = parseJson(llm);
  if (!parsed?.subject || !parsed?.html) {
    return NextResponse.json({ error: "AI response unparseable", raw: llm }, { status: 502 });
  }
  return NextResponse.json({
    subject: String(parsed.subject).slice(0, 200),
    html: String(parsed.html).slice(0, 50_000),
    preview: typeof parsed.preview === "string" ? parsed.preview.slice(0, 240) : "",
  });
}
