"use client";

import {
  Bot,
  ShieldCheck,
  FlaskConical,
  Map,
  Globe2,
  Users,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = [Bot, ShieldCheck, FlaskConical, Map, Globe2, Users];

export function Features() {
  const { dict } = useLocale();

  return (
    <section className="section">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="container-x">
        <SectionHeading
          eyebrow={dict.features.eyebrow}
          title={dict.features.title}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.features.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="card group h-full p-6 transition hover:-translate-y-1 hover:shadow-glow">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-quantum-cyan ring-1 ring-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
