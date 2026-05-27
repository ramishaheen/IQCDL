"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check, ArrowRight, Clock, FileCheck2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/cn";

interface OutlineStep {
  label: string;
  title: string;
  items: string[];
}

interface Level {
  name: string;
  tagline: string;
  duration: string;
  exam: string;
  forWho: string;
  points: string[];
  outline: OutlineStep[];
}

export function LevelOutline({
  level,
  icon: Icon,
  accent,
  index,
  badge,
  cta,
  ctaHref,
}: {
  level: Level;
  icon: LucideIcon;
  accent: string;
  index: number;
  badge?: string;
  cta: string;
  ctaHref: string;
}) {
  const { dict } = useLocale();

  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="card overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
              {/* left: level summary */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white",
                      accent,
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                    Level {index}
                  </span>
                  {badge && (
                    <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                      {badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-2xl font-bold text-fg sm:text-3xl">
                  {level.name}
                </h3>
                <p className="mt-1 text-accent">{level.tagline}</p>

                <div className="mt-5 flex flex-wrap gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-surface/5 px-3 py-1.5 text-muted">
                    <Clock className="h-4 w-4 text-accent" />
                    {level.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-surface/5 px-3 py-1.5 text-muted">
                    <FileCheck2 className="h-4 w-4 text-accent" />
                    {level.exam}
                  </span>
                </div>

                <p className="mt-5 text-sm text-muted">
                  <span className="font-semibold text-fg">For: </span>
                  {level.forWho}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {level.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted">{p}</span>
                    </li>
                  ))}
                </ul>

                <Link href={ctaHref} className="btn-primary mt-7 text-white">
                  {cta}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>

              {/* right: full outline */}
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-faint">
                  {dict.tracks.outlineTitle}
                </p>
                <div className="relative space-y-3 ps-6">
                  <div className="absolute start-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-quantum-cyan via-quantum-blue to-quantum-indigo" />
                  {level.outline.map((step, i) => (
                    <Reveal key={step.title} delay={i * 0.05}>
                      <div className="relative">
                        <span className="absolute -start-6 top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/15" />
                        <div className="rounded-xl border border-line/10 bg-surface/5 p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                              {step.label}
                            </span>
                            <span className="text-sm font-semibold text-fg">
                              {step.title}
                            </span>
                          </div>
                          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                            {step.items.map((it) => (
                              <li
                                key={it}
                                className="flex items-start gap-2 text-sm text-muted"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
