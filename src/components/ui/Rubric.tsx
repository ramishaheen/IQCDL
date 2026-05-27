"use client";

import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export interface RubricCategory {
  name: string;
  weight?: string;
  desc: string;
  subs: string[];
}

export function Rubric({
  title,
  note,
  categories,
  scaleLabel,
  scale,
}: {
  title: string;
  note: string;
  categories: RubricCategory[];
  scaleLabel?: string;
  scale?: { band: string; range: string }[];
}) {
  return (
    <section className="section pt-0">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted">{note}</p>
        </Reveal>

        {scale && scaleLabel && (
          <Reveal className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint">{scaleLabel}:</span>
            {scale.map((s) => (
              <span key={s.band} className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-surface/5 px-3 py-1 text-xs text-muted">
                <span className="font-semibold text-fg">{s.band}</span>
                <span className="text-faint">{s.range}</span>
              </span>
            ))}
          </Reveal>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.06}>
              <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-fg">{c.name}</h3>
                  {c.weight && (
                    <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">
                      {c.weight}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.desc}</p>
                <ul className="mt-4 space-y-2">
                  {c.subs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
