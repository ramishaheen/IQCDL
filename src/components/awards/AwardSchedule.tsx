"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Rocket,
  ScanLine,
  Gavel,
  Trophy,
  Globe2,
  Flame,
  CalendarDays,
} from "lucide-react";
import { QuantumSpark } from "@/components/visuals/QuantumSpark";
import { Reveal } from "@/components/ui/Reveal";

type Phase = {
  badge: string;
  date: string;
  title: string;
  location?: string;
  activities: string[];
  aesthetic?: string;
  icon: typeof Rocket;
};

type Cycle = {
  yearLabel: string;
  yearTitle: string;
  yearNote?: string;
  phases: Phase[];
};

const CYCLES: Cycle[] = [
  {
    yearLabel: "2027",
    yearTitle: "2027 — Global Cycle",
    yearNote: "The inaugural multi-phase global cycle. Fixed schedule, not subject to change.",
    phases: [
      {
        badge: "Phase 1",
        date: "January 2027 → March 2027",
        title: "Global Kickoff & Registration",
        icon: Rocket,
        activities: [
          "Worldwide launch campaign",
          "Global press conference",
          "Country ambassadors onboarding",
          "Categories announcement",
          "Early registration opens",
          "Strategic partnerships activation",
          "Global roadshows & webinars",
        ],
        aesthetic:
          "Earth hologram · AI neural lines connecting continents · gold + electric blue cinematic style",
      },
      {
        badge: "Phase 2",
        date: "April 2027 → June 2027",
        title: "Submission & AI Readiness Assessment",
        icon: ScanLine,
        activities: [
          "Organizations upload evidence",
          "AI maturity assessment",
          "IAIDL framework validation",
          "AI governance scoring",
          "Innovation capability evaluation",
          "Digital transformation benchmarking",
        ],
        aesthetic:
          "AI scanning effect · digital dashboards · floating scoring metrics · dynamic country-ranking maps",
      },
      {
        badge: "Phase 3",
        date: "July 2027 → September 2027",
        title: "Technical Evaluation & Jury Reviews",
        icon: Gavel,
        activities: [
          "International assessors review submissions",
          "Jury interviews",
          "Live demos & AI capability presentations",
          "Ethical AI verification",
          "Future-readiness analysis",
          "Final scoring calibration",
        ],
        aesthetic:
          "Futuristic jury chamber · holographic panels · dynamic AI score visualization · global ranking transitions",
      },
      {
        badge: "Phase 4",
        date: "October 2027",
        title: "Finalists Announcement",
        icon: QuantumSpark,
        activities: [
          "Global finalists reveal",
          "Media exposure campaign",
          "Public voting (optional)",
          "Winner preparation",
          "VIP invitations",
        ],
        aesthetic:
          "Cinematic countdown · country flags appearing · golden AI particles · “Top AI Leaders of the World”",
      },
      {
        badge: "Phase 5",
        date: "November 2027",
        title: "Grand Ceremony",
        location: "Dubai",
        icon: Trophy,
        activities: [
          "Red carpet",
          "AI innovation showcase",
          "VIP government participation",
          "Global AI leaders summit",
          "Trophy presentation",
          "Strategic announcements",
          "Future AI roadmap launch",
        ],
        aesthetic:
          "Black + gold luxury stage · AI-generated immersive screens · holographic globe · orchestra + cinematic soundtrack · “Oscars of Artificial Intelligence”",
      },
    ],
  },
  {
    yearLabel: "2028",
    yearTitle: "2028 — Expansion & Global Intelligence Reports",
    phases: [
      {
        badge: "Year-long",
        date: "January 2028 → December 2028",
        title: "Expansion, Editions & Reports",
        icon: Globe2,
        activities: [
          "Global AI Index publication",
          "Regional editions",
          "AI country benchmarking",
          "Government AI transformation reports",
          "Ambassador ecosystem expansion",
          "AI leadership forums",
        ],
      },
    ],
  },
  {
    yearLabel: "2029",
    yearTitle: "2029 — Global Mega Edition",
    yearNote: "Theme: “AI Beyond Humanity.”",
    phases: [
      {
        badge: "Phase 1",
        date: "January 2029",
        title: "Worldwide Relaunch",
        icon: Rocket,
        activities: ["Theme: “AI Beyond Humanity” worldwide relaunch"],
      },
      {
        badge: "Phase 2",
        date: "February 2029 → June 2029",
        title: "Strategic Global Assessments",
        icon: ScanLine,
        activities: [
          "Sovereign AI",
          "Agentic AI",
          "Quantum AI",
          "AI governance",
          "National AI readiness",
          "AI economic impact",
        ],
      },
      {
        badge: "Phase 3",
        date: "July 2029 → September 2029",
        title: "Elite Jury & Global AI Olympics",
        icon: Flame,
        activities: [
          "Live AI battles",
          "Autonomous systems demonstrations",
          "Government AI innovation wars",
          "Startup AI arena",
          "AI ethics challenge",
        ],
      },
      {
        badge: "Phase 4",
        date: "October 2029",
        title: "World AI Summit Week",
        icon: Globe2,
        activities: [
          "AI Expo",
          "AI Startup Arena",
          "AI Research Forum",
          "AI Future Governments Forum",
          "Defense & Cyber AI Pavilion",
        ],
      },
      {
        badge: "Phase 5",
        date: "November 2029",
        title: "Global AI Award Ceremony 2029",
        icon: Trophy,
        activities: [
          "Positioning: “The Most Prestigious AI Award in the World”",
          "AI hologram hosts",
          "Drone light shows",
          "Immersive AI storytelling",
          "Live global broadcasting",
          "Interactive audience experiences",
          "Quantum-inspired stage design",
        ],
      },
    ],
  },
];

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const Icon = phase.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* sonar halos */}
      <motion.span
        className="absolute -start-10 top-5 z-0 h-7 w-7 rounded-full border-2 border-quantum-cyan/60 sm:-start-12"
        animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: index * 0.35 }}
      />
      <motion.span
        className="absolute -start-10 top-5 z-0 h-7 w-7 rounded-full border-2 border-quantum-cyan/50 sm:-start-12"
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut", delay: index * 0.35 + 0.7 }}
      />
      {/* node */}
      <motion.span
        className="absolute -start-10 top-5 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#05060f] ring-2 ring-quantum-cyan shadow-[0_0_22px_rgba(56,189,248,0.7)] sm:-start-12"
        initial={{ scale: 0, rotate: -120 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 + 0.15, type: "spring", stiffness: 260, damping: 14 }}
      >
        <Icon className="h-3.5 w-3.5 text-quantum-cyan" />
      </motion.span>

      <motion.div
        className="card relative overflow-hidden p-5 transition sm:p-6"
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 280 }}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-quantum-cyan/12 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {phase.date}
          </span>
          <span className="rounded-full bg-quantum-violet/20 px-2.5 py-0.5 text-xs font-medium text-accent">
            {phase.badge}
          </span>
        </div>
        <h3 className="relative mt-2 text-lg font-semibold text-fg">{phase.title}</h3>
        {phase.location && (
          <p className="relative mt-1 text-xs font-semibold uppercase tracking-wider text-quantum-cyan">
            ✦ {phase.location}
          </p>
        )}
        <ul className="relative mt-3 grid gap-1.5 text-sm leading-relaxed text-muted sm:grid-cols-2">
          {phase.activities.map((a) => (
            <li key={a} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-quantum-cyan" />
              {a}
            </li>
          ))}
        </ul>
        {phase.aesthetic && (
          <p className="relative mt-3 rounded-xl border border-line/10 bg-surface/5 px-3 py-2 text-xs italic leading-relaxed text-faint">
            <span className="font-semibold uppercase not-italic tracking-wider text-accent">
              Aesthetic:{" "}
            </span>
            {phase.aesthetic}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

function CycleSection({ cycle, cycleIndex }: { cycle: Cycle; cycleIndex: number }) {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 30%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <Reveal>
      <div className="rounded-3xl border border-quantum-cyan/20 bg-gradient-to-br from-quantum-indigo/10 via-[#070b14] to-quantum-cyan/8 p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Year {cycle.yearLabel}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">{cycle.yearTitle}</h3>
            {cycle.yearNote && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{cycle.yearNote}</p>
            )}
          </div>
          <span className="rounded-full border border-quantum-cyan/30 bg-quantum-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-quantum-cyan">
            Fixed schedule · not changeable
          </span>
        </div>

        <div ref={railRef} className="relative mt-10 ps-10 sm:ps-12">
          <div className="absolute start-[14px] top-3 bottom-3 w-0.5 rounded-full bg-line/30 sm:start-[18px]" />
          <motion.div
            className="absolute start-[14px] top-3 w-0.5 rounded-full bg-gradient-to-b from-quantum-cyan via-quantum-violet to-quantum-magenta shadow-[0_0_22px_rgba(56,189,248,0.6)] sm:start-[18px]"
            style={{ height: fillHeight }}
          />
          <motion.div
            className="absolute start-[8px] h-4 w-4 rounded-full bg-quantum-cyan shadow-[0_0_28px_8px_rgba(56,189,248,0.8)] sm:start-[12px]"
            style={{ top: fillHeight, opacity: glowOpacity, marginTop: "-8px" }}
          />
          <div className="space-y-8">
            {cycle.phases.map((p, i) => (
              <PhaseCard key={p.title} phase={p} index={cycleIndex * 10 + i} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function AwardSchedule() {
  return (
    <section className="section pt-0">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-quantum-cyan/30 bg-quantum-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-quantum-cyan">
            <CalendarDays className="h-3.5 w-3.5" /> Fixed global schedule
          </div>
          <h2 className="gradient-text-animated mt-5 text-balance text-3xl font-bold sm:text-4xl">
            The IQCDL Award Calendar
          </h2>
          <p className="mt-3 text-balance text-muted">
            A multi-year, fixed and non-changeable schedule — from worldwide kickoff to the Grand Ceremony in Dubai, and onward to the 2029 Global Mega Edition.
          </p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {CYCLES.map((c, i) => (
            <CycleSection key={c.yearLabel} cycle={c} cycleIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
