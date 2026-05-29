import { NextResponse } from "next/server";
import { anthropicText } from "@/lib/anthropic";

export const runtime = "nodejs";

interface VerifyBody {
  name?: string;
  email?: string;
  country?: string;
  /** File names only (no file upload here yet — pure heuristic + LLM review). */
  photoName?: string;
  idName?: string;
  cvName?: string;
}

interface VerifyResult {
  ok: boolean;
  status: "approved" | "manual_review" | "rejected";
  /** Human-facing reasoning from the LLM (shown to the applicant). */
  reason: string;
  /** Optional flags surfaced to the back office. */
  flags?: string[];
}

const SYSTEM_PROMPT = `You are IQCDL's membership-verification assistant.

You receive a partial membership application: applicant name, email, country, and the file names they uploaded as ID photo, identity document and CV.

You do NOT have access to the file contents — only the file names. Treat that as a sanity-check layer, not a real KYC.

Decide one of three outcomes:
- "approved" — the data looks plausible and the file names look like the right kinds of documents (photo + identity + cv-shaped).
- "manual_review" — looks mostly plausible but something is unusual; flag it for a human reviewer (still let the applicant proceed to payment, but tell them their account will be reviewed).
- "rejected" — clear gibberish, fake email, missing required documents, or obvious impersonation.

Be permissive on country, on common email providers, on real human-name shapes including non-Latin scripts. Reject obvious test/garbage inputs (e.g. "asdf@asdf.com", "test test test", missing photo).

Respond with ONLY a single JSON object on one line, no markdown, no code fences:
{"status":"approved|manual_review|rejected","reason":"<one short sentence to the applicant>","flags":["..."]}`;

function heuristicFallback(body: VerifyBody): VerifyResult {
  const flags: string[] = [];
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const photo = (body.photoName ?? "").trim();
  const id = (body.idName ?? "").trim();
  const cv = (body.cvName ?? "").trim();

  if (!name || name.length < 2) flags.push("name_too_short");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) flags.push("email_invalid");
  if (!photo) flags.push("photo_missing");
  if (!id) flags.push("id_missing");
  if (!cv) flags.push("cv_missing");
  if (/(test|asdf|qwer|abc)/i.test(name)) flags.push("name_looks_like_test");
  if (/(test|asdf|example|tmp)/i.test(email)) flags.push("email_looks_like_test");

  if (flags.includes("email_invalid") || flags.includes("photo_missing") || flags.includes("id_missing")) {
    return {
      ok: false,
      status: "rejected",
      reason: "Some required fields are missing or invalid. Please complete name, a real email, and upload photo + ID document.",
      flags,
    };
  }
  if (flags.includes("name_looks_like_test") || flags.includes("email_looks_like_test")) {
    return {
      ok: true,
      status: "manual_review",
      reason: "Submission accepted but flagged for human review before activation.",
      flags,
    };
  }
  return {
    ok: true,
    status: "approved",
    reason: "Looks good — your information passed automated checks.",
    flags,
  };
}

function parseLlmJson(raw: string): Partial<VerifyResult> | null {
  // Be tolerant of the model wrapping its response in ``` or text.
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const obj = JSON.parse(raw.slice(start, end + 1));
    if (!obj || typeof obj !== "object") return null;
    return obj as Partial<VerifyResult>;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: VerifyBody = {};
  try {
    body = (await request.json()) as VerifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Heuristic pass first — cheap, catches the obvious rejects without spending tokens.
  const heuristic = heuristicFallback(body);
  if (heuristic.status === "rejected") {
    return NextResponse.json(heuristic);
  }

  const llmResponse = await anthropicText({
    system: SYSTEM_PROMPT,
    maxTokens: 200,
    messages: [
      {
        role: "user",
        content: JSON.stringify({
          name: body.name ?? "",
          email: body.email ?? "",
          country: body.country ?? "",
          photoName: body.photoName ?? "",
          idName: body.idName ?? "",
          cvName: body.cvName ?? "",
        }),
      },
    ],
  });

  if (!llmResponse) {
    // No LLM key set / all providers failed — return the heuristic verdict.
    return NextResponse.json({ ...heuristic, flags: [...(heuristic.flags ?? []), "llm_unavailable"] });
  }

  const parsed = parseLlmJson(llmResponse);
  if (!parsed || !parsed.status || !["approved", "manual_review", "rejected"].includes(parsed.status)) {
    return NextResponse.json({ ...heuristic, flags: [...(heuristic.flags ?? []), "llm_parse_failed"] });
  }

  const status = parsed.status as VerifyResult["status"];
  return NextResponse.json({
    ok: status !== "rejected",
    status,
    reason:
      typeof parsed.reason === "string" && parsed.reason.trim().length > 0
        ? parsed.reason.trim().slice(0, 240)
        : "Verification complete.",
    flags: Array.isArray(parsed.flags) ? parsed.flags.slice(0, 8) : [],
  });
}
