"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  const { t } = useLocale();
  const stats = [
    { value: t("stats.marketValueUnit"), label: t("stats.marketValue") },
    { value: t("stats.jobsAccessibleUnit"), label: t("stats.jobsAccessible") },
    { value: t("stats.levelsUnit"), label: t("stats.levels") },
    { value: t("stats.standardsUnit"), label: t("stats.standards") },
  ];

  return (
    <section className="relative">
      <div className="container-x">
        <div className="card grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="bg-white/5 p-6 text-center sm:p-8"
            >
              <div className="gradient-text font-display text-3xl font-bold sm:text-4xl">
                {s.value}
              </div>
              <p className="mx-auto mt-2 max-w-[16ch] text-xs leading-snug text-slate-400 sm:text-sm">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
