"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Radio, Globe2, Loader2 } from "lucide-react";
import { QuantumSpark } from "@/components/visuals/QuantumSpark";
import type { QuarterlyEdition } from "@/lib/iqci";

interface Labels {
  title: string;
  note: string;
  generating: string;
  liveLabel: string;
  updatedLabel: string;
  headlineLabel: string;
  highlightsLabel: string;
  distributionTitle: string;
  distributionNote: string;
  reachLabel: string;
  sentTo: string;
}

export function QuarterlyEditions({ labels }: { labels: Labels }) {
  const [edition, setEdition] = useState<QuarterlyEdition | null>(null);
  const [loading, setLoading] = useState(true);
  const started = useRef(false);

  // Auto-generates on view — no button. The quarterly/data agent runs server-side.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      try {
        const res = await fetch("/api/iqci/generate", { method: "POST" });
        const data = await res.json();
        setEdition(data.edition as QuarterlyEdition);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-fg">
            <QuantumSpark className="h-5 w-5 text-accent" />
            {labels.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted">{labels.note}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {labels.liveLabel}
        </span>
      </div>

      {loading && (
        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" />
          {labels.generating}
        </div>
      )}

      {edition && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid gap-4 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-line/10 bg-surface/5 p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">{edition.label}</span>
              <span className="text-xs text-faint">{labels.updatedLabel} {new Date(edition.generatedAt).toLocaleString()}</span>
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-faint">{labels.headlineLabel}</p>
            <h4 className="mt-1 text-lg font-bold leading-snug text-fg">{edition.headline}</h4>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-faint">{labels.highlightsLabel}</p>
            <ul className="mt-2 space-y-2">
              {edition.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line/10 bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-5">
            <h4 className="flex items-center gap-2 font-bold text-fg">
              <Radio className="h-4 w-4 text-accent" />
              {labels.distributionTitle}
            </h4>
            <p className="mt-1 text-sm text-muted">{labels.distributionNote}</p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface/10 p-3">
              <Globe2 className="h-5 w-5 text-accent" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-faint">{labels.reachLabel}</p>
                <p className="font-display text-lg font-bold text-fg">{edition.reach}</p>
              </div>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-faint">{labels.sentTo}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {edition.distributedTo.map((o) => (
                <span key={o} className="rounded-full border border-line/10 bg-surface/5 px-2.5 py-1 text-xs text-muted">
                  {o}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
