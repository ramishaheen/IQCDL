"use client";

import Link from "next/link";
import {
  Shield,
  Building2,
  GraduationCap,
  Users,
  UserCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import type { Role } from "@/lib/auth";

const TIERS: { role: Role; icon: LucideIcon }[] = [
  { role: "admin", icon: Shield },
  { role: "chapter", icon: Building2 },
  { role: "center", icon: GraduationCap },
  { role: "trainer", icon: Users },
  { role: "student", icon: UserCircle },
];

export default function MembershipPage() {
  const { t, dict } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={dict.membership.eyebrow}
        title={dict.membership.title}
        subtitle={dict.membership.subtitle}
      />

      <section className="section pt-0">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.map(({ role, icon: Icon }, i) => (
              <Reveal key={role} delay={(i % 3) * 0.08}>
                <div
                  id={role}
                  className="card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-fg">
                    {t(`auth.roles.${role}`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {t(`auth.roleDesc.${role}`)}
                  </p>
                  <Link
                    href="/login"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:gap-2.5"
                  >
                    {dict.membership.apply}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </Reveal>
            ))}

            {/* how to apply */}
            <Reveal delay={0.16}>
              <div className="card h-full bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-6">
                <h3 className="text-lg font-semibold text-fg">
                  {dict.membership.applyTitle}
                </h3>
                <ol className="mt-4 space-y-3">
                  {dict.membership.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <Link href="/login" className="btn-primary mt-6 w-full text-white">
                  {dict.membership.cta}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
