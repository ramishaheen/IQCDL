"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import QuantumField from "@/components/visuals/QuantumField";
import QubitOrb from "@/components/visuals/QubitOrb";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden">
      {/* backgrounds */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <QuantumField className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-quantum-radial" />
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-quantum-indigo/20 blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
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
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {t("hero.titleLine1")}{" "}
            <span className="gradient-text-animated">{t("hero.titleLine2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0"
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-xs uppercase tracking-wider text-slate-500"
          >
            {t("hero.trustedBy")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <QubitOrb className="animate-float" />
        </motion.div>
      </div>
    </section>
  );
}
