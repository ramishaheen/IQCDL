"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function RoadmapTimeline({ withHeading = true }: { withHeading?: boolean }) {
  const { dict } = useLocale();

  return (
    <section id="roadmap" className="section">
      <div className="container-x">
        {withHeading && (
          <SectionHeading
            eyebrow={dict.roadmap.eyebrow}
            title={dict.roadmap.title}
            subtitle={dict.roadmap.subtitle}
          />
        )}

        <div className="relative mx-auto mt-14 max-w-2xl ps-10 sm:ps-12">
          {/* vertical rail */}
          <div className="absolute start-[14px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-quantum-cyan via-quantum-violet to-quantum-magenta sm:start-[18px]" />

          <div className="space-y-8">
            {dict.roadmap.phases.map((phase, i) => (
              <Reveal key={phase.title} delay={i * 0.06}>
                <div className="relative">
                  {/* node */}
                  <motion.span
                    className="absolute -start-10 top-5 z-10 grid h-7 w-7 -translate-x-0 place-items-center rounded-full bg-slate-100 ring-2 ring-quantum-cyan/60 sm:-start-12"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.15, type: "spring" }}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-quantum-cyan" />
                  </motion.span>

                  <div className="card p-5 transition hover:shadow-glow sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-quantum-cyan">
                        {phase.year}
                      </span>
                      <span className="rounded-full bg-quantum-violet/20 px-2.5 py-0.5 text-xs font-medium text-quantum-violet">
                        {phase.tag}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {phase.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                      {phase.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
