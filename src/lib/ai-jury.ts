import "server-only";
import { anthropicText } from "./anthropic";

export interface JuryResult {
  score: number; // 0–100
  verdict: string;
  needsEvidence: boolean;
  mode: "live" | "local";
}

const SYSTEM = `You are a neutral, vendor-agnostic AI jury for the IQCDL — the International Quantum Computing Driving License.
You assess submissions to the International Quantum Computing Index (IQCI) and the Global Quantum Award (GQA).
Judge strictly against international standards (NIST FIPS 203/204/205, ISO/IEC, IEEE, and the EU PQC roadmap), real-world impact, feasibility, and evidence quality.
Be impartial across countries, vendors and organisation sizes. Reward concrete evidence; penalise vague claims.
Respond ONLY with compact JSON: {"score": <integer 0-100>, "verdict": "<one or two sentences>", "needsEvidence": <true|false>}.
Set needsEvidence=true when the claim is plausible but not yet backed by verifiable documents.`;

function heuristicScore(text: string): JuryResult {
  const t = text.toLowerCase();
  let score = 45;
  const signals = [
    "nist", "iso", "ieee", "pqc", "fips", "patent", "peer-reviewed", "published",
    "deployed", "production", "funding", "grant", "partnership", "pilot", "roadmap",
    "sdg", "open-source", "benchmark", "qubits", "accelerator", "startup",
  ];
  for (const s of signals) if (t.includes(s)) score += 4;
  const words = t.split(/\s+/).filter(Boolean).length;
  if (words > 120) score += 6;
  if (words > 300) score += 4;
  if (words < 40) score -= 12;
  score = Math.max(5, Math.min(96, score));
  const needsEvidence = words < 60 || !/[0-9]/.test(t);
  return {
    score,
    verdict: needsEvidence
      ? "Plausible but under-evidenced — submit verifiable documents (official letters, publications, metrics) for a higher score."
      : "Coherent, standards-aware submission with concrete signals. Stronger quantitative proof would raise the score further.",
    needsEvidence,
    mode: "local",
  };
}

export async function juryAssess(input: string): Promise<JuryResult> {
  const text = (input ?? "").trim();
  if (!text) return { score: 0, verdict: "Empty submission.", needsEvidence: true, mode: "local" };

  const raw = await anthropicText({
    system: SYSTEM,
    messages: [{ role: "user", content: text.slice(0, 6000) }],
    maxTokens: 400,
  });
  if (raw) {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]) as Partial<JuryResult>;
        const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));
        return {
          score,
          verdict: String(parsed.verdict ?? "").slice(0, 400) || "Assessed.",
          needsEvidence: Boolean(parsed.needsEvidence),
          mode: "live",
        };
      } catch (err) {
        console.error("AI jury JSON parse failed, falling back:", err);
      }
    }
  }
  return heuristicScore(text);
}

const IMPROVE_SYSTEM = `You are an expert grant and award writer for quantum-computing initiatives.
Rewrite the user's draft into a clear, compelling, standards-aware award/index submission.
Keep it truthful — never invent metrics or facts the user did not provide.
Structure it with: the idea, why it matters, evidence/impact, and alignment to international standards (NIST/ISO-IEC/IEEE/EU PQC) where relevant.
Return only the improved text, no preamble.`;

export async function improveDraft(input: string): Promise<{ text: string; mode: "live" | "local" }> {
  const text = (input ?? "").trim();
  if (!text) return { text: "", mode: "local" };
  const out = await anthropicText({
    system: IMPROVE_SYSTEM,
    messages: [{ role: "user", content: text.slice(0, 6000) }],
    maxTokens: 900,
  });
  if (out) return { text: out, mode: "live" };
  // Local fallback: light structuring of the existing draft.
  const polished = `Idea & impact: ${text}\n\nStandards alignment: This initiative is designed to align with international standards (NIST FIPS 203/204/205, ISO/IEC, IEEE and the EU PQC roadmap). Add specific evidence — publications, deployments, metrics or letters — to strengthen the submission.`;
  return { text: polished, mode: "local" };
}
