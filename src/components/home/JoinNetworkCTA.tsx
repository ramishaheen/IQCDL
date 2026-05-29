"use client";

import Link from "next/link";
import { GraduationCap, Globe2, Building2, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";

export function JoinNetworkCTA() {
  const { t } = useLocale();

  const cards = [
    {
      icon: GraduationCap,
      title: t("joinNetwork.certified.title"),
      body: t("joinNetwork.certified.body"),
      cta: t("joinNetwork.certified.cta"),
      href: "mailto:admin@iqcdl.org?subject=IQCDL%20admissions%20enquiry",
    },
    {
      icon: Globe2,
      title: t("joinNetwork.chapter.title"),
      body: t("joinNetwork.chapter.body"),
      cta: t("joinNetwork.chapter.cta"),
      href: "mailto:admin@iqcdl.org?subject=Country%20chapter%20application",
    },
    {
      icon: Building2,
      title: t("joinNetwork.center.title"),
      body: t("joinNetwork.center.body"),
      cta: t("joinNetwork.center.cta"),
      href: "mailto:admin@iqcdl.org?subject=Center%20accreditation%20application",
      highlight: true,
    },
  ];

  return (
    <section className="section">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div
                className={`card group relative flex h-full flex-col items-center justify-between overflow-hidden p-8 text-center transition hover:-translate-y-1 hover:shadow-glow sm:p-10 ${
                  c.highlight
                    ? "ring-1 ring-quantum-cyan/40"
                    : ""
                }`}
              >
                {c.highlight && (
                  <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-quantum-cyan/15 blur-3xl" />
                )}
                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-white/10">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-fg">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
                <Link
                  href={c.href}
                  className="btn-primary mt-6 w-full justify-center sm:w-auto"
                >
                  {c.cta}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
