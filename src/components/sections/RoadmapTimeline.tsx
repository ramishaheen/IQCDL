"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RoadmapTimeline({ withHeading = true }: { withHeading?: boolean }) {
  const { dict } = useLocale();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 30%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

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
          {/* faint base rail (full path) */}
          <div className="absolute start-[14px] top-3 bottom-3 w-0.5 rounded-full bg-line/30 sm:start-[18px]" />
          {/* progress-filled rail — draws as you scroll */}
          <motion.div
            className="absolute start-[14px] top-3 w-0.5 rounded-full bg-gradient-to-b from-quantum-cyan via-quantum-violet to-quantum-magenta shadow-[0_0_24px_rgba(56,189,248,0.7)] sm:start-[18px]"
            style={{ height: fillHeight }}
          />
          {/* moving bright bulb at the end of the drawn rail */}
          <motion.div
            className="absolute start-[8px] h-4 w-4 rounded-full bg-quantum-cyan shadow-[0_0_28px_8px_rgba(56,189,248,0.8)] sm:start-[12px]"
            style={{ top: fillHeight, opacity: glowOpacity, marginTop: "-8px" }}
          />
          {/* slow background comet sweeping the rail */}
          <motion.div
            className="absolute start-[10px] h-16 w-2.5 rounded-full bg-sky-300 blur-[5px] shadow-[0_0_30px_rgba(56,189,248,0.95)] sm:start-[14px]"
            initial={{ top: "-5%", opacity: 0 }}
            animate={{ top: ["-5%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="space-y-10">
            {dict.roadmap.phases.map((phase, i) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* outer sonar ring (slow) */}
                <motion.span
                  className="absolute -start-10 top-5 z-0 h-7 w-7 rounded-full border-2 border-quantum-cyan/70 sm:-start-12"
                  animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.4,
                  }}
                />
                {/* inner sonar ring (faster, offset) */}
                <motion.span
                  className="absolute -start-10 top-5 z-0 h-7 w-7 rounded-full border-2 border-quantum-cyan/60 sm:-start-12"
                  animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.4 + 0.7,
                  }}
                />
                {/* node */}
                <motion.span
                  className="absolute -start-10 top-5 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#05060f] ring-2 ring-quantum-cyan shadow-[0_0_22px_rgba(56,189,248,0.7)] sm:-start-12"
                  initial={{ scale: 0, rotate: -120 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08 + 0.15,
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                  }}
                >
                  <motion.span
                    className="h-3 w-3 rounded-full bg-quantum-cyan"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                </motion.span>
                {/* connector from rail to card */}
                <motion.span
                  className="absolute -start-[14px] top-[33px] hidden h-px w-[18px] bg-gradient-to-r from-quantum-cyan to-transparent sm:-start-[18px] sm:block"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.4, duration: 0.4 }}
                  style={{ originX: 0 }}
                />

                {/* card */}
                <motion.div
                  className="card relative overflow-hidden p-5 transition sm:p-6"
                  whileHover={{ y: -4, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 280 }}
                >
                  {/* corner glow that lights up when in view */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08 + 0.4 }}
                    className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-quantum-cyan/15 blur-3xl"
                  />
                  <div className="relative flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {phase.year}
                    </span>
                    <span className="rounded-full bg-quantum-violet/20 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {phase.tag}
                    </span>
                  </div>
                  <h3 className="relative mt-2 text-lg font-semibold text-fg">
                    {phase.title}
                  </h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-faint">
                    {phase.body}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
