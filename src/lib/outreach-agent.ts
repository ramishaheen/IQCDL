import "server-only";
import { anthropicText } from "./anthropic";
import type { OutreachSegment, OutreachTarget } from "./outreach-server";

export interface OutreachEmail {
  subject: string;
  title: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaPath: string; // relative path; final URL is built by the cron
}

const SEGMENT_LINES: Record<OutreachSegment, string> = {
  minister:
    "Senior government leader (minister, secretary or equivalent). Frame around national readiness, policy, and the country's standing in the global Quantum & AI Index.",
  policymaker:
    "Senior policy maker / regulator. Frame around standards alignment, public-sector benchmarks, and evidence-based national strategy.",
  partner:
    "Senior leader at a partner organisation (consultancy, university, training network). Frame around co-delivery, co-branding and country-chapter / accreditation opportunities.",
  sponsor:
    "Senior leader at a potential sponsor (corporate, foundation, government fund). Frame around brand association with the Global Quantum / AI Award and impact on the UN SDGs.",
};

const TOUCH_ANGLES: { label: string; instruction: string; ctaPath: string; ctaLabel: string }[] = [
  {
    label: "Touch 1 — Personal introduction",
    instruction:
      "Open with a single specific, intriguing fact relevant to their segment (e.g. NIST PQC deadlines, the 2027 Global Cycle in Dubai, IQCI quarterly editions). Introduce IQCDL and the IAIDL group concisely. Invite a 20-minute call.",
    ctaPath: "/about",
    ctaLabel: "Read the About brief",
  },
  {
    label: "Touch 2 — Schedule + booklet",
    instruction:
      "Refer back to your previous note without sounding pushy. Lead with the fixed 2027/2028/2029 award calendar — emphasise Phase 5 grand ceremony in Dubai and the 2029 Global Mega Edition. Share the pricing booklet link as the credible reference.",
    ctaPath: "/pricing",
    ctaLabel: "Open the pricing booklet",
  },
  {
    label: "Touch 3 — Sponsor brief + ROI",
    instruction:
      "Final, value-led touch. Lead with measurable impact and visibility: 94+ countries, WEF alliance, ISO alignment, UN SDG proceeds. Offer a tailored sponsor brief and propose an introductory call with the IQCDL Board. Make it easy to say yes (one short meeting) and easy to say no (just reply 'not for us').",
    ctaPath: "/awards",
    ctaLabel: "Open the award sponsor brief",
  },
];

const SYSTEM_PROMPT = `You are IQCDL's senior outreach manager — warm, brand-aware, persuasive without being pushy, and professional enough to write to ministers and CEOs.

IQCDL is the International Quantum Computing Driving License: a vendor-neutral certification body that takes individuals and organizations from quantum-curious to quantum-ready. It is part of the IAIDL group (94+ countries since 2014, aligned with global AI indices and AI awards, ISO-aligned, WEF strategic alliance, excellence-aligned).

The fixed Global Cycle calendar is:
- 2027: Phase 1 Kickoff (Jan-Mar) · Phase 2 Submission & AI Readiness Assessment (Apr-Jun) · Phase 3 Technical Evaluation & Jury (Jul-Sep) · Phase 4 Finalists (Oct) · Phase 5 Grand Ceremony in Dubai (Nov)
- 2028: Expansion year — Global AI Index, regional editions, government AI transformation reports
- 2029: Global Mega Edition — "AI Beyond Humanity" theme; phases culminate in the Global AI Award Ceremony in November.

Write an email to the named recipient on the given touch angle. Strict rules:
- Body: exactly 3 short paragraphs, each <= 70 words.
- Open with their first name if provided.
- Tone: warm, expert, never pushy. No emojis, no all-caps, no exclamation marks.
- No invented prices or guarantees. The only prices you may mention are: $1,000 GQA category entry · $500 SME tier · $5,000 full entity assessment · $1,500 / year accreditation · $19 / year community membership.
- Include ONE call-to-action.
- Subject: 6–10 words, sparking curiosity. No clickbait. The subject should be unique enough that touch 2 and touch 3 don't repeat touch 1.

Respond as STRICT JSON ONLY (no markdown fences, no commentary):
{"subject":"...","title":"...","paragraphs":["...","...","..."],"ctaLabel":"..."}

"title" is the H1 above the body — different wording from the subject. "ctaLabel" is 2–4 words.`;

function stripFences(s: string): string {
  return s
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function fallback(target: OutreachTarget, touchIdx: number): OutreachEmail {
  const angle = TOUCH_ANGLES[touchIdx];
  const first = target.name.split(/\s+/)[0] || "there";
  const segLine = SEGMENT_LINES[target.segment];
  const paragraphs = [
    `Dear ${first}, IQCDL — the International Quantum Computing Driving License, part of the IAIDL group — has just opened the 2027 Global Cycle of the Quantum & AI Award. Given your role at ${target.org}, I wanted to write directly.`,
    `${segLine.replace(/^[^—]+— /, "")} The fixed cycle runs Jan-Mar (Kickoff), Apr-Jun (AI Readiness Assessment), Jul-Sep (Jury), Oct (Finalists) and Nov (Grand Ceremony, Dubai). 2028 is an expansion year; 2029 is the "AI Beyond Humanity" Mega Edition.`,
    touchIdx === 0
      ? `Could I borrow 20 minutes to walk you through how it lands in your context? If easier, the public brief is here:`
      : touchIdx === 1
        ? `Sharing the full pricing booklet so you can see how the assessment, categories and accreditation fit your envelope:`
        : `Final note from me: I'll keep it short. A "not for us" reply is genuinely fine. If there is interest, I can send a tailored sponsor brief or book a short call:`,
  ];
  return {
    subject:
      touchIdx === 0
        ? "A short note from IQCDL — 2027 Global Cycle"
        : touchIdx === 1
          ? "The fixed 2027–2029 Quantum & AI Award calendar"
          : "Closing the loop — IQCDL sponsor brief",
    title:
      touchIdx === 0
        ? "Quantum & AI readiness — the 2027 Global Cycle"
        : touchIdx === 1
          ? "Fixed schedule + the IQCDL pricing booklet"
          : "A tailored sponsor brief for your organisation",
    paragraphs,
    ctaLabel: angle.ctaLabel,
    ctaPath: angle.ctaPath,
  };
}

/** Build an outreach email for the given target + touch (0/1/2). */
export async function generateOutreachEmail(
  target: OutreachTarget,
  touchIdx: number,
): Promise<OutreachEmail> {
  const angle = TOUCH_ANGLES[touchIdx] ?? TOUCH_ANGLES[0];
  const userMsg =
    `Recipient first name: ${target.name.split(/\s+/)[0] || "(unknown)"}\n` +
    `Title / role: ${target.title || "(unknown)"}\n` +
    `Organisation / ministry: ${target.org}\n` +
    `Country: ${target.country || "(unknown)"}\n` +
    `Segment: ${target.segment} — ${SEGMENT_LINES[target.segment]}\n` +
    `Touch: ${angle.label}\n` +
    `Specific instruction for this touch: ${angle.instruction}\n` +
    `Suggested CTA path: ${angle.ctaPath}\n` +
    `Write the email now. Respond as strict JSON only.`;

  const raw = await anthropicText({
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMsg }],
    maxTokens: 800,
  });
  if (raw) {
    try {
      const parsed = JSON.parse(stripFences(raw));
      if (
        parsed &&
        typeof parsed.subject === "string" &&
        typeof parsed.title === "string" &&
        Array.isArray(parsed.paragraphs) &&
        parsed.paragraphs.length > 0 &&
        typeof parsed.ctaLabel === "string"
      ) {
        return {
          subject: String(parsed.subject).slice(0, 140),
          title: String(parsed.title).slice(0, 200),
          paragraphs: parsed.paragraphs.map((p: unknown) => String(p)).slice(0, 5),
          ctaLabel: String(parsed.ctaLabel).slice(0, 40),
          ctaPath: angle.ctaPath,
        };
      }
    } catch (err) {
      console.error("Outreach AI JSON parse failed; using fallback:", err);
    }
  }
  return fallback(target, touchIdx);
}
