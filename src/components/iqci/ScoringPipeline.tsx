"use client";

import { motion } from "framer-motion";
import { Bot, FileText, Scale, Newspaper, Radio, ArrowRight, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = [Bot, FileText, Scale, Newspaper, Radio];

export function ScoringPipeline({
  title,
  note,
  steps,
}: {
  title: string;
  note: string;
  steps: { step: string; body: string }[];
}) {
  return (
    <section className="section pt-0">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted">{note}</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch">
            {steps.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              const last = i === steps.length - 1;
              return (
                <div key={s.step} className="flex flex-col items-stretch lg:flex-1 lg:flex-row">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="card flex flex-1 flex-col p-5"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-faint">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-0.5 font-semibold text-fg">{s.step}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                  </motion.div>
                  {!last && (
                    <div className="flex items-center justify-center px-1 py-1 text-accent">
                      <ArrowRight className="hidden h-5 w-5 lg:block rtl:rotate-180" />
                      <ArrowDown className="h-5 w-5 lg:hidden" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
