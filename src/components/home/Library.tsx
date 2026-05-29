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
        title: "Categories",
        lines: [
          "Best Initiative",
          "Best Idea",
          "Best Accelerator",
          "Best Green Quantum-AI Idea",
          "Best Government Programme",
          "International Open Category",
        ],
      },
      {
        title: "How it's scored",
        lines: [
          "Neutral AI jury reviews every submission against a published rubric",
          "Standards-aligned: NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132, EU PQC Roadmap",
          "Human jury panel confirms shortlists",
          "Scoring rubric is published — every entrant can audit their result",
        ],
      },
      {
        title: "SDG impact",
        lines: [
          "100% of award proceeds advance the UN Sustainable Development Goals",
          "Funds capacity-building in resource-constrained regions",
          "Backed by IAIDL group standards work",
        ],
      },
      {
        title: "How to enter",
        lines: [
          "Category entry: $1,000 (SME tier $500 for emerging markets)",
          "Full entity quantum-readiness AI assessment: $5,000",
          "2027 cycle: submissions open Apr–Jun 2027",
          "Grand Ceremony: November 2027, Dubai",
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
        title: "What it measures",
        lines: [
          "Quantum readiness, for every country",
          "Refreshed quarterly by a neutral AI jury",
          "Vendor-neutral and standards-aligned",
        ],
      },
      {
        title: "Eight pillars",
        lines: [
          "Research",
          "Talent",
          "Investment",
          "Infrastructure",
          "Policy",
          "PQC security",
          "Environmental sustainability",
          "Ethics",
        ],
      },
      {
        title: "How it's scored",
        lines: [
          "A country-data agent gathers public evidence",
          "AI jury scores each pillar against a published rubric",
          "Quarterly editions distributed to press, partners and the public",
        ],
      },
      {
        title: "Use the data",
        lines: [
          "Benchmark a country's strengths and gaps",
          "Cite in policy and procurement decisions",
          "Annual dataset package: $500 / year",
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
        title: "Who can apply",
        lines: [
          "Universities, polytechnics, academies",
          "Professional bodies and standards organisations",
          "Enterprise learning groups in tech, finance, government",
          "IAIDL-network partners get priority onboarding",
        ],
      },
      {
        title: "Royalty & commitment",
        lines: [
          "$1,500 / year initial accreditation",
          "Minimum 3-year commitment",
          "Locked-in regional token pricing for the term",
          "Annual quality review",
        ],
      },
      {
        title: "Training & delivery",
        lines: [
          "Foundation (3 days, no coding) — leaders, CISOs, IT, compliance",
          "Practitioner (5 days, hands-on) — developers, cryptographers, architects",
          "Free 'Quantum Computing for Everyone' intro course",
          "Standards-aligned curriculum: NIST PQC, ISO/IEC 4879, IEEE P7131/P7132",
        ],
      },
      {
        title: "Onboarding",
        lines: [
          "Application & due-diligence (≈2 weeks)",
          "Center activation and instructor certification",
          "Co-marketed launch in your country",
          "Quarterly support call with the IQCDL standards board",
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
        title: "Regional tiers (USD / token)",
        lines: [
          "Africa — $35 (capped at $45)",
          "Latin America — $70",
          "Asia (ex-GCC) — $80",
          "Oceania — $150",
          "European Union & UK — $160",
          "USA & Canada — $180",
          "GCC — $180 (floor $150)",
        ],
      },
      {
        title: "Bundle discounts",
        lines: [
          "1 – 4 tokens — list price",
          "5 – 20 tokens — 10% off",
          "21 – 50 tokens — 15% off",
          "51 – 100 tokens — 20% off",
          "100+ tokens — 25% off",
        ],
      },
      {
        title: "Other product lines",
        lines: [
          "IQCI dataset package — $500 / year",
          "GQA entry — $1,000 (SME tier $500)",
          "Initiative engagement — from $5,000",
          "Community membership — $19 / year",
        ],
      },
      {
        title: "Price revisions",
        lines: [
          "IQCDL reserves the right to revise prices each year without prior notice",
          "The full price list is reviewed every 2 years",
          "Accredited centers keep the rates set at accreditation for their 3-year term",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-quantum-cyan/30 bg-[#05060f]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-quantum-cyan backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-quantum-cyan" />
            The IQCDL library
          </span>
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
