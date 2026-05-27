"use client";

import Link from "next/link";
import { Check, Star } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function Pricing() {
  const { dict } = useLocale();
  const plans = dict.pricing.plans;

  return (
    <section id="pricing" className="section">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-quantum-radial" />
      <div className="container-x">
        <SectionHeading
          eyebrow={dict.pricing.eyebrow}
          title={dict.pricing.title}
          subtitle={dict.pricing.subtitle}
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = i === 1;
            return (
              <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    "card relative flex h-full flex-col p-7",
                    featured &&
                      "scale-[1.02] ring-2 ring-quantum-violet/50 shadow-glow",
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3 start-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-quantum-violet to-quantum-magenta px-3 py-1 text-xs font-semibold text-white rtl:translate-x-1/2">
                      <Star className="h-3 w-3 fill-current" />
                      {dict.pricing.mostPopular}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-end gap-1.5">
                    <span className="font-display text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="pb-1 text-sm text-slate-400">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-quantum-cyan" />
                        <span className="text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={i === 2 ? "mailto:info@iqcdl.org" : "/login"}
                    className={cn(
                      "btn mt-7 w-full",
                      featured
                        ? "btn-primary"
                        : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
