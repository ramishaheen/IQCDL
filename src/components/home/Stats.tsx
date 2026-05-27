"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/visuals/Counter";

export function Stats({ embedded = false }: { embedded?: boolean }) {
  const { t } = useLocale();
  const stats = [
    { value: t("stats.marketValueUnit"), label: t("stats.marketValue") },
    { value: t("stats.jobsAccessibleUnit"), label: t("stats.jobsAccessible") },
    { value: t("stats.levelsUnit"), label: t("stats.levels") },
    { value: t("stats.standardsUnit"), label: t("stats.standards") },
  ];

  const grid = (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.08}
          className="card p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-7"
        >
          <Counter
            raw={s.value}
            className="gradient-text block font-display text-4xl font-bold sm:text-5xl"
          />
          <p className="mx-auto mt-2 max-w-[18ch] text-xs leading-snug text-muted sm:text-sm">
            {s.label}
          </p>
        </Reveal>
      ))}
    </div>
  );

  if (embedded) return grid;

  return (
    <section className="relative z-10 pt-12 sm:pt-16">
      <div className="container-x">{grid}</div>
    </section>
  );
}
