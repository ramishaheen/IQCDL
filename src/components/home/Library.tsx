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

export function Library() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The IQCDL library</span>
          <h2 className="gradient-text-animated mt-3 text-3xl font-bold sm:text-4xl">
            Four books, one quantum-readiness stack
          </h2>
          <p className="mt-3 text-balance text-muted">
            Award guideline, country index, accreditation playbook and per-center token pricing — pick a book, turn the pages.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKS.map((b, i) => (
            <Reveal key={b.key} delay={(i % 4) * 0.07}>
              <div className="flex h-full flex-col items-center">
                <Book3D
                  coverTitle={b.coverTitle}
                  coverSubtitle={b.coverSubtitle}
                  hint={b.hint}
                  openLabel={b.openLabel}
                  accent={b.accent}
                  pages={b.pages}
                />
                {/* shelf glow under the book */}
                <div className="mx-auto -mt-1 h-3 w-40 rounded-full bg-gradient-to-r from-transparent via-quantum-cyan/40 to-transparent blur-md" />
                <h3 className="mt-5 text-center text-lg font-bold text-fg">{b.title}</h3>
                <p className="mt-2 max-w-xs text-center text-sm leading-relaxed text-muted">
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
