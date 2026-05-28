import "server-only";
import { anthropicText } from "./anthropic";

export interface MarketingTopic {
  key: string;
  title: string;
  ctaPath: string;
}

/** Topic rotation while the contact is not yet a member/candidate. */
export const PROSPECT_TOPICS: MarketingTopic[] = [
  { key: "iqcdl-overview", title: "What IQCDL is and why quantum readiness matters now", ctaPath: "/about" },
  { key: "programs", title: "Foundation vs. Practitioner — which IQCDL track fits you", ctaPath: "/programs" },
  { key: "membership", title: "The $19/year Community membership — what you unlock", ctaPath: "/membership" },
  { key: "iqci-index", title: "The International Quantum Computing Index (IQCI)", ctaPath: "/quantum-index" },
  { key: "gqa-award", title: "The Global Quantum Award (GQA) — categories & impact", ctaPath: "/awards" },
];

/** Different angles once the contact has converted (member or admin-tagged). */
export const CROSS_SELL_TOPICS: MarketingTopic[] = [
  { key: "practitioner", title: "Going further: the Practitioner certification", ctaPath: "/programs#practitioner" },
  { key: "iqci-country", title: "Read your country's quantum-readiness in the IQCI", ctaPath: "/quantum-index" },
  { key: "gqa-entry", title: "Apply for the Global Quantum Award", ctaPath: "/awards" },
  { key: "community", title: "Community: expert publications and ask-the-experts", ctaPath: "/community" },
];

export interface MarketingEmail {
  subject: string;
  title: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaUrl: string;
}

const SYSTEM_PROMPT = `You are IQCDL's senior marketing copywriter — warm, brand-aware, and persuasive without being pushy.

IQCDL is the International Quantum Computing Driving License: a vendor-neutral certification body that takes individuals and organizations from quantum-curious to quantum-ready. It is part of the internationally established IAIDL group (94+ countries since 2014, aligned with global AI indices and AI awards, ISO-aligned, WEF strategic alliance, excellence-aligned). IQCDL offers three tracks (free "Quantum Computing for Everyone", Foundation, Practitioner), a $19/year Community membership, the International Quantum Computing Index (IQCI), and the Global Quantum Award (GQA).

Write a concise, persuasive email to a named prospect on the given topic. Use these psychology principles tastefully and without naming them: curiosity (open with an intriguing question or fact), social proof, value-first (give a useful insight before any ask), gentle urgency (the post-quantum timeline), and a single clear call-to-action.

Constraints:
- Body: exactly 3 short paragraphs, each <=75 words.
- Tone: warm, expert, never pushy or salesy. Plain language.
- No invented prices or guarantees (the only price you can mention is the $19/year Community membership).
- Subject: 6–10 words, sparking curiosity. No clickbait, no ALL CAPS, no emojis.
- The first paragraph should reference the recipient by first name once if a name is provided.

Respond as STRICT JSON ONLY (no markdown fences, no commentary) in this exact shape:
{"subject":"...","title":"...","paragraphs":["...","...","..."],"ctaLabel":"..."}

The "title" is the email's H1 (shown above the body) — different wording from the subject. "ctaLabel" is 2–4 words.`;

function stripJsonFences(s: string): string {
  return s
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://iqcdl.org"
  ).replace(/\/$/, "");
}

function fallbackEmail(
  name: string,
  topic: MarketingTopic,
  converted: boolean,
): MarketingEmail {
  const first = name ? name.split(/\s+/)[0] : "";
  const greeting = first ? `Hi ${first},` : "Hi,";
  const baseParas: Record<string, string[]> = {
    "iqcdl-overview": [
      `${greeting} most organizations think quantum is a problem for "later" — but adversaries are already harvesting encrypted data now to decrypt once a cryptographically-relevant quantum computer arrives.`,
      "IQCDL exists to make that risk understandable and actionable: a vendor-neutral certification path from quantum-curious to quantum-ready, built on NIST, ISO/IEC, IEEE and the EU PQC roadmap.",
      "Two minutes well spent: take the free Readiness Assessment — it scores your exposure and recommends a track. No sign-up needed to start.",
    ],
    programs: [
      `${greeting} the right IQCDL track depends on your role. Foundation (3 days, no coding) is for leaders driving strategy; Practitioner (5 days, hands-on) is for developers and security architects implementing PQC.`,
      "Both lead to a verifiable credential aligned with NIST FIPS 203/204/205. Practitioner adds Qiskit, Kyber/Dilithium/SPHINCS+ implementation, and crypto-agile system design.",
      "If you're driving strategy, start with Foundation. If you'll be implementing, plan for both. The Programs page lays out the full curriculum and outcomes.",
    ],
    membership: [
      `${greeting} the IQCDL Community membership is $19/year — a small commitment that unlocks the members' community, AI quantum-expert agents, the Quantum Guide chat, a free online course, and a 10% course discount.`,
      "Members also get the deeper tutoring & support chat and priority on invitations to councils, summits and live sessions with our governance bodies.",
      "If you're going to be in the quantum conversation for the next decade, having a member badge is a low-cost, high-signal way to be in the room.",
    ],
    "iqci-index": [
      `${greeting} the International Quantum Computing Index (IQCI) is an AI-generated, vendor-neutral ranking of every country across eight readiness categories — research, talent, investment, infrastructure, policy, PQC security, environmental sustainability, and ethics.`,
      "It's refreshed quarterly by a neutral AI jury against a published rubric, so the standings are explainable and reproducible, not opaque.",
      "Take a look at how your country ranks today — and where the biggest delta will land in the next quarterly edition.",
    ],
    "gqa-award": [
      `${greeting} the Global Quantum Award (GQA) is a biennial recognition for SMEs and government entities making real moves toward quantum readiness. Entries are assessed by a neutral AI jury against a published rubric.`,
      "Entry to the international categories is $1,000, and 100% of award proceeds advance the UN Sustainable Development Goals — so taking part is itself a contribution.",
      "Categories are open now. The Awards page has the rubric and how to submit.",
    ],
    practitioner: [
      `${greeting} as a member you've already got the foundations — the next step is the Practitioner track: hands-on Qiskit, real Kyber/Dilithium/SPHINCS+ implementation, and building crypto-agile systems your auditors can stand behind.`,
      "Practitioner takes 5 days and leads to a verifiable, standards-aligned credential employers recognise. It expects basic Python and the Foundation knowledge you already have.",
      "If you're going to be the person doing the PQC migration in your team, this is the certification to hold.",
    ],
    "iqci-country": [
      `${greeting} the latest IQCI edition just refreshed — there are real shifts in where countries rank across the eight categories.`,
      "The methodology is published, the rubric is reproducible, and the rankings come from a neutral AI jury — so the standings are explainable rather than opaque.",
      "Pull your country up on the index and compare it against any other in seconds. You may be surprised which categories are dragging the score.",
    ],
    "gqa-entry": [
      `${greeting} the Global Quantum Award is open — biennial recognition for SMEs and government entities making real moves toward quantum readiness.`,
      "Entries are AI-jury-assessed against a published rubric, $1,000 for international categories, and 100% of proceeds advance the UN SDGs.",
      "If your team has shipped real quantum-readiness work this year, the GQA is the credible international stage to put it on.",
    ],
    community: [
      `${greeting} the members' community has been busy — AI quantum-expert agents publishing weekly news, frameworks and books, and a threaded chat where experts reply to questions from members.`,
      "It's a low-friction way to stay current without trawling the wider web — quality signal, curated by people who do this for a living.",
      "Drop in this week; the latest publications cover PQC migration timing, IQCI movements, and one piece on harvest-now-decrypt-later that's worth reading.",
    ],
  };
  const paragraphs = baseParas[topic.key] ?? baseParas["iqcdl-overview"];
  return {
    subject: topic.title,
    title: topic.title,
    paragraphs,
    ctaLabel: converted ? "Explore now" : "See more",
    ctaUrl: `${siteUrl()}${topic.ctaPath}`,
  };
}

/** Generate a marketing email via Claude/DeepSeek, with a robust fallback. */
export async function generateMarketingEmail(opts: {
  name: string;
  topic: MarketingTopic;
  converted: boolean;
  sequenceStep: number;
}): Promise<MarketingEmail> {
  const { name, topic, converted, sequenceStep } = opts;
  const userMsg =
    `Topic: ${topic.title}\n` +
    `Recipient name: ${name || "(unknown)"}\n` +
    `Sequence step (0 = first email): ${sequenceStep}\n` +
    `Audience: ${converted ? "Already converted — IQCDL member or admin-tagged candidate. Cross-sell adjacent value, do not push membership again." : "Prospect — left contact details on iqcdl.org but has not yet joined."}\n` +
    `Suggested CTA path: ${topic.ctaPath}\n` +
    `Write the email now. Respond as strict JSON only.`;

  const raw = await anthropicText({
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMsg }],
    maxTokens: 800,
  });

  if (raw) {
    try {
      const parsed = JSON.parse(stripJsonFences(raw));
      if (
        parsed &&
        typeof parsed.subject === "string" &&
        typeof parsed.title === "string" &&
        Array.isArray(parsed.paragraphs) &&
        parsed.paragraphs.length > 0 &&
        typeof parsed.ctaLabel === "string"
      ) {
        return {
          subject: String(parsed.subject).slice(0, 120),
          title: String(parsed.title).slice(0, 180),
          paragraphs: parsed.paragraphs.map((p: unknown) => String(p)).slice(0, 5),
          ctaLabel: String(parsed.ctaLabel).slice(0, 40),
          ctaUrl: `${siteUrl()}${topic.ctaPath}`,
        };
      }
    } catch (err) {
      console.error("Marketing-agent JSON parse failed, using fallback:", err);
    }
  }

  return fallbackEmail(name, topic, converted);
}

/** Pick the topic for a given send. */
export function topicFor(
  sequenceStep: number,
  converted: boolean,
): MarketingTopic {
  const list = converted ? CROSS_SELL_TOPICS : PROSPECT_TOPICS;
  return list[sequenceStep % list.length];
}
