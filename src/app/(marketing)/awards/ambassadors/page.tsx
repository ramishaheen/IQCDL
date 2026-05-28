"use client";

import Link from "next/link";
import {
  Globe2,
  Megaphone,
  Trophy,
  Users,
  HeartHandshake,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import JsonLd from "@/components/JsonLd";

const SITE = "https://iqcdl.org";
const PAGE_URL = `${SITE}/awards/ambassadors`;

const WEBPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Become a Country Ambassador — IQCDL Global Quantum & AI Award",
  description:
    "Represent IQCDL and the Global Quantum & AI Award in your country: drive registrations, host roadshows, onboard partners and sponsors, and steward the 2027 / 2028 / 2029 Global Cycle nationally.",
  url: PAGE_URL,
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "IQCDL",
    url: SITE,
  },
  about: {
    "@type": "Organization",
    name: "IQCDL",
    url: SITE,
  },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Global Quantum & AI Award",
      item: `${SITE}/awards`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Country Ambassadors",
      item: PAGE_URL,
    },
  ],
};

const JOB_POSTING_LD = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "IQCDL Country Ambassador — Global Quantum & AI Award",
  description:
    "Represent IQCDL and the IAIDL group in your country across the 2027 / 2028 / 2029 Global Cycle. Drive registrations and submissions, host kickoffs and roadshows, onboard partners and sponsors, and act as the national point of contact for the Grand Ceremony in Dubai.",
  datePosted: "2026-05-28",
  validThrough: "2027-10-31",
  employmentType: "VOLUNTEER",
  hiringOrganization: {
    "@type": "Organization",
    name: "IQCDL",
    sameAs: SITE,
    logo: `${SITE}/icon.svg`,
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
  directApply: true,
  url: PAGE_URL,
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who can become a country ambassador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Senior leaders working in or with the quantum / AI ecosystem in a specific country — typically founders, partners, academics, accelerator leads, professional-body officers or senior consultants. One primary ambassador per country, with co-ambassadors possible for large markets.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a paid role?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ambassador role is volunteer / honorary by design. Ambassadors receive recognition, VIP access to all award phases including the Dubai ceremony, an official credential, and revenue-share / partner benefits on programs they enable.",
      },
    },
    {
      "@type": "Question",
      name: "What does the role involve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drive registrations and submissions for the 2027 / 2028 / 2029 cycles, host local kickoffs and roadshows, onboard partners and sponsors, act as the national press / media contact, and represent IQCDL at relevant policy and industry events.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the appointment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A two-year initial appointment renewable for the next cycle, aligned with the fixed 2027 / 2028 / 2029 schedule.",
      },
    },
  ],
};

const EVENT_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "GQA 2027 — Country Ambassadors Onboarding",
  description:
    "Phase 1 of the 2027 Global Cycle: worldwide ambassador onboarding, country chapters activation and category announcements.",
  startDate: "2027-01-01",
  endDate: "2027-03-31",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: {
    "@type": "VirtualLocation",
    url: PAGE_URL,
  },
  organizer: {
    "@type": "Organization",
    name: "IQCDL",
    url: SITE,
  },
  url: PAGE_URL,
};

const ROLE_BULLETS = [
  "Drive registrations and submissions in your country for the 2027 / 2028 / 2029 cycles.",
  "Host local kickoffs, webinars and roadshows aligned to the fixed schedule.",
  "Onboard strategic partners, sponsors and government bodies.",
  "Act as the national press, media and policy contact for the award.",
  "Represent IQCDL on stage at relevant industry, academic and government events.",
  "Coordinate finalists' travel and VIP delegation to the Dubai Grand Ceremony (Nov 2027).",
];

const BENEFITS = [
  {
    icon: Trophy,
    title: "Recognition",
    body: "Official ambassador credential, badge on your country page, named role on the award programme.",
  },
  {
    icon: HeartHandshake,
    title: "VIP access",
    body: "Front-row access to all five award phases, including the Grand Ceremony in Dubai (Nov 2027) and the 2029 Mega Edition.",
  },
  {
    icon: Megaphone,
    title: "Platform & exposure",
    body: "Speaking slots at IQCDL events, press introductions, content syndication via IAIDL group channels.",
  },
  {
    icon: Users,
    title: "Network",
    body: "Direct access to the global ambassador circle — leaders across 94+ IAIDL countries already in the network.",
  },
  {
    icon: ShieldCheck,
    title: "Standards-backed",
    body: "Represent a vendor-neutral, ISO-aligned, WEF-allied, NIST-mapped framework. The credibility is yours to wield.",
  },
  {
    icon: Globe2,
    title: "Revenue share",
    body: "Partner-tier benefits and program revenue share on accredited centers and enterprise engagements you enable in-country.",
  },
];

export default function AmbassadorsPage() {
  return (
    <>
      <JsonLd data={WEBPAGE_LD} />
      <JsonLd data={BREADCRUMB_LD} />
      <JsonLd data={JOB_POSTING_LD} />
      <JsonLd data={FAQ_LD} />
      <JsonLd data={EVENT_LD} />

      <PageHero
        eyebrow="Country ambassadors"
        title="Lead the Global Quantum & AI Award in your country"
        subtitle="A two-year appointment, three global cycles, one Grand Ceremony in Dubai. Become the national voice of IQCDL — and steward the post-quantum era at home."
      />

      {/* Why this role */}
      <section className="section pt-0">
        <div className="container-x grid gap-8 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="card h-full bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-7 sm:p-9">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The role
              </span>
              <h2 className="mt-3 text-2xl font-bold text-fg sm:text-3xl">
                One ambassador per country
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                IQCDL is appointing senior leaders to represent the Global
                Quantum & AI Award in their countries across the fixed
                2027 / 2028 / 2029 Global Cycle. Co-ambassadors are possible
                for larger markets. The role is volunteer / honorary by design,
                and comes with recognition, VIP access and partner-tier
                benefits.
              </p>
              <ul className="mt-5 space-y-2.5">
                {ROLE_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-quantum-cyan" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card h-full p-7 sm:p-9">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                At a glance
              </span>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3 border-b border-line/10 pb-2.5">
                  <dt className="text-muted">Term</dt>
                  <dd className="text-end font-semibold text-fg">2 years (renewable)</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-line/10 pb-2.5">
                  <dt className="text-muted">Compensation</dt>
                  <dd className="text-end font-semibold text-fg">Volunteer + revenue share</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-line/10 pb-2.5">
                  <dt className="text-muted">Location</dt>
                  <dd className="text-end font-semibold text-fg">Remote · in-country</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-line/10 pb-2.5">
                  <dt className="text-muted">Commitment</dt>
                  <dd className="text-end font-semibold text-fg">~4–8 hrs / week</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-line/10 pb-2.5">
                  <dt className="text-muted">Cycle alignment</dt>
                  <dd className="text-end font-semibold text-fg">2027 · 2028 · 2029</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Apply window</dt>
                  <dd className="text-end font-semibold text-fg">Now → 31 Oct 2027</dd>
                </div>
              </dl>
              <Link
                href="mailto:ambassadors@iqcdl.org?subject=IQCDL%20Country%20Ambassador%20application"
                className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 text-white"
              >
                Apply now
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <p className="mt-3 text-xs text-faint">
                Email <a className="underline-offset-2 hover:underline" href="mailto:ambassadors@iqcdl.org">ambassadors@iqcdl.org</a> with your country, CV / LinkedIn and a short note on the network you bring.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">
              What ambassadors get
            </h2>
            <p className="mt-3 text-muted">
              Recognition, access, exposure and revenue — backed by a standards-aligned, vendor-neutral global award.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.07}>
                <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-fg">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x mx-auto max-w-3xl">
          <Reveal className="text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">Frequently asked</h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {FAQ_LD.mainEntity.map((q) => (
              <Reveal key={q.name}>
                <details className="card group p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-semibold text-fg">
                    {q.name}
                    <span className="text-quantum-cyan transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
