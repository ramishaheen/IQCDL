"use client";

import { motion } from "framer-motion";
import { Layers, ShieldCheck, UserCircle2, Globe2, BadgeCheck } from "lucide-react";
import { CertificateSeal } from "./CertificateSeal";

export type SampleLevel = "everyone" | "foundation" | "practitioner";

interface LevelCfg {
  level: string;
  code: string;
  validity: string;
}

const LEVELS: Record<SampleLevel, LevelCfg> = {
  everyone: { level: "Quantum for Everyone", code: "EVR", validity: "Digital badge" },
  foundation: { level: "Foundation", code: "FND", validity: "3 years" },
  practitioner: { level: "Practitioner", code: "PRC", validity: "3 years" },
};

const FLAGS = "🇸🇦 🇦🇪 🇪🇬 🇩🇪 🇫🇷 🇬🇧 🇨🇳 🇺🇸";

export function SampleCertificate({
  levelKey = "foundation",
  name = "Your Name Here",
}: {
  levelKey?: SampleLevel;
  name?: string;
}) {
  const cfg = LEVELS[levelKey];
  const year = new Date().getFullYear();

  return (
    <motion.div
      key={levelKey}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-quantum-cyan/30 bg-[#080c1c] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:p-9"
    >
      {/* ambient glows + wave */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-quantum-indigo/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-white/5" />

      {/* header */}
      <div className="relative flex items-start justify-between">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2">
          <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden>
            <g transform="translate(20 20)" stroke="#7dd3fc" strokeWidth="2" fill="none">
              <ellipse rx="14" ry="6" />
              <ellipse rx="14" ry="6" transform="rotate(60)" />
              <ellipse rx="14" ry="6" transform="rotate(120)" />
              <circle r="2.5" fill="#7dd3fc" stroke="none" />
            </g>
          </svg>
          <span className="text-lg font-extrabold tracking-wide text-white">IQCDL</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
          <BadgeCheck className="h-4 w-4" />
          Verified
        </span>
      </div>

      {/* title */}
      <h3 className="relative mt-6 max-w-md text-2xl font-extrabold leading-tight tracking-wide text-quantum-cyan sm:text-3xl">
        INTERNATIONAL QUANTUM COMPUTING DRIVING LICENSE
      </h3>

      <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
        This is to certify that
      </p>
      <p className="relative mt-2 text-4xl font-bold text-white sm:text-5xl">{name}</p>
      <div className="relative mt-3 h-px max-w-sm bg-gradient-to-r from-quantum-cyan/70 to-transparent" />

      <p className="relative mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
        has successfully met the requirements and demonstrated the knowledge and competency to operate
        quantum computing systems and technologies in accordance with international standards.
      </p>

      {/* meta */}
      <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
        <MetaBox icon={<Layers className="h-4 w-4" />} label="Level" value={cfg.level} />
        <MetaBox icon={<ShieldCheck className="h-4 w-4" />} label="Validity" value={cfg.validity} />
        <MetaBox icon={<UserCircle2 className="h-4 w-4" />} label="Credential ID" value={`IQCDL-${cfg.code}-${year}-•••••`} mono />
      </div>

      {/* footer: flags · seal · signature */}
      <div className="relative mt-8 grid items-end gap-6 sm:grid-cols-3">
        <div>
          <p className="text-xl">{FLAGS}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
            <Globe2 className="h-4 w-4" />
            Recognized worldwide
          </p>
        </div>

        <div className="flex justify-center">
          <CertificateSeal className="h-28 w-28" tone="dark" />
        </div>

        <div className="text-center">
          <svg viewBox="0 0 160 44" className="mx-auto h-12 w-40" aria-hidden>
            <path
              d="M6 30 C 22 6, 30 6, 34 26 C 38 10, 46 10, 50 28 C 64 0, 78 40, 96 18 C 104 10, 120 10, 132 22 C 140 28, 150 22, 154 16"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="mx-auto h-px w-44 bg-white/20" />
          <p className="mt-2 text-sm font-medium text-quantum-cyan">Authorized Signature</p>
          <p className="text-xs text-slate-400">International Quantum Computing Certification Authority</p>
        </div>
      </div>
    </motion.div>
  );
}

function MetaBox({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-quantum-cyan">
        {icon}
        {label}
      </p>
      <p className={`mt-1 text-sm font-semibold text-white ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
