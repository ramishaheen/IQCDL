import { NextResponse } from "next/server";
import {
  COUNTRIES,
  PRESS_OUTLETS,
  currentQuarterLabel,
  type QuarterlyEdition,
} from "@/lib/iqci";

export const runtime = "nodejs";

// The "quarterly agent": compiles a new edition. A second "distribution agent"
// then makes it available everywhere and notifies the global press so it goes viral.
export async function POST(request: Request) {
  let body: { label?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* optional body */
  }

  const label = body.label?.trim() || currentQuarterLabel();
  const top = [...COUNTRIES].sort((a, b) => b.score - a.score);
  const leader = top[0];
  const climber = COUNTRIES[7]; // UAE — illustrative fastest-mover

  let headline = `${leader.country} leads the ${label} IQCI as global quantum-readiness accelerates`;
  const highlights = [
    `${leader.flag} ${leader.country} holds the top position (score ${leader.score}/100).`,
    `${climber.flag} ${climber.country} is the quarter's standout climber on strategy and investment.`,
    `Post-quantum security readiness improved across the index, tracking the NIST FIPS 203/204/205 rollout.`,
    `Talent pipeline remains the most common gap among emerging quantum nations.`,
  ];

  // Use Claude for a punchier headline when configured.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    try {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey });
      const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
      const res = await client.messages.create({
        model,
        max_tokens: 120,
        system:
          "You are the IQCI editorial agent. Write a single neutral, factual press-release headline (max 18 words) for the quarterly International Quantum Computing Index. No quotes, no markdown.",
        messages: [
          {
            role: "user",
            content: `Edition: ${label}. Leader: ${leader.country} (${leader.score}). Standout climber: ${climber.country}.`,
          },
        ],
      });
      const out = res.content
        .filter((b) => b.type === "text")
        .map((b) => (b as { text: string }).text)
        .join(" ")
        .trim();
      if (out) headline = out.replace(/^["']|["']$/g, "");
    } catch (err) {
      console.error("IQCI headline generation failed, using default:", err);
    }
  }

  const edition: QuarterlyEdition = {
    id: label.replace(/\s+/g, "-").toLowerCase(),
    label,
    generatedAt: new Date().toISOString(),
    headline,
    highlights,
    distributedTo: PRESS_OUTLETS,
    reach: "120M+",
  };

  // Optional: the distribution agent emails the press list via Resend when configured.
  const resendKey = process.env.RESEND_API_KEY;
  const pressList = process.env.PRESS_RELEASE_LIST;
  if (resendKey && pressList) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "IQCDL <onboarding@resend.dev>",
        to: pressList.split(",").map((s) => s.trim()).filter(Boolean),
        subject: `IQCI ${label} — ${headline}`,
        text: `${headline}\n\n${highlights.join("\n")}\n\nFull index: ${new URL(request.url).origin}/quantum-index`,
      });
    } catch (err) {
      console.error("IQCI press distribution failed:", err);
    }
  }

  return NextResponse.json({ edition });
}
