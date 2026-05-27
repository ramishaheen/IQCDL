"use client";

import Link from "next/link";
import {
  Trophy,
  CalendarClock,
  Bot,
  CreditCard,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  Globe2,
  Sparkles,
  Lightbulb,
  Rocket,
  Leaf,
  Landmark,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { Book3D } from "@/components/visuals/Book3D";
import { FinalCTA } from "@/components/home/FinalCTA";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  initiative: Sparkles,
  idea: Lightbulb,
  accelerator: Rocket,
  green: Leaf,
  government: Landmark,
  international: Globe2,
};

const HOW_ICONS: LucideIcon[] = [CalendarClock, Bot, CreditCard, HeartHandshake];
const BENEFIT_ICONS: LucideIcon[] = [
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  Globe2,
  HeartHandshake,
  Sparkles,
];

export default function AwardsPage() {
  const { dict } = useLocale();
  const g = dict.gqa;

  return (
    <>
      <PageHero eyebrow={g.eyebrow} title={g.title} subtitle={g.subtitle} />

      {/* how it works */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">{g.howTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {g.how.map((h, i) => {
              const Icon = HOW_ICONS[i % HOW_ICONS.length];
              return (
                <Reveal key={h.title} delay={(i % 4) * 0.07}>
                  <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-fg">{h.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SDG band */}
      <section className="pb-4">
        <div className="container-x">
          <Reveal>
            <div className="card flex flex-col items-start gap-4 bg-gradient-to-br from-emerald-400/15 to-brand-400/5 p-7 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-brand-500 text-white">
                <HeartHandshake className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-fg">{g.sdgTitle}</h3>
                <p className="mt-1 text-muted">{g.sdgBody}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* categories */}
      <section className="section pb-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">{g.categoriesTitle}</h2>
            <p className="mt-3 text-muted">{g.categoriesNote}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.categories.map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.key] ?? Sparkles;
              return (
                <Reveal key={cat.key} delay={(i % 3) * 0.07}>
                  <div className="card group h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                        {g.categoryPrice}
                      </span>
                    </div>
                    <h3 className="mt-4 font-semibold text-fg">{cat.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{cat.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-10 flex flex-col items-center gap-5">
            <Link href="/awards/submit" className="btn-primary text-white">
              {g.submitCtaCategory}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Book3D
              coverTitle={g.guideTitle}
              coverSubtitle={g.guideNote}
              openLabel={g.guideOpen}
              accent="from-amber-500 to-quantum-cyan"
              pages={[
                { title: g.howTitle, lines: g.how.map((h) => `${h.title}: ${h.body}`) },
                { title: g.categoriesTitle, lines: g.categories.map((c) => `${c.name}: ${c.desc}`) },
                { title: g.benefitsTitle, lines: g.benefits.map((b) => `${b.title}: ${b.body}`) },
                { title: g.sdgTitle, lines: [g.sdgBody, g.criteriaNote] },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* benefits */}
      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">{g.benefitsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <Reveal key={b.title} delay={(i % 3) * 0.07}>
                  <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-fg">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* enroll CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-brand-500/20 via-surface/[0.04] to-brand-400/10 p-10 text-center sm:p-14">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
              <Trophy className="relative mx-auto h-10 w-10 text-accent" />
              <p className="relative mx-auto mt-4 max-w-2xl text-balance text-muted">
                {g.enrollNote}
              </p>
              <p className="relative mx-auto mt-3 max-w-2xl text-xs text-faint">{g.criteriaNote}</p>
              <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="mailto:awards@iqcdl.org?subject=GQA%20enrollment"
                  className="btn-primary text-white"
                >
                  {g.enrollCta}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
                <Link href="/standards" className="btn-ghost">
                  {dict.nav.standards}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
