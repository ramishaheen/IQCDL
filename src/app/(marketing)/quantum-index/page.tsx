"use client";

import Link from "next/link";
import {
  Bot,
  FileSearch,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  Handshake,
  ArrowUpRight,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { QuantumAccent } from "@/components/visuals/QuantumAccent";
import { Book3D } from "@/components/visuals/Book3D";
import { QuantumMachine } from "@/components/visuals/QuantumMachine";
import { PillarScatter } from "@/components/iqci/PillarScatter";
import { IndexBook } from "@/components/iqci/IndexBook";
import { QuarterlyEditions } from "@/components/iqci/QuarterlyEditions";
import { ScoringPipeline } from "@/components/iqci/ScoringPipeline";
import { Rubric } from "@/components/ui/Rubric";
import { COUNTRIES, topPillarKey, bottomPillarKey } from "@/lib/iqci";
import { FinalCTA } from "@/components/home/FinalCTA";

const HOW_ICONS: LucideIcon[] = [Bot, FileSearch, RefreshCw, ShieldCheck];
const BENEFIT_ICONS: LucideIcon[] = [Handshake, TrendingUp, BadgeCheck, ArrowUpRight];

export default function QuantumIndexPage() {
  const { dict } = useLocale();
  const x = dict.iqci;

  return (
    <>
      <PageHero eyebrow={x.eyebrow} title={x.title} subtitle={x.subtitle} />

      {/* how it works */}
      <section className="section pt-0">
        <QuantumAccent className="absolute -top-4 end-0 -z-10 hidden w-[340px] opacity-25 lg:block" />
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">{x.howTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {x.how.map((h, i) => {
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

          {/* pillars */}
          <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
            {x.pillars.map((p) => (
              <span key={p} className="rounded-full border border-line/10 bg-surface/5 px-3.5 py-1.5 text-sm text-muted">
                {p}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* methodology: scoring rubric */}
      <Rubric
        title={x.rubricTitle}
        note={x.rubricNote}
        categories={x.rubric}
        scaleLabel={x.rubricScaleLabel}
        scale={x.rubricScale}
      />

      {/* animated quantum machine — fills the dead space and signals "live" computation */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-quantum-indigo/20 via-[#070b14] to-quantum-cyan/10 p-6 sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
                <QuantumMachine />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Live signal
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">
                    A quantum machine, always running
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    The IQCI is refreshed every quarter by a neutral AI jury — but the underlying readiness signal updates continuously. Watch the lattice fire: each qubit, gate and photonic pulse maps to a category we score across every country.
                  </p>
                  <ul className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2">
                    <li>· 12-qubit lattice visualization</li>
                    <li>· Coherence &amp; gate-fidelity readout</li>
                    <li>· Quarterly index editions</li>
                    <li>· Explainable AI scoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* methodology: how it is scored (data agent pipeline) */}
      <ScoringPipeline title={x.agentTitle} note={x.agentNote} steps={x.pipeline} />

      <SectionDivider />

      {/* results: ranking snapshot (all countries) */}
      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">{x.rankingTitle}</h2>
            <p className="mt-2 text-sm text-faint">{x.rankingNote}</p>
          </Reveal>
          <Reveal className="mx-auto mt-8 max-w-3xl">
            <div className="card p-2 sm:p-4">
              <div className="max-h-[32rem] overflow-auto">
                <table className="w-full min-w-[34rem] border-collapse text-sm">
                  <thead className="sticky top-0 bg-bg/95 backdrop-blur">
                    <tr className="border-b border-line/10 text-start">
                      {[x.rankLabel, x.countryLabel, x.scoreLabel, x.strengthLabel, x.weaknessLabel].map((h) => (
                        <th key={h} className="px-3 py-2 text-start text-xs font-semibold uppercase tracking-wider text-faint">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/10">
                    {COUNTRIES.map((r) => {
                      const names = x.pillarNames as Record<string, string>;
                      return (
                        <tr key={r.country}>
                          <td className="px-3 py-3 font-display font-bold text-accent">{r.rank}</td>
                          <td className="px-3 py-3 font-medium text-fg">{r.flag} {r.country}</td>
                          <td className="px-3 py-3">
                            <span className="font-display font-bold text-fg">{r.score}</span>
                            <span className="text-faint">/100</span>
                          </td>
                          <td className="px-3 py-3 text-emerald-500">{names[topPillarKey(r.pillars)]}</td>
                          <td className="px-3 py-3 text-amber-500">{names[bottomPillarKey(r.pillars)]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 px-2 text-xs text-faint">{COUNTRIES.length} countries · {x.rankingNote}</p>
            </div>
          </Reveal>

          {/* scatter plot */}
          <Reveal className="mx-auto mt-12 max-w-3xl text-center">
            <h3 className="text-xl font-bold text-fg sm:text-2xl">{x.scatterTitle}</h3>
            <p className="mt-2 text-sm text-muted">{x.scatterNote}</p>
          </Reveal>
          <Reveal className="mx-auto mt-6 max-w-3xl">
            <PillarScatter
              pillarNames={x.pillarNames as Record<string, string>}
              axisXLabel={x.axisX}
              axisYLabel={x.axisY}
            />
          </Reveal>
        </div>
      </section>

      {/* immersive books */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="gradient-text-animated text-2xl font-bold sm:text-3xl">{x.bookTitle}</h2>
              <p className="mt-3 text-muted">{x.bookNote}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <IndexBook
                coverTitle={x.eyebrow}
                coverSubtitle={x.title}
                hint={x.bookHint}
                openLabel={x.bookOpen}
                closeLabel={x.bookClose}
                statusLabel={x.statusLabel}
                pillarNames={x.pillarNames as Record<string, string>}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* quarterly editions */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <QuarterlyEditions
              labels={{
                title: x.quarterlyTitle,
                note: x.quarterlyNote,
                generating: x.generating,
                liveLabel: x.liveLabel,
                updatedLabel: x.updatedLabel,
                headlineLabel: x.headlineLabel,
                highlightsLabel: x.highlightsLabel,
                distributionTitle: x.distributionTitle,
                distributionNote: x.distributionNote,
                reachLabel: x.reachLabel,
                sentTo: x.sentTo,
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* benefits */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">{x.benefitsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {x.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <Reveal key={b.title} delay={(i % 4) * 0.06}>
                  <div className="card h-full p-6">
                    <Icon className="h-6 w-6 text-accent" />
                    <h3 className="mt-3 font-semibold text-fg">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 flex flex-col items-center gap-4">
            <p className="mx-auto max-w-xl text-center text-sm text-muted">{x.submitNote}</p>
            <Link href="/quantum-index/submit" className="btn-primary text-white">
              {x.submitCta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <div className="mt-6">
              <Book3D
                coverTitle={x.guideTitle}
                coverSubtitle={x.guideNote}
                openLabel={x.guideOpen}
                hint={x.bookHint}
                closeLabel={x.bookClose}
                accent="from-brand-600 to-quantum-cyan"
                pages={[
                  { title: x.guideTitle, lines: x.how.map((h) => `${h.title}: ${h.body}`) },
                  { title: x.pillarsTitle, lines: x.pillars as unknown as string[] },
                  { title: x.benefitsTitle, lines: x.benefits.map((b) => `${b.title}: ${b.body}`) },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
