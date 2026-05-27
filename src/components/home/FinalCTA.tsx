"use client";

import Link from "next/link";
import { Sparkles, MessageSquare } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  const { t } = useLocale();

  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-brand-500/15 via-surface/[0.04] to-brand-400/10 p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-quantum-cyan/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-quantum-magenta/20 blur-3xl" />

            <h2 className="relative mx-auto max-w-2xl text-balance text-3xl font-bold text-fg sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-balance text-muted">
              {t("cta.subtitle")}
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/assessment" className="btn-primary w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                {t("cta.primary")}
              </Link>
              <Link href="/programs" className="btn-ghost w-full sm:w-auto">
                <MessageSquare className="h-4 w-4" />
                {t("cta.secondary")}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
