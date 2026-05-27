// International Quantum Computing Index — illustrative dataset.
// The live index is AI-generated and revised quarterly; this seed powers the
// scatter plot, the immersive country book and the quarterly editions UI.

export const PILLAR_KEYS = [
  "research",
  "talent",
  "investment",
  "infrastructure",
  "policy",
  "security",
] as const;

export type PillarKey = (typeof PILLAR_KEYS)[number];

export interface CountryIndex {
  rank: number;
  country: string;
  flag: string;
  score: number;
  pillars: Record<PillarKey, number>;
  status: string;
}

export const COUNTRIES: CountryIndex[] = [
  {
    rank: 1, country: "United States", flag: "🇺🇸", score: 91,
    pillars: { research: 93, talent: 88, investment: 96, infrastructure: 92, policy: 86, security: 90 },
    status: "Global leader across investment and hardware; scaling the quantum workforce is the main constraint.",
  },
  {
    rank: 2, country: "China", flag: "🇨🇳", score: 88,
    pillars: { research: 94, talent: 86, investment: 90, infrastructure: 93, policy: 88, security: 78 },
    status: "World-class research and infrastructure; open international collaboration remains limited.",
  },
  {
    rank: 3, country: "Germany", flag: "🇩🇪", score: 79,
    pillars: { research: 84, talent: 78, investment: 72, infrastructure: 76, policy: 85, security: 80 },
    status: "Strong research and policy base; commercialization of results is the key gap to close.",
  },
  {
    rank: 4, country: "United Kingdom", flag: "🇬🇧", score: 78,
    pillars: { research: 82, talent: 84, investment: 74, infrastructure: 70, policy: 83, security: 76 },
    status: "Excellent talent and policy; hardware scale lags the leading nations.",
  },
  {
    rank: 5, country: "Japan", flag: "🇯🇵", score: 74,
    pillars: { research: 80, talent: 72, investment: 66, infrastructure: 82, policy: 70, security: 74 },
    status: "Deep hardware and research strength; startup funding is comparatively thin.",
  },
  {
    rank: 6, country: "Canada", flag: "🇨🇦", score: 72,
    pillars: { research: 78, talent: 80, investment: 70, infrastructure: 64, policy: 72, security: 70 },
    status: "Pioneering quantum ecosystem and talent; infrastructure investment needs to keep pace.",
  },
  {
    rank: 7, country: "France", flag: "🇫🇷", score: 71,
    pillars: { research: 77, talent: 74, investment: 73, infrastructure: 66, policy: 80, security: 68 },
    status: "Ambitious national strategy and funding; security-readiness adoption is still maturing.",
  },
  {
    rank: 8, country: "United Arab Emirates", flag: "🇦🇪", score: 61,
    pillars: { research: 52, talent: 48, investment: 84, infrastructure: 62, policy: 78, security: 60 },
    status: "Bold strategy and capital; building the domestic research talent pipeline is the priority.",
  },
  {
    rank: 9, country: "India", flag: "🇮🇳", score: 59,
    pillars: { research: 62, talent: 72, investment: 50, infrastructure: 48, policy: 64, security: 54 },
    status: "Large, fast-growing talent pool; infrastructure and investment must scale to match ambition.",
  },
  {
    rank: 10, country: "Singapore", flag: "🇸🇬", score: 58,
    pillars: { research: 64, talent: 66, investment: 56, infrastructure: 52, policy: 74, security: 60 },
    status: "Agile policy and research hub; scale is naturally bounded — partnerships are the multiplier.",
  },
];

// Outlets the distribution agent notifies when a quarterly edition is published.
export const PRESS_OUTLETS = [
  "Reuters", "Bloomberg", "Associated Press", "Nature News", "MIT Technology Review",
  "IEEE Spectrum", "The Quantum Insider", "TechCrunch", "Wired", "World Economic Forum",
];

export interface QuarterlyEdition {
  id: string;
  label: string; // e.g. "Q2 2026"
  generatedAt: string; // ISO
  headline: string;
  highlights: string[];
  distributedTo: string[];
  reach: string; // e.g. "120M+"
}

export function currentQuarterLabel(d = new Date()): string {
  const q = Math.floor(d.getMonth() / 3) + 1;
  return `Q${q} ${d.getFullYear()}`;
}
