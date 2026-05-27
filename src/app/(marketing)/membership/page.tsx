"use client";

import Link from "next/link";
import {
  Users,
  UserCircle,
  GraduationCap,
  Building2,
  Globe,
  Shield,
  Handshake,
  Bot,
  BadgeCheck,
  ShieldCheck,
  BookOpen,
  MessageSquare,
  ArrowRight,
  LogIn,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";

const BENEFIT_ICONS: LucideIcon[] = [
  BadgeCheck,
  Bot,
  MessageSquare,
  BookOpen,
  ShieldCheck,
  Handshake,
];

const TIER_ICONS: Record<string, LucideIcon> = {
  community: Users,
  student: UserCircle,
  trainer: GraduationCap,
  center: Building2,
  chapter: Globe,
  agent: Handshake,
  admin: Shield,
};

export default function MembershipPage() {
  const { dict } = useLocale();
  const m = dict.membership;

  return (
    <>
      <PageHero eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle} />

      {/* primary actions */}
      <section className="-mt-6 pb-4">
        <div className="container-x">
          <Reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/login" className="btn-primary">
              {m.enrollNow}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link href="/login" className="btn-ghost">
              <LogIn className="h-4 w-4" />
              {m.signedInPrompt} {m.signIn}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* benefits */}
      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">
              {m.benefitsTitle}
            </h2>
            <p className="mt-3 text-muted">{m.benefitsSubtitle}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {m.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <Reveal key={b.title} delay={(i % 3) * 0.08}>
                  <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-fg">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* tiers */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">{m.tiersTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {m.tiers.map((tier, i) => {
              const Icon = TIER_ICONS[tier.key] ?? Users;
              const free = tier.key === "community";
              return (
                <Reveal key={tier.key} delay={(i % 3) * 0.06}>
                  <div
                    id={tier.key}
                    className="card group flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      {free && (
                        <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                          Free
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-semibold text-fg">{tier.name}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                      {tier.desc}
                    </p>
                    <Link
                      href="/login"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2.5"
                    >
                      {m.apply}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}

            {/* how to enroll */}
            <Reveal delay={0.12}>
              <div className="card h-full bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-5">
                <h3 className="font-semibold text-fg">{m.applyTitle}</h3>
                <ol className="mt-3 space-y-2.5">
                  {m.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <Link href="/login" className="btn-primary mt-5 w-full text-white">
                  {m.cta}
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
