"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Globe } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { useLocale } from "@/components/providers/LocaleProvider";

const FLAGS = ["🇸🇦", "🇪🇬", "🇦🇪", "🇩🇪", "🇫🇷", "🇬🇧", "🇨🇳", "🇺🇸"];

export function LicenseCard() {
  const { dict } = useLocale();
  const c = dict.hero.card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md"
      style={{ perspective: 1000 }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-brand-400/20 blur-3xl" />

      <div className="glass-strong relative animate-float rounded-3xl border border-line/15 p-6 shadow-card sm:p-7">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <Logo className="logo-tone" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <BadgeCheck className="h-3.5 w-3.5" />
            {c.verified}
          </span>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {c.title}
        </p>

        {/* holder */}
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-wider text-faint">{c.holder}</p>
          <p className="font-display text-2xl font-bold text-fg">{c.holderValue}</p>
        </div>

        {/* meta */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line/10 bg-surface/5 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wider text-faint">{c.level}</p>
            <p className="font-semibold text-fg">{c.levelValue}</p>
          </div>
          <div className="rounded-xl border border-line/10 bg-surface/5 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wider text-faint">{c.validity}</p>
            <p className="font-semibold text-fg">{c.validityValue}</p>
          </div>
        </div>

        {/* credential id */}
        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-line/10 bg-surface/5 px-3 py-2.5">
          <span className="text-[11px] uppercase tracking-wider text-faint">
            Credential ID
          </span>
          <span className="font-mono text-sm tracking-wider text-accent">
            IQCDL-FND-2026-••••••
          </span>
        </div>

        {/* footer */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line/10 pt-4">
          <div className="flex -space-x-1 text-base">
            {FLAGS.map((f, i) => (
              <span key={i} aria-hidden="true">
                {f}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            <Globe className="h-3.5 w-3.5 text-accent" />
            {c.worldwide}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
