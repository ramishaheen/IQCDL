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
    <div className="card grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.08}
          className="bg-surface/5 p-6 text-center sm:p-7"
        >
          <Counter
            raw={s.value}
            className="gradient-text block font-display text-3xl font-bold sm:text-4xl"
          />
          <p className="mx-auto mt-2 max-w-[16ch] text-xs leading-snug text-muted sm:text-sm">
            {s.label}
          </p>
        </Reveal>
      ))}
    </div>
  );

  if (embedded) return grid;

  return (
    <section className="relative">
      <div className="container-x">{grid}</div>
    </section>
  );
}
