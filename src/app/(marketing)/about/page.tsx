"use client";

import { useRef, useState } from "react";
import {
  Landmark,
  ShieldCheck,
  Scale,
  Globe2,
  Users,
  Target,
  Sparkles,
  Check,
  Award,
  type LucideIcon,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BoardApplyModal } from "@/components/about/BoardApplyModal";

const GOV_ICONS: LucideIcon[] = [Landmark, ShieldCheck, Scale, Users, Globe2];

function CinematicHero({
  eyebrow,
  title,
  founded,
}: {
  eyebrow: string;
  title: string;
  founded: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const blob1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const blob2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const orbitOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-quantum-indigo/25 via-transparent to-transparent" />
        <motion.div
          style={{ y: blob1 }}
          className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-quantum-cyan/25 blur-[140px]"
        />
        <motion.div
          style={{ y: blob2 }}
          className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-quantum-violet/25 blur-[140px]"
        />
        <div className="absolute inset-0 grid-bg opacity-25" />
      </div>

      {/* floating orbit glyph (depth element) */}
      <motion.div
        style={{ opacity: orbitOpacity }}
        className="pointer-events-none absolute right-[8%] top-1/2 hidden h-56 w-56 -translate-y-1/2 text-quantum-cyan lg:block"
      >
        <motion.svg
          viewBox="0 0 200 200"
          className="h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="100"
            cy="100"
            r="86"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="4 10"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="86"
            ry="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="86"
            ry="30"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            transform="rotate(60 100 100)"
          />
          <circle cx="186" cy="100" r="5" fill="currentColor" />
          <circle cx="100" cy="14" r="4" fill="currentColor" opacity="0.8" />
          <circle cx="100" cy="100" r="5" fill="currentColor" />
        </motion.svg>
      </motion.div>

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="gradient-text-animated mt-5 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-muted sm:text-sm">
            {founded}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ChartNode({
  label,
  primary,
  muted,
}: {
  label: string;
  primary?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={
        primary
          ? "rounded-xl border border-brand-400/50 bg-gradient-to-br from-brand-500/20 to-brand-400/10 px-5 py-3 text-center text-sm font-semibold text-fg shadow-glow"
          : muted
            ? "rounded-xl border border-line/10 bg-surface/[0.03] px-4 py-2.5 text-center text-sm text-muted"
            : "rounded-xl border border-line/10 bg-surface/5 px-4 py-3 text-center text-sm font-medium text-fg"
      }
    >
      {label}
    </div>
  );
}

function Connector() {
  return (
    <div className="my-2 h-6 w-px bg-gradient-to-b from-accent/60 to-accent/10" />
  );
}

interface BoardCtaCopy {
  boardTitle: string;
  boardIntro: string;
  boardBenefitsTitle: string;
  boardBenefits: string[];
  boardApply: string;
}

function ConversionBoardCTA({
  a,
  onApply,
}: {
  a: BoardCtaCopy;
  onApply: () => void;
}) {
  return (
    <section className="section pt-0">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-quantum-cyan/30 bg-gradient-to-br from-brand-500/15 via-quantum-indigo/10 to-quantum-cyan/15 p-8 shadow-glow sm:p-12 lg:p-16">
            <motion.div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-quantum-cyan/25 blur-[100px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.95, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-quantum-violet/25 blur-[100px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-quantum-cyan/40 bg-quantum-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-quantum-cyan">
                  <Sparkles className="h-3.5 w-3.5" /> Limited seats · reviewed
                  quarterly
                </div>
                <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-fg sm:text-4xl md:text-5xl">
                  {a.boardTitle}
                </h2>
                <p className="mt-4 max-w-xl text-balance leading-relaxed text-muted">
                  {a.boardIntro}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-wider text-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <Globe2 className="h-3.5 w-3.5 text-accent" /> 94+ countries
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-accent" /> WEF strategic
                    alliance
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" /> ISO-aligned
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onApply}
                    className="btn-primary inline-flex items-center gap-2 text-base text-white"
                  >
                    {a.boardApply}
                    <motion.span
                      aria-hidden="true"
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </button>
                  <a
                    href="mailto:board@iqcdl.org?subject=Board%20brief%20request"
                    className="btn-ghost inline-flex items-center gap-2 text-sm"
                  >
                    Request a Board brief
                  </a>
                </div>
                <p className="mt-3 text-xs text-faint">
                  No fee to apply · Confidential review
                </p>
              </div>

              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {a.boardBenefitsTitle}
                </p>
                <ul className="grid gap-2.5">
                  {a.boardBenefits.map((b: string, i: number) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                      className="flex items-start gap-3 rounded-xl border border-line/10 bg-surface/5 px-4 py-2.5 text-sm leading-relaxed text-fg"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-quantum-cyan" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
                <figure className="rounded-2xl border border-line/10 bg-surface/5 p-5">
                  <blockquote className="text-sm italic leading-relaxed text-muted">
                    “IQCDL is doing for quantum what IAIDL did for AI — turning a
                    fast-moving, intimidating field into something every
                    organisation can plan against.”
                  </blockquote>
                  <figcaption className="mt-3 text-xs font-semibold uppercase tracking-wider text-faint">
                    — IAIDL Group senior advisor
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { dict } = useLocale();
  const a = dict.about;
  const [boardOpen, setBoardOpen] = useState(false);

  return (
    <>
      <CinematicHero
        eyebrow={a.eyebrow}
        title={a.title}
        founded={a.founded}
      />

      <section className="section pt-0">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-3">
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted">
              {a.intro}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-2">
            <TiltCard className="card h-full bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-7">
              <Sparkles className="h-6 w-6 text-accent" />
              <h2 className="mt-3 text-xl font-bold text-fg">{a.parentTitle}</h2>
              <p className="mt-2 leading-relaxed text-muted">{a.parentBody}</p>
              {a.parentHighlights && a.parentHighlights.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {a.parentHighlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-quantum-cyan/30 bg-quantum-cyan/10 px-3 py-1 text-xs font-semibold text-quantum-cyan"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </TiltCard>
          </Reveal>
          <Reveal delay={0.08}>
            <TiltCard className="card h-full p-7">
              <Target className="h-6 w-6 text-accent" />
              <h2 className="mt-3 text-xl font-bold text-fg">{a.missionTitle}</h2>
              <p className="mt-2 leading-relaxed text-muted">{a.mission}</p>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">
              {a.governanceTitle}
            </h2>
            <p className="mt-3 text-muted">{a.governanceSubtitle}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {a.governance.map((g, i) => {
              const Icon = GOV_ICONS[i % GOV_ICONS.length];
              return (
                <Reveal key={g.name} delay={(i % 3) * 0.08}>
                  <TiltCard className="card h-full p-6 transition-shadow duration-300 hover:shadow-glow">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent ring-1 ring-line/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-fg">{g.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {g.body}
                    </p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-16">
            <h3 className="text-center text-lg font-semibold text-fg">
              {a.chartTitle}
            </h3>
            <p className="mx-auto mt-1 max-w-xl text-center text-sm text-muted">
              {a.chartSubtitle}
            </p>
            <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center">
              <ChartNode label={a.governance[0].name} primary />
              <Connector />
              <div className="grid w-full gap-4 sm:grid-cols-3">
                {[a.governance[1], a.governance[2], a.governance[3]].map((g) => (
                  <ChartNode key={g.name} label={g.name} />
                ))}
              </div>
              <Connector />
              <ChartNode label={a.governance[4].name} />
              <Connector />
              <div className="grid w-full gap-4 sm:grid-cols-3">
                {a.chartBase.map((b) => (
                  <ChartNode key={b} label={b} muted />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">
              {a.leadershipTitle}
            </h2>
            <p className="mt-3 text-muted">{a.leadershipSubtitle}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.leadership.map((l, i) => (
              <Reveal key={l.role} delay={(i % 3) * 0.06}>
                <TiltCard
                  max={5}
                  className="card flex h-full items-start gap-4 p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan font-display text-lg font-bold text-white">
                    {l.role.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-semibold text-fg">{l.role}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {l.remit}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">
              {a.valuesTitle}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 0.06}>
                <TiltCard max={5} className="card h-full p-6">
                  <h3 className="font-semibold text-accent">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {v.body}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {a.stats.map((s, i) => (
              <Reveal key={s.label} delay={(i % 4) * 0.06}>
                <div className="card p-6 text-center">
                  <div className="gradient-text font-display text-2xl font-bold sm:text-3xl">
                    {s.value}
                  </div>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConversionBoardCTA a={a} onApply={() => setBoardOpen(true)} />

      <FinalCTA />
      <BoardApplyModal open={boardOpen} onClose={() => setBoardOpen(false)} />
    </>
  );
}
