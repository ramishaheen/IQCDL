"use client";

import { Book3D, type BookPage } from "@/components/visuals/Book3D";
import { COUNTRIES, PILLAR_KEYS } from "@/lib/iqci";

function PillarBars({ pillars, names }: { pillars: Record<string, number>; names: Record<string, string> }) {
  return (
    <div className="space-y-2">
      {PILLAR_KEYS.map((k) => (
        <div key={k}>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{names[k]}</span>
            <span className="font-semibold text-slate-200">{pillars[k]}</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-quantum-indigo to-quantum-cyan"
              style={{ width: `${pillars[k]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function IndexBook({
  coverTitle,
  coverSubtitle,
  hint,
  openLabel,
  closeLabel,
  statusLabel,
  pillarNames,
}: {
  coverTitle: string;
  coverSubtitle?: string;
  hint?: string;
  openLabel: string;
  closeLabel?: string;
  statusLabel: string;
  pillarNames: Record<string, string>;
}) {
  const pages: BookPage[] = COUNTRIES.map((c) => ({
    title: `#${c.rank}  ${c.flag}  ${c.country} — ${c.score}/100`,
    node: (
      <div className="space-y-4">
        <PillarBars pillars={c.pillars} names={pillarNames} />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-quantum-cyan">{statusLabel}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{c.status}</p>
        </div>
      </div>
    ),
  }));

  return (
    <Book3D
      coverTitle={coverTitle}
      coverSubtitle={coverSubtitle}
      hint={hint}
      openLabel={openLabel}
      closeLabel={closeLabel}
      pages={pages}
    />
  );
}
