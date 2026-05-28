"use client";

import Link from "next/link";
import {
  BrainCircuit,
  Workflow,
  FlaskConical,
  Rocket,
  AlertTriangle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { QuantumSpark } from "@/components/visuals/QuantumSpark";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { QuantumAccent } from "@/components/visuals/QuantumAccent";

const OPP_ICONS: LucideIcon[] = [BrainCircuit, Workflow, FlaskConical, Rocket];

export default function WhyQuantumAiPage() {
  const { dict } = useLocale();
  const w = dict.whyQuantum;

  return (
    <>
      <PageHero eyebrow={w.eyebrow} title={w.title} subtitle={w.intro} />

      {/* opportunity */}
      <section className="section pt-0">
        <QuantumAccent className="absolute -top-4 end-0 -z-10 hidden w-[340px] opacity-25 lg:block" />
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">
              {w.opportunityTitle}
            </h2>
            <p className="mt-3 text-muted">{w.opportunitySubtitle}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {w.opportunity.map((o, i) => {
              const Icon = OPP_ICONS[i % OPP_ICONS.length];
              return (
                <Reveal key={o.title} delay={(i % 4) * 0.07}>
                  <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-fg">{o.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{o.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* facts */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">{w.factsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {w.facts.map((f, i) => (
              <Reveal key={f.label} delay={(i % 4) * 0.06}>
                <div className="card p-6 text-center">
                  <div className="gradient-text font-display text-2xl font-bold sm:text-3xl">
                    {f.value}
                  </div>
                  <p className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* scary facts */}
      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              {w.scarySubtitle}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-fg sm:text-4xl">{w.scaryTitle}</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {w.scary.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="card flex items-start gap-4 border-rose-400/20 p-5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-rose-400/10 text-rose-400">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-fg">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-brand-500/20 via-surface/[0.04] to-brand-400/10 p-10 text-center sm:p-14">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
              <h2 className="relative mx-auto max-w-2xl text-balance text-3xl font-bold text-fg sm:text-4xl">
                {w.ctaTitle}
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-balance text-muted">
                {w.ctaBody}
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/membership" className="btn-primary">
                  <QuantumSpark className="h-4 w-4" />
                  {w.cta}
                </Link>
                <Link href="/assessment" className="btn-ghost">
                  {w.ctaSecondary}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
