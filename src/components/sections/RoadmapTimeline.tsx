"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function RoadmapTimeline({ withHeading = true }: { withHeading?: boolean }) {
  const { dict } = useLocale();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 30%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        <div
          ref={railRef}
          className="relative mx-auto mt-14 max-w-2xl ps-10 sm:ps-12"
        >
          {/* faint base rail (the full path) */}
          <div className="absolute start-[14px] top-3 bottom-3 w-0.5 rounded-full bg-line/30 sm:start-[18px]" />
          {/* progress-filled rail — gradient draws downward as the user scrolls */}
          <motion.div
            className="absolute start-[14px] top-3 w-0.5 rounded-full bg-gradient-to-b from-quantum-cyan via-quantum-violet to-quantum-magenta shadow-[0_0_18px_rgba(56,189,248,0.55)] sm:start-[18px]"
            style={{ height: fillHeight }}
          />
          {/* traveling comet on the rail */}
          <motion.div
            className="absolute start-[10px] h-12 w-2.5 rounded-full bg-sky-300 blur-[4px] shadow-[0_0_24px_rgba(56,189,248,0.95)] sm:start-[14px]"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 0.95, 0.95, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="space-y-8">
            {dict.roadmap.phases.map((phase, i) => (
              <Reveal key={phase.title} delay={i * 0.06}>
                <div className="relative">
                  {/* sonar halo pulsing outward */}
                  <motion.span
                    className="absolute -start-10 top-5 z-0 h-7 w-7 rounded-full bg-quantum-cyan/40 sm:-start-12"
                    initial={{ scale: 1, opacity: 0.55 }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.3,
                    }}
                  />
                  {/* node */}
                  <motion.span
                    className="absolute -start-10 top-5 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#05060f] ring-2 ring-quantum-cyan shadow-[0_0_18px_rgba(56,189,248,0.6)] sm:-start-12"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.06 + 0.15,
                      type: "spring",
                      stiffness: 220,
                    }}
                  >
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full bg-quantum-cyan"
                      animate={{ scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                  </motion.span>

                  {/* card */}
                  <motion.div
                    className="card p-5 transition sm:p-6"
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {phase.year}
                      </span>
                      <span className="rounded-full bg-quantum-violet/20 px-2.5 py-0.5 text-xs font-medium text-accent">
                        {phase.tag}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-fg">
                      {phase.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-faint">
                      {phase.body}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
