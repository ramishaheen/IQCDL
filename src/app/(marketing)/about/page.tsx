"use client";

import { useState } from "react";
import {
  Landmark,
  ShieldCheck,
  Scale,
  Globe2,
  Users,
  Target,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BoardApplyModal } from "@/components/about/BoardApplyModal";

const GOV_ICONS: LucideIcon[] = [Landmark, ShieldCheck, Scale, Users, Globe2];

function ChartNode({
  label,
  primary,
  muted,
}: {
  label: string;
  primary?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={
        primary
          ? "rounded-xl border border-brand-400/50 bg-gradient-to-br from-brand-500/20 to-brand-400/10 px-5 py-3 text-center text-sm font-semibold text-fg shadow-glow"
          : muted
            ? "rounded-xl border border-line/10 bg-surface/[0.03] px-4 py-2.5 text-center text-sm text-muted"
            : "rounded-xl border border-line/10 bg-surface/5 px-4 py-3 text-center text-sm font-medium text-fg"
      }
    >
      {label}
    </div>
  );
}

function Connector() {
  return <div className="my-2 h-6 w-px bg-gradient-to-b from-accent/60 to-accent/10" />;
}

export default function AboutPage() {
  const { dict } = useLocale();
  const a = dict.about;
  const [boardOpen, setBoardOpen] = useState(false);

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} subtitle={a.founded} />

      {/* intro + parent + mission */}
      <section className="section pt-0">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-3">
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted">
              {a.intro}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-2">
            <div className="card h-full bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-7">
              <Sparkles className="h-6 w-6 text-accent" />
              <h2 className="mt-3 text-xl font-bold text-fg">{a.parentTitle}</h2>
              <p className="mt-2 leading-relaxed text-muted">{a.parentBody}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-7">
              <Target className="h-6 w-6 text-accent" />
              <h2 className="mt-3 text-xl font-bold text-fg">{a.missionTitle}</h2>
              <p className="mt-2 leading-relaxed text-muted">{a.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* governance */}
      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">
              {a.governanceTitle}
            </h2>
            <p className="mt-3 text-muted">{a.governanceSubtitle}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {a.governance.map((g, i) => {
              const Icon = GOV_ICONS[i % GOV_ICONS.length];
              return (
                <Reveal key={g.name} delay={(i % 3) * 0.08}>
                  <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-fg">{g.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{g.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* org-style governance chart */}
          <Reveal className="mt-16">
            <h3 className="text-center text-lg font-semibold text-fg">{a.chartTitle}</h3>
            <p className="mx-auto mt-1 max-w-xl text-center text-sm text-muted">
              {a.chartSubtitle}
            </p>
            <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center">
              {/* tier 1 */}
              <ChartNode label={a.governance[0].name} primary />
              <Connector />
              {/* tier 2 */}
              <div className="grid w-full gap-4 sm:grid-cols-3">
                {[a.governance[1], a.governance[2], a.governance[3]].map((g) => (
                  <ChartNode key={g.name} label={g.name} />
                ))}
              </div>
              <Connector />
              {/* tier 3 */}
              <ChartNode label={a.governance[4].name} />
              <Connector />
              {/* tier 4 */}
              <div className="grid w-full gap-4 sm:grid-cols-3">
                {a.chartBase.map((b) => (
                  <ChartNode key={b} label={b} muted />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* leadership */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">{a.leadershipTitle}</h2>
            <p className="mt-3 text-muted">{a.leadershipSubtitle}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.leadership.map((l, i) => (
              <Reveal key={l.role} delay={(i % 3) * 0.06}>
                <div className="card flex h-full items-start gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan font-display text-lg font-bold text-white">
                    {l.role.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-semibold text-fg">{l.role}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{l.remit}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">{a.valuesTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 0.06}>
                <div className="card h-full p-6">
                  <h3 className="font-semibold text-accent">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {a.stats.map((s, i) => (
              <Reveal key={s.label} delay={(i % 4) * 0.06}>
                <div className="card p-6 text-center">
                  <div className="gradient-text font-display text-2xl font-bold sm:text-3xl">
                    {s.value}
                  </div>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* board of directors */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="card overflow-hidden bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo to-quantum-cyan text-white">
                    <Landmark className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 text-2xl font-bold text-fg sm:text-3xl">
                    {a.boardTitle}
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted">{a.boardIntro}</p>
                  <button onClick={() => setBoardOpen(true)} className="btn-primary mt-6 text-white">
                    {a.boardApply}
                  </button>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-faint">
                    {a.boardBenefitsTitle}
                  </p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {a.boardBenefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
      <BoardApplyModal open={boardOpen} onClose={() => setBoardOpen(false)} />
    </>
  );
}
