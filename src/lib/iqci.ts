// International Quantum Computing Index — illustrative global dataset.
// The live index is AI-generated and revised every quarter by a dedicated
// country-data agent, and updated as countries submit evidence or as quantum
// news breaks. This seed powers the scatter plot, the full country index,
// the rubric and the quarterly editions UI.

export const PILLAR_KEYS = [
  "research",
  "talent",
  "investment",
  "infrastructure",
  "policy",
  "security",
  "environment",
  "ethics",
] as const;

export type PillarKey = (typeof PILLAR_KEYS)[number];

const PILLAR_LABEL: Record<PillarKey, string> = {
  research: "research & publications",
  talent: "talent & education",
  investment: "investment & funding",
  infrastructure: "infrastructure & hardware",
  policy: "policy & strategy",
  security: "PQC & security readiness",
  environment: "environmental sustainability",
  ethics: "ethics & responsible use",
};

export interface CountryIndex {
  rank: number;
  country: string;
  flag: string;
  score: number;
  pillars: Record<PillarKey, number>;
  status: string;
}

interface RawCountry {
  country: string;
  flag: string;
  // [research, talent, investment, infrastructure, policy, security, environment, ethics]
  p: [number, number, number, number, number, number, number, number];
}

// Comprehensive global coverage incl. all Middle East nations.
const RAW: RawCountry[] = [
  // North America
  { country: "United States", flag: "🇺🇸", p: [93, 88, 96, 92, 86, 90, 70, 78] },
  { country: "Canada", flag: "🇨🇦", p: [78, 80, 70, 64, 72, 70, 78, 86] },
  { country: "Mexico", flag: "🇲🇽", p: [40, 46, 34, 36, 42, 38, 44, 50] },
  // Europe
  { country: "United Kingdom", flag: "🇬🇧", p: [82, 84, 74, 70, 83, 76, 80, 84] },
  { country: "Germany", flag: "🇩🇪", p: [84, 78, 72, 76, 85, 80, 86, 86] },
  { country: "France", flag: "🇫🇷", p: [77, 74, 73, 66, 80, 68, 80, 80] },
  { country: "Netherlands", flag: "🇳🇱", p: [76, 74, 66, 72, 78, 72, 82, 82] },
  { country: "Switzerland", flag: "🇨🇭", p: [82, 80, 70, 70, 74, 72, 82, 84] },
  { country: "Sweden", flag: "🇸🇪", p: [72, 72, 60, 62, 70, 66, 90, 88] },
  { country: "Finland", flag: "🇫🇮", p: [70, 72, 58, 66, 72, 68, 88, 88] },
  { country: "Denmark", flag: "🇩🇰", p: [66, 70, 56, 60, 68, 64, 90, 88] },
  { country: "Norway", flag: "🇳🇴", p: [60, 66, 58, 58, 66, 62, 86, 86] },
  { country: "Italy", flag: "🇮🇹", p: [66, 64, 52, 54, 62, 58, 68, 70] },
  { country: "Spain", flag: "🇪🇸", p: [64, 66, 54, 56, 64, 58, 70, 72] },
  { country: "Austria", flag: "🇦🇹", p: [62, 64, 50, 56, 62, 58, 78, 78] },
  { country: "Ireland", flag: "🇮🇪", p: [58, 66, 56, 58, 64, 60, 72, 80] },
  { country: "Belgium", flag: "🇧🇪", p: [60, 62, 50, 56, 62, 58, 74, 78] },
  { country: "Poland", flag: "🇵🇱", p: [54, 60, 42, 46, 56, 50, 56, 60] },
  { country: "Czechia", flag: "🇨🇿", p: [56, 58, 44, 50, 56, 52, 58, 64] },
  { country: "Estonia", flag: "🇪🇪", p: [52, 60, 44, 52, 66, 64, 66, 76] },
  { country: "Portugal", flag: "🇵🇹", p: [52, 56, 42, 48, 56, 50, 70, 72] },
  { country: "Greece", flag: "🇬🇷", p: [48, 54, 36, 42, 52, 46, 58, 62] },
  { country: "Russia", flag: "🇷🇺", p: [72, 66, 50, 58, 60, 56, 40, 38] },
  // Asia–Pacific
  { country: "China", flag: "🇨🇳", p: [94, 86, 90, 93, 88, 78, 60, 50] },
  { country: "Japan", flag: "🇯🇵", p: [80, 72, 66, 82, 70, 74, 74, 78] },
  { country: "South Korea", flag: "🇰🇷", p: [78, 76, 72, 80, 74, 72, 70, 74] },
  { country: "Taiwan", flag: "🇹🇼", p: [66, 68, 60, 78, 62, 64, 64, 72] },
  { country: "India", flag: "🇮🇳", p: [62, 72, 50, 48, 64, 54, 50, 58] },
  { country: "Singapore", flag: "🇸🇬", p: [64, 66, 56, 52, 74, 60, 70, 74] },
  { country: "Australia", flag: "🇦🇺", p: [70, 72, 58, 60, 72, 66, 72, 80] },
  { country: "New Zealand", flag: "🇳🇿", p: [56, 62, 44, 50, 64, 56, 80, 84] },
  { country: "Malaysia", flag: "🇲🇾", p: [42, 50, 38, 40, 50, 44, 48, 54] },
  { country: "Vietnam", flag: "🇻🇳", p: [40, 52, 34, 38, 48, 42, 44, 48] },
  { country: "Thailand", flag: "🇹🇭", p: [38, 46, 32, 36, 46, 40, 46, 50] },
  { country: "Indonesia", flag: "🇮🇩", p: [36, 46, 30, 32, 44, 36, 44, 48] },
  { country: "Philippines", flag: "🇵🇭", p: [32, 44, 26, 30, 40, 34, 42, 48] },
  { country: "Kazakhstan", flag: "🇰🇿", p: [34, 42, 30, 34, 44, 38, 42, 44] },
  { country: "Pakistan", flag: "🇵🇰", p: [30, 42, 22, 26, 36, 30, 36, 40] },
  { country: "Bangladesh", flag: "🇧🇩", p: [26, 38, 20, 24, 34, 28, 36, 40] },
  // Middle East (full coverage)
  { country: "Israel", flag: "🇮🇱", p: [80, 80, 72, 68, 72, 74, 64, 66] },
  { country: "United Arab Emirates", flag: "🇦🇪", p: [52, 48, 84, 62, 78, 60, 66, 60] },
  { country: "Saudi Arabia", flag: "🇸🇦", p: [48, 46, 80, 58, 74, 56, 58, 52] },
  { country: "Qatar", flag: "🇶🇦", p: [44, 44, 72, 54, 70, 54, 58, 54] },
  { country: "Turkey", flag: "🇹🇷", p: [52, 56, 44, 48, 56, 48, 52, 50] },
  { country: "Iran", flag: "🇮🇷", p: [54, 56, 36, 44, 48, 42, 40, 38] },
  { country: "Bahrain", flag: "🇧🇭", p: [34, 40, 56, 46, 60, 48, 52, 52] },
  { country: "Kuwait", flag: "🇰🇼", p: [34, 38, 58, 44, 58, 46, 48, 50] },
  { country: "Oman", flag: "🇴🇲", p: [30, 36, 50, 42, 56, 44, 50, 52] },
  { country: "Egypt", flag: "🇪🇬", p: [40, 48, 34, 36, 48, 40, 44, 46] },
  { country: "Jordan", flag: "🇯🇴", p: [34, 44, 32, 34, 48, 40, 48, 52] },
  { country: "Lebanon", flag: "🇱🇧", p: [34, 46, 24, 28, 38, 34, 38, 42] },
  { country: "Iraq", flag: "🇮🇶", p: [22, 32, 24, 24, 34, 28, 30, 32] },
  { country: "Palestine", flag: "🇵🇸", p: [20, 32, 16, 18, 28, 24, 30, 36] },
  { country: "Syria", flag: "🇸🇾", p: [16, 24, 12, 16, 22, 18, 22, 24] },
  { country: "Yemen", flag: "🇾🇪", p: [12, 20, 10, 12, 20, 16, 20, 22] },
  // Africa
  { country: "South Africa", flag: "🇿🇦", p: [50, 54, 38, 40, 52, 44, 52, 56] },
  { country: "Morocco", flag: "🇲🇦", p: [36, 44, 30, 34, 46, 38, 50, 50] },
  { country: "Tunisia", flag: "🇹🇳", p: [34, 44, 26, 30, 44, 36, 46, 50] },
  { country: "Nigeria", flag: "🇳🇬", p: [34, 48, 28, 28, 40, 34, 38, 42] },
  { country: "Kenya", flag: "🇰🇪", p: [32, 46, 28, 30, 42, 36, 44, 48] },
  { country: "Algeria", flag: "🇩🇿", p: [30, 40, 26, 30, 40, 34, 38, 42] },
  { country: "Rwanda", flag: "🇷🇼", p: [24, 38, 24, 26, 42, 32, 48, 54] },
  { country: "Ghana", flag: "🇬🇭", p: [26, 38, 22, 24, 36, 30, 40, 48] },
  { country: "Ethiopia", flag: "🇪🇹", p: [22, 34, 18, 20, 32, 26, 32, 36] },
  // South America
  { country: "Brazil", flag: "🇧🇷", p: [56, 58, 42, 44, 54, 46, 60, 58] },
  { country: "Argentina", flag: "🇦🇷", p: [50, 56, 36, 40, 50, 44, 54, 56] },
  { country: "Chile", flag: "🇨🇱", p: [46, 52, 38, 42, 54, 46, 58, 60] },
  { country: "Colombia", flag: "🇨🇴", p: [40, 48, 32, 34, 46, 40, 48, 50] },
  { country: "Peru", flag: "🇵🇪", p: [32, 42, 26, 28, 40, 34, 44, 46] },
];

function pillarsOf(p: RawCountry["p"]): Record<PillarKey, number> {
  return {
    research: p[0], talent: p[1], investment: p[2], infrastructure: p[3],
    policy: p[4], security: p[5], environment: p[6], ethics: p[7],
  };
}

export function topPillarKey(pillars: Record<PillarKey, number>): PillarKey {
  return PILLAR_KEYS.reduce((a, b) => (pillars[b] > pillars[a] ? b : a));
}

export function bottomPillarKey(pillars: Record<PillarKey, number>): PillarKey {
  return PILLAR_KEYS.reduce((a, b) => (pillars[b] < pillars[a] ? b : a));
}

function statusFor(pillars: Record<PillarKey, number>): string {
  const top = topPillarKey(pillars);
  const low = bottomPillarKey(pillars);
  return `Strongest in ${PILLAR_LABEL[top]}; ${PILLAR_LABEL[low]} is the priority gap to close.`;
}

export const COUNTRIES: CountryIndex[] = RAW.map((r) => {
  const pillars = pillarsOf(r.p);
  const score = Math.round(PILLAR_KEYS.reduce((s, k) => s + pillars[k], 0) / PILLAR_KEYS.length);
  return { country: r.country, flag: r.flag, pillars, score, status: statusFor(pillars), rank: 0 };
})
  .sort((a, b) => b.score - a.score)
  .map((c, i) => ({ ...c, rank: i + 1 }));

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
