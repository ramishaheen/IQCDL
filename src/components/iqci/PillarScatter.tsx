"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COUNTRIES, PILLAR_KEYS, type PillarKey } from "@/lib/iqci";

const W = 520;
const H = 360;
const PAD = 44;

export function PillarScatter({
  pillarNames,
  axisXLabel,
  axisYLabel,
}: {
  pillarNames: Record<string, string>;
  axisXLabel: string;
  axisYLabel: string;
}) {
  const [xKey, setXKey] = useState<PillarKey>("investment");
  const [yKey, setYKey] = useState<PillarKey>("talent");
  const [hover, setHover] = useState<string | null>(null);

  const sx = (v: number) => PAD + (v / 100) * (W - PAD * 2);
  const sy = (v: number) => H - PAD - (v / 100) * (H - PAD * 2);
  const ticks = [0, 25, 50, 75, 100];

  return (
    <div className="card p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="text-faint">{axisYLabel}</span>
          <select
            value={yKey}
            onChange={(e) => setYKey(e.target.value as PillarKey)}
            className="rounded-lg border border-line/10 bg-surface/5 px-2.5 py-1.5 text-sm text-fg focus:border-brand-400 focus:outline-none"
          >
            {PILLAR_KEYS.map((k) => (
              <option key={k} value={k}>{pillarNames[k]}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="text-faint">{axisXLabel}</span>
          <select
            value={xKey}
            onChange={(e) => setXKey(e.target.value as PillarKey)}
            className="rounded-lg border border-line/10 bg-surface/5 px-2.5 py-1.5 text-sm text-fg focus:border-brand-400 focus:outline-none"
          >
            {PILLAR_KEYS.map((k) => (
              <option key={k} value={k}>{pillarNames[k]}</option>
            ))}
          </select>
        </label>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Pillar scatter plot">
        <defs>
          <radialGradient id="dot" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </radialGradient>
        </defs>

        {/* grid */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={sx(t)} y1={PAD} x2={sx(t)} y2={H - PAD} stroke="currentColor" className="text-line/10" strokeWidth={1} />
            <line x1={PAD} y1={sy(t)} x2={W - PAD} y2={sy(t)} stroke="currentColor" className="text-line/10" strokeWidth={1} />
            <text x={sx(t)} y={H - PAD + 16} textAnchor="middle" className="fill-faint text-[9px]">{t}</text>
            <text x={PAD - 8} y={sy(t) + 3} textAnchor="end" className="fill-faint text-[9px]">{t}</text>
          </g>
        ))}

        {/* points */}
        {COUNTRIES.map((c, idx) => {
          const cx = sx(c.pillars[xKey]);
          const cy = sy(c.pillars[yKey]);
          const r = 6 + (c.score / 100) * 8;
          const active = hover === c.country;
          return (
            <motion.g
              key={c.country}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, type: "spring", stiffness: 200, damping: 18 }}
              onMouseEnter={() => setHover(c.country)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={cx} cy={cy} r={r} fill="url(#dot)" opacity={active ? 1 : 0.78} stroke="#fff" strokeWidth={active ? 1.5 : 0.5} />
              <text x={cx} y={cy + 3} textAnchor="middle" className="text-[10px]">{c.flag}</text>
              {active && (
                <text x={cx} y={cy - r - 6} textAnchor="middle" className="fill-fg text-[10px] font-semibold">
                  {c.country} · {c.score}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
