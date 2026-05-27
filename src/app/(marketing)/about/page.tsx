"use client";

import {
  Landmark,
  ShieldCheck,
  Scale,
  Globe2,
  Users,
  Target,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { FinalCTA } from "@/components/home/FinalCTA";

const GOV_ICONS: LucideIcon[] = [Landmark, ShieldCheck, Scale, Users, Globe2];

export default function AboutPage() {
  const { dict } = useLocale();
  const a = dict.about;

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

      <FinalCTA />
    </>
  );
}
