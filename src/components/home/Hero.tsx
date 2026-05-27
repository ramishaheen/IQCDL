"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Globe } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Stats } from "@/components/home/Stats";
import { LicenseCard } from "@/components/home/LicenseCard";

export function Hero() {
  const { t, dict } = useLocale();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="theme-dark relative flex min-h-[88vh] items-center overflow-hidden bg-[#05060f]"
    >
      {/* video background (parallax) */}
      <motion.video
        style={{ y: videoY, scale: videoScale }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[#05060f]/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/35 to-[#05060f]/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05060f]/85 via-[#05060f]/30 to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-start">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {t("hero.badge")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-fg drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl xl:text-7xl"
            >
              {t("hero.titleLine1")}{" "}
              <span className="gradient-text-animated">{t("hero.titleLine2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-fg sm:text-lg lg:mx-0"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start sm:justify-center"
            >
              <Link href="/assessment" className="btn-primary w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                {t("hero.ctaPrimary")}
              </Link>
              <Link href="/programs" className="btn-ghost w-full sm:w-auto">
                {t("hero.ctaSecondary")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </motion.div>

            {/* international chips */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              {dict.hero.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line/15 bg-surface/5 px-3 py-1.5 text-xs font-medium text-muted"
                >
                  <Globe className="h-3.5 w-3.5 text-accent" />
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-6 text-xs uppercase tracking-wider text-faint"
            >
              {t("hero.trustedBy")}
            </motion.p>
          </div>

          {/* credential card */}
          <LicenseCard />
        </div>

        {/* stats strip, embedded in the hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16"
        >
          <Stats embedded />
        </motion.div>
      </motion.div>

      {/* bottom fade into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#05060f]" />
    </section>
  );
}
