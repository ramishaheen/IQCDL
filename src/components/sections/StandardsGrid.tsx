"use client";

import { BadgeCheck } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { QuantumAccent } from "@/components/visuals/QuantumAccent";

export function StandardsGrid({ withHeading = true }: { withHeading?: boolean }) {
  const { dict } = useLocale();

  return (
    <section id="standards" className="section">
      <QuantumAccent className="absolute -top-4 start-0 -z-10 hidden w-[340px] opacity-30 lg:block" />
      <div className="container-x">
        {withHeading && (
          <SectionHeading
            eyebrow={dict.standards.eyebrow}
            title={dict.standards.title}
            subtitle={dict.standards.subtitle}
          />
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {dict.standards.groups.map((group, i) => (
            <Reveal key={group.name} delay={(i % 2) * 0.08}>
              <div className="card h-full p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                  <BadgeCheck className="h-5 w-5 text-quantum-cyan" />
                  {group.name}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-quantum-violet" />
                      <span className="font-mono text-[13px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
