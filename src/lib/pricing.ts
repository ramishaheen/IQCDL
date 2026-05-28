// Region-based pricing for IQCDL — adjusted for purchasing power, market
// perception, certification value and IAIDL brand positioning. The values
// below are the live price list; IQCDL reserves the right to revise them.

export interface Country {
  name: string;
  code: string; // ISO-3166 alpha-2
}

export interface Region {
  key: string;
  name: string;
  /** Base USD price per training token (one course, one candidate). */
  basePerToken: number;
  /** Optional floor — price will never fall below this. */
  floorPerToken?: number;
  /** Optional cap — price will never exceed this. */
  capPerToken?: number;
  /** Short context explaining the regional adjustment. */
  rationale: string;
  countries: Country[];
}

export const REGIONS: Region[] = [
  {
    key: "africa",
    name: "Africa",
    basePerToken: 35,
    capPerToken: 45,
    rationale:
      "Accessibility-first pricing aligned with regional purchasing power; capped at $45 per token.",
    countries: [
      { name: "Algeria", code: "DZ" },
      { name: "Cameroon", code: "CM" },
      { name: "Côte d'Ivoire", code: "CI" },
      { name: "Egypt", code: "EG" },
      { name: "Ethiopia", code: "ET" },
      { name: "Ghana", code: "GH" },
      { name: "Kenya", code: "KE" },
      { name: "Morocco", code: "MA" },
      { name: "Nigeria", code: "NG" },
      { name: "Rwanda", code: "RW" },
      { name: "Senegal", code: "SN" },
      { name: "South Africa", code: "ZA" },
      { name: "Tanzania", code: "TZ" },
      { name: "Tunisia", code: "TN" },
      { name: "Uganda", code: "UG" },
    ],
  },
  {
    key: "latam",
    name: "Latin America",
    basePerToken: 70,
    rationale:
      "Mid-tier pricing reflecting growing AI/quantum adoption and PPP across the region.",
    countries: [
      { name: "Argentina", code: "AR" },
      { name: "Brazil", code: "BR" },
      { name: "Chile", code: "CL" },
      { name: "Colombia", code: "CO" },
      { name: "Costa Rica", code: "CR" },
      { name: "Dominican Republic", code: "DO" },
      { name: "Ecuador", code: "EC" },
      { name: "Mexico", code: "MX" },
      { name: "Panama", code: "PA" },
      { name: "Peru", code: "PE" },
      { name: "Uruguay", code: "UY" },
    ],
  },
  {
    key: "asia",
    name: "Asia (ex-GCC)",
    basePerToken: 80,
    rationale:
      "Calibrated across mature and emerging Asian markets; reflects strong demand for credentialed practitioners.",
    countries: [
      { name: "Bangladesh", code: "BD" },
      { name: "China", code: "CN" },
      { name: "Hong Kong", code: "HK" },
      { name: "India", code: "IN" },
      { name: "Indonesia", code: "ID" },
      { name: "Japan", code: "JP" },
      { name: "Malaysia", code: "MY" },
      { name: "Pakistan", code: "PK" },
      { name: "Philippines", code: "PH" },
      { name: "Singapore", code: "SG" },
      { name: "South Korea", code: "KR" },
      { name: "Sri Lanka", code: "LK" },
      { name: "Taiwan", code: "TW" },
      { name: "Thailand", code: "TH" },
      { name: "Vietnam", code: "VN" },
    ],
  },
  {
    key: "oceania",
    name: "Oceania",
    basePerToken: 150,
    rationale:
      "Aligned with mature regulatory environments and high practitioner salary baselines.",
    countries: [
      { name: "Australia", code: "AU" },
      { name: "Fiji", code: "FJ" },
      { name: "New Zealand", code: "NZ" },
      { name: "Papua New Guinea", code: "PG" },
    ],
  },
  {
    key: "eu",
    name: "European Union & UK",
    basePerToken: 160,
    rationale:
      "Reflects EU PQC Roadmap and NIS2 driving institutional adoption; consistent with European certification price baselines.",
    countries: [
      { name: "Austria", code: "AT" },
      { name: "Belgium", code: "BE" },
      { name: "Czech Republic", code: "CZ" },
      { name: "Denmark", code: "DK" },
      { name: "Finland", code: "FI" },
      { name: "France", code: "FR" },
      { name: "Germany", code: "DE" },
      { name: "Greece", code: "GR" },
      { name: "Hungary", code: "HU" },
      { name: "Ireland", code: "IE" },
      { name: "Italy", code: "IT" },
      { name: "Netherlands", code: "NL" },
      { name: "Norway", code: "NO" },
      { name: "Poland", code: "PL" },
      { name: "Portugal", code: "PT" },
      { name: "Spain", code: "ES" },
      { name: "Sweden", code: "SE" },
      { name: "Switzerland", code: "CH" },
      { name: "United Kingdom", code: "GB" },
    ],
  },
  {
    key: "north-america",
    name: "USA & Canada",
    basePerToken: 180,
    rationale:
      "Reflects NIST PQC leadership and the mature North-American certification market.",
    countries: [
      { name: "Canada", code: "CA" },
      { name: "United States", code: "US" },
    ],
  },
  {
    key: "gcc",
    name: "GCC",
    basePerToken: 180,
    floorPerToken: 150,
    rationale:
      "Strategic-investment markets with strong sovereign and enterprise demand; floor of $150 per token.",
    countries: [
      { name: "Bahrain", code: "BH" },
      { name: "Kuwait", code: "KW" },
      { name: "Oman", code: "OM" },
      { name: "Qatar", code: "QA" },
      { name: "Saudi Arabia", code: "SA" },
      { name: "United Arab Emirates", code: "AE" },
    ],
  },
];

export interface BundleTier {
  label: string;
  minQty: number;
  maxQty: number; // inclusive; use Infinity for top tier
  discount: number; // 0..1
}

export const BUNDLE_TIERS: BundleTier[] = [
  { label: "1 – 4 tokens", minQty: 1, maxQty: 4, discount: 0 },
  { label: "5 – 20 tokens", minQty: 5, maxQty: 20, discount: 0.10 },
  { label: "21 – 50 tokens", minQty: 21, maxQty: 50, discount: 0.15 },
  { label: "51 – 100 tokens", minQty: 51, maxQty: 100, discount: 0.20 },
  { label: "100+ tokens", minQty: 101, maxQty: Number.POSITIVE_INFINITY, discount: 0.25 },
];

/** Returns the unit price for a region after applying any floor/cap. */
export function pricePerToken(region: Region): number {
  let p = region.basePerToken;
  if (region.floorPerToken != null) p = Math.max(p, region.floorPerToken);
  if (region.capPerToken != null) p = Math.min(p, region.capPerToken);
  return p;
}

export function bundleDiscount(qty: number): number {
  const t = BUNDLE_TIERS.find((tier) => qty >= tier.minQty && qty <= tier.maxQty);
  return t?.discount ?? 0;
}

/** Final cost for a quantity of tokens in a region (USD). */
export function totalFor(region: Region, qty: number): number {
  if (qty <= 0) return 0;
  const unit = pricePerToken(region);
  const d = bundleDiscount(qty);
  return Math.round(unit * qty * (1 - d));
}

export interface OtherProduct {
  key: string;
  name: string;
  description: string;
  price: string; // formatted human price
}

export const OTHER_PRODUCTS: OtherProduct[] = [
  {
    key: "iqci",
    name: "International Quantum Computing Index (IQCI) — data package",
    description:
      "Annual access to the deep country-data package, quarterly editions and category drill-downs.",
    price: "$500 / year",
  },
  {
    key: "gqa",
    name: "Global Quantum Award (GQA) — entry",
    description:
      "International categories. A reduced SME tier is available for emerging-market entries.",
    price: "$1,000 / entry · $500 SME tier",
  },
  {
    key: "initiative",
    name: "Initiative engagement",
    description:
      "Bespoke organisation engagement — assessment, migration roadmap, leadership briefings.",
    price: "from $5,000",
  },
  {
    key: "accreditation",
    name: "Initial center accreditation",
    description:
      "Become an accredited IQCDL center — $1,500 yearly royalty with a minimum 3-year commitment.",
    price: "$1,500 / year · 3-year minimum",
  },
  {
    key: "membership",
    name: "Community membership",
    description:
      "Annual community membership: AI quantum-expert agents, Quantum Guide chat, free course, 10% course discount.",
    price: "$19 / year",
  },
];

export const PRICE_REVISION_STATEMENT =
  "IQCDL reserves the right to revise prices each year without prior notice. The price list is reviewed every two years.";
