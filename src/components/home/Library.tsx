"use client";

import { Book3D, type BookPage } from "@/components/visuals/Book3D";
import { Reveal } from "@/components/ui/Reveal";

interface LibraryBook {
  key: string;
  title: string;
  description: string;
  coverTitle: string;
  coverSubtitle: string;
  hint: string;
  openLabel: string;
  accent: string;
  pages: BookPage[];
}

const BOOKS: LibraryBook[] = [
  {
    key: "award",
    title: "Quantum Award — Yellow Book",
    description:
      "Award guideline and criteria — categories, rubric and how a neutral AI jury scores entries.",
    coverTitle: "Award Guideline",
    coverSubtitle: "Categories & criteria",
    hint: "Turn the pages",
    openLabel: "Open the Yellow Book",
    accent: "from-amber-500 to-yellow-400",
    pages: [
      {
        title: "What the GQA is",
        lines: [
          "The Global Quantum & AI Award (GQA) is IQCDL's flagship international recognition.",
          "Biennial cycle: 2027, 2029 (plus a Mega Edition every 2 cycles).",
          "Awards go to entities — SMEs, governments, accelerators, universities, partners.",
          "Standards-aligned, vendor-neutral; backed by the IAIDL group across 94+ countries.",
        ],
      },
      {
        title: "Categories",
        lines: [
          "Best Initiative — programme that moves a country / org forward.",
          "Best Idea — early-stage breakthrough proposals.",
          "Best Accelerator — bodies amplifying others' quantum work.",
          "Best Green Quantum-AI Idea — sustainability-anchored entries.",
          "Best Government Programme — national / sub-national policy wins.",
          "International Open Category — global, cross-cutting entries.",
        ],
      },
      {
        title: "How it's scored",
        lines: [
          "Stage 1: a neutral AI jury reads every submission against a published rubric.",
          "Stage 2: a human jury panel confirms shortlists and final winners.",
          "Rubric weights: research, talent, investment, security, ethics, impact, scalability, governance.",
          "Standards mapped: NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132, EU PQC Roadmap.",
          "Every entrant receives an auditable scorecard — no black boxes.",
        ],
      },
      {
        title: "The 2027 cycle timeline",
        lines: [
          "Phase 1 (Jan–Mar 2027) — global kickoff, country chapters, ambassadors.",
          "Phase 2 (Apr–Jun 2027) — submission & AI readiness assessment.",
          "Phase 3 (Jul–Sep 2027) — technical evaluation, jury reviews.",
          "Phase 4 (Oct 2027) — finalists' announcement.",
          "Phase 5 (Nov 2027) — Grand Ceremony, Dubai.",
        ],
      },
      {
        title: "SDG impact",
        lines: [
          "100% of award proceeds advance the UN Sustainable Development Goals.",
          "Funds quantum-capability building in resource-constrained regions.",
          "Reinvested into the free 'Quantum Computing for Everyone' programme.",
          "Reporting is published annually with the next call for entries.",
        ],
      },
      {
        title: "How to enter",
        lines: [
          "Category entry — $1,000 (SME tier $500 for emerging markets).",
          "Full entity quantum-readiness AI assessment — $5,000.",
          "Submit at iqcdl.org/awards/submit during the Apr–Jun 2027 window.",
          "Country ambassadors can fast-track partner / sponsor introductions.",
        ],
      },
      {
        title: "What winners receive",
        lines: [
          "Crystal trophy + signed credential, presented at the Dubai Ceremony.",
          "Press feature in the GQA annual report + IAIDL group channels.",
          "Speaking slot at a subsequent IQCDL event.",
          "Permanent listing in the GQA Hall of Builders.",
        ],
      },
      {
        title: "Press & contact",
        lines: [
          "Press kit: iqcdl.org/awards (logos, jury bios, embargoed assets).",
          "General entries: admin@iqcdl.org",
          "Ambassador applications: admin@iqcdl.org",
          "Partnerships & sponsorship: admin@iqcdl.org",
        ],
      },
    ],
  },
  {
    key: "index",
    title: "Quantum Index — Blue Book",
    description:
      "Explore the index — country by country. Open the full details and turn through every country's quantum standing, category by category.",
    coverTitle: "Quantum Index",
    coverSubtitle: "Country by country",
    hint: "Turn the pages",
    openLabel: "Open the Blue Book",
    accent: "from-brand-600 to-quantum-cyan",
    pages: [
      {
        title: "What the IQCI measures",
        lines: [
          "International Quantum Computing Index — quantum readiness per country.",
          "Vendor-neutral, standards-aligned, refreshed quarterly.",
          "Produced by IQCDL, distributed to press, partners and the public.",
          "Designed to inform policy, procurement and partnership decisions.",
        ],
      },
      {
        title: "The eight pillars",
        lines: [
          "Research — papers, patents, public labs.",
          "Talent — graduates, retention, mobility.",
          "Investment — public + private capital flows.",
          "Infrastructure — qubits, cloud access, networking.",
          "Policy — national strategies, regulation.",
          "PQC security — NIST PQC adoption, crypto-agility.",
          "Environmental — energy and cooling impact.",
          "Ethics — governance, dual-use guardrails.",
        ],
      },
      {
        title: "How it's scored",
        lines: [
          "A country-data agent gathers public, verifiable evidence per pillar.",
          "An AI jury scores each pillar against a published rubric (0–100).",
          "Country scores are normalised so cross-country comparisons are fair.",
          "Editorial agent compiles the quarterly edition; distribution agent ships it.",
        ],
      },
      {
        title: "The data agent pipeline",
        lines: [
          "Source ingestion — government registers, peer-reviewed papers, news.",
          "Evidence weighting — primary > secondary > tertiary signals.",
          "Bias control — country submissions cross-checked against open sources.",
          "Reproducibility — every score links back to its source evidence.",
        ],
      },
      {
        title: "Quarterly editions",
        lines: [
          "Q1, Q2, Q3, Q4 — released within 6 weeks of quarter-end.",
          "Each edition: country rankings, pillar drill-downs, movement analysis.",
          "Distributed to press, ambassadors, government desks, and partners.",
          "Mirror copy on iqcdl.org/quantum-index — free to read.",
        ],
      },
      {
        title: "Dataset package",
        lines: [
          "Full machine-readable dataset (CSV + JSON) — $500 / year.",
          "Quarterly updates, with the underlying per-pillar evidence linked.",
          "Licence: cite IQCDL · don't resell raw rows · derived analysis is yours.",
          "Used by think-tanks, ministries, consultancies and analyst desks.",
        ],
      },
      {
        title: "Use the data",
        lines: [
          "Benchmark your country's strengths and gaps.",
          "Cite in policy briefs, white papers and procurement decisions.",
          "Inform partner / vendor selection with neutral evidence.",
          "Track movement over time — quarter on quarter, year on year.",
        ],
      },
      {
        title: "Submit & contact",
        lines: [
          "Country desks can submit additional evidence at quantum-index/submit.",
          "Data access & licensing: admin@iqcdl.org",
          "Methodology feedback: admin@iqcdl.org",
          "Press requests: admin@iqcdl.org",
        ],
      },
    ],
  },
  {
    key: "accreditation",
    title: "Accredited Center — Green Book",
    description:
      "How to become an IQCDL-accredited training center — eligibility, royalty model, training and delivery.",
    coverTitle: "Accreditation",
    coverSubtitle: "Training & delivery",
    hint: "Turn the pages",
    openLabel: "Open the Green Book",
    accent: "from-emerald-500 to-emerald-300",
    pages: [
      {
        title: "What accreditation means",
        lines: [
          "You become an IQCDL-recognised training centre in your country.",
          "You deliver IQCDL programs locally with the official credential.",
          "Standards-backed: NIST PQC, ISO/IEC 4879, IEEE P7131/P7132, EU PQC Roadmap.",
          "Co-marketed via IQCDL + IAIDL group channels (94+ country network).",
        ],
      },
      {
        title: "Who can apply",
        lines: [
          "Universities, polytechnics and academies.",
          "Professional bodies and standards organisations.",
          "Enterprise learning groups in tech, finance, telco, government.",
          "IAIDL-network partners — priority onboarding lane.",
          "Independent boutique centres — case-by-case review.",
        ],
      },
      {
        title: "Royalty & commitment",
        lines: [
          "$1,500 / year initial accreditation fee.",
          "Minimum 3-year commitment — locks pricing for your term.",
          "Regional token pricing is fixed at your accreditation date.",
          "Annual quality review against the published rubric.",
          "Renewal: full 3-year terms with refreshed curriculum.",
        ],
      },
      {
        title: "Foundation track",
        lines: [
          "Audience: leaders, CISOs, IT managers, compliance, procurement.",
          "Format: 3 days, no coding required.",
          "Outcome: IQCDL Foundation credential.",
          "Mapped to: ISO/IEC 4879 base concepts, NIST risk language.",
          "Pre-reqs: none — designed to take 'quantum-curious' to 'quantum-literate'.",
        ],
      },
      {
        title: "Practitioner track",
        lines: [
          "Audience: developers, cryptographers, security architects.",
          "Format: 5 days, hands-on labs.",
          "Outcome: IQCDL Practitioner credential.",
          "Mapped to: NIST FIPS 203/204/205, IEEE P7131/P7132, EU PQC Roadmap.",
          "Stretch: PQC migration mini-project on a real codebase.",
        ],
      },
      {
        title: "Free intro course",
        lines: [
          "'Quantum Computing for Everyone' — open access, no sign-up barrier.",
          "Two short modules + a 2-minute readiness assessment.",
          "Available in every accredited centre's portal.",
          "Funded by award proceeds and partner sponsors.",
        ],
      },
      {
        title: "Onboarding & timeline",
        lines: [
          "Week 1 — application + due-diligence.",
          "Week 2 — accreditation agreement, royalty + commitment signed.",
          "Week 3 — instructor certification (train-the-trainer).",
          "Week 4 — centre activation, co-marketed launch in-country.",
          "Quarterly — support call with the IQCDL standards board.",
        ],
      },
      {
        title: "Apply",
        lines: [
          "Email: admin@iqcdl.org — include centre profile + country.",
          "Or: iqcdl.org/membership for community + indicative pricing.",
          "Pricing booklet: iqcdl.org/pricing.",
          "Ambassador route: admin@iqcdl.org for partner-led onboarding.",
        ],
      },
    ],
  },
  {
    key: "pricing",
    title: "Token Pricing — Red Book",
    description:
      "Per-center token pricing — purchasing-power calibrated by region, fair by design.",
    coverTitle: "Token Pricing",
    coverSubtitle: "Per region · per center",
    hint: "Turn the pages",
    openLabel: "Open the Red Book",
    accent: "from-red-500 to-rose-400",
    pages: [
      {
        title: "How we price",
        lines: [
          "Tokens fund one course, one candidate.",
          "Region-tiered — purchasing-power calibrated by IAIDL benchmarks.",
          "Not cost-plus: we price for accessibility AND brand positioning.",
          "Floors and caps protect both candidates and the centre economics.",
        ],
      },
      {
        title: "Regional tiers (USD / token)",
        lines: [
          "Africa — $35 (capped at $45).",
          "Latin America — $70.",
          "Asia (ex-GCC) — $80.",
          "Oceania — $150.",
          "European Union & UK — $160.",
          "USA & Canada — $180.",
          "GCC — $180 (floor $150).",
        ],
      },
      {
        title: "Bundle discounts",
        lines: [
          "1 – 4 tokens — list price.",
          "5 – 20 tokens — 10% off.",
          "21 – 50 tokens — 15% off.",
          "51 – 100 tokens — 20% off.",
          "100+ tokens — 25% off.",
        ],
      },
      {
        title: "Initial centre accreditation",
        lines: [
          "$1,500 / year initial accreditation fee.",
          "Minimum 3-year royalty commitment.",
          "Locks your regional token pricing for the full 3-year term.",
          "Renewable in full 3-year blocks at then-current rates.",
        ],
      },
      {
        title: "Other product lines",
        lines: [
          "IQCI dataset package — $500 / year (machine-readable, quarterly).",
          "GQA category entry — $1,000 (SME tier $500 for emerging markets).",
          "GQA full entity AI assessment — $5,000.",
          "Initiative engagement — from $5,000.",
          "Community membership — $19 / year.",
        ],
      },
      {
        title: "Worked example",
        lines: [
          "African accredited centre, 30 candidates in a quarter.",
          "Unit: $35 · qty: 30 · tier: 21–50 → 15% off.",
          "Sub-total: 30 × $35 = $1,050.",
          "Bundle discount: −$157.50 → centre invoice: $892.50.",
          "Cap applies if unit ever exceeds $45 / token (it doesn't here).",
        ],
      },
      {
        title: "Price-revision policy",
        lines: [
          "IQCDL reserves the right to revise prices each year, without prior notice.",
          "Full price list reviewed every 2 years.",
          "Accredited centres keep their accreditation-date rates for the 3-year term.",
          "Material changes are emailed in advance to active centres.",
        ],
      },
      {
        title: "Get the booklet",
        lines: [
          "Public booklet: iqcdl.org/pricing (always current).",
          "Quick estimator built in — pick region + token count.",
          "Per-country lookup table for procurement teams.",
          "Quotes: admin@iqcdl.org",
        ],
      },
    ],
  },
];

/* deterministic pseudo-random for SSR-safe particle field */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const r = seeded(42);
const PARTICLES = Array.from({ length: 36 }, () => ({
  cx: +(r() * 100).toFixed(2),
  cy: +(r() * 100).toFixed(2),
  rad: +(0.4 + r() * 1.6).toFixed(2),
  dur: +(2 + r() * 4).toFixed(2),
  delay: +(r() * 5).toFixed(2),
}));

function LightningBolt({
  d,
  delay,
  dur,
  width = 100,
  height = 400,
}: {
  d: string;
  delay: number;
  dur: number;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      {/* outer glow */}
      <path
        d={d}
        fill="none"
        stroke="rgba(125,211,252,0.65)"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;0.9;0.6;0"
          keyTimes="0;0.06;0.18;0.4"
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
      {/* core bolt */}
      <path
        d={d}
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;1;0.85;0"
          keyTimes="0;0.05;0.2;0.42"
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

/* left-edge bolts go from top-left toward the centre */
const LEFT_BOLTS = [
  { d: "M 0 40 L 35 95 L 18 130 L 60 200 L 30 245 L 70 320 L 45 380", delay: 0.4, dur: 6.5 },
  { d: "M 5 80 L 40 140 L 22 175 L 55 245 L 30 295 L 65 360", delay: 3.2, dur: 7.5 },
];
/* right-edge bolts mirror from top-right toward the centre */
const RIGHT_BOLTS = [
  { d: "M 100 50 L 65 110 L 82 145 L 40 215 L 70 260 L 32 335 L 58 390", delay: 1.6, dur: 6.5 },
  { d: "M 95 30 L 60 95 L 78 130 L 38 200 L 65 260 L 28 330", delay: 4.8, dur: 7.5 },
];

export function Library() {
  return (
    <section className="section relative overflow-hidden">
      {/* canvas background */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#070b1c] to-[#05070f]" />
        {/* faint grid */}
        <div className="absolute inset-0 opacity-[0.08] [background:linear-gradient(rgba(125,211,252,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.6)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_85%)]" />
        {/* central glow */}
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_60%)] blur-2xl" />
        {/* particle field */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <circle
              key={i}
              cx={`${p.cx}%`}
              cy={`${p.cy}%`}
              r={p.rad}
              fill="white"
              opacity="0.45"
            >
              <animate
                attributeName="opacity"
                values="0;0.7;0"
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
        {/* left lightning column */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-32 lg:w-40" aria-hidden="true">
          {LEFT_BOLTS.map((b, i) => (
            <LightningBolt key={`l-${i}`} d={b.d} delay={b.delay} dur={b.dur} />
          ))}
        </div>
        {/* right lightning column */}
        <div className="absolute inset-y-0 right-0 w-24 sm:w-32 lg:w-40" aria-hidden="true">
          {RIGHT_BOLTS.map((b, i) => (
            <LightningBolt key={`r-${i}`} d={b.d} delay={b.delay} dur={b.dur} />
          ))}
        </div>
        {/* edge fades into page bg */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-x relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-start">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-quantum-cyan/30 bg-[#05060f]/40 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.28em] text-quantum-cyan backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-quantum-cyan" />
              The IQCDL library
            </span>
          </div>
          <h2 className="mt-5 bg-gradient-to-b from-white via-white to-slate-300 bg-clip-text text-4xl font-black leading-[1.05] text-transparent drop-shadow-[0_4px_24px_rgba(56,189,248,0.25)] sm:text-5xl">
            Four books,<br className="hidden sm:block" /> one quantum-readiness stack
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-300/85">
            Award guideline, country index, accreditation playbook and per-center
            token pricing — pick a book, turn the pages.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKS.map((b, i) => (
            <Reveal key={b.key} delay={(i % 4) * 0.08}>
              <div className="flex h-full flex-col items-center">
                <Book3D
                  coverTitle={b.coverTitle}
                  coverSubtitle={b.coverSubtitle}
                  hint={b.hint}
                  openLabel={b.openLabel}
                  accent={b.accent}
                  pages={b.pages}
                />
                {/* shelf glow under each book */}
                <div className="mx-auto mt-2 h-3 w-44 rounded-full bg-gradient-to-r from-transparent via-quantum-cyan/55 to-transparent blur-md" />
                <h3 className="mt-5 text-center text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2 max-w-xs text-center text-sm leading-relaxed text-slate-300/85">
                  {b.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
