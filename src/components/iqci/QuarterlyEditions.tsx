"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Radio, Sparkles, Globe2, Loader2 } from "lucide-react";
import type { QuarterlyEdition } from "@/lib/iqci";

interface Labels {
  title: string;
  note: string;
  generateBtn: string;
  generating: string;
  headlineLabel: string;
  highlightsLabel: string;
  distributionTitle: string;
  distributionNote: string;
  reachLabel: string;
  sentTo: string;
}

export function QuarterlyEditions({ labels }: { labels: Labels }) {
  const [edition, setEdition] = useState<QuarterlyEdition | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/iqci/generate", { method: "POST" });
      const data = await res.json();
      setEdition(data.edition as QuarterlyEdition);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-fg">
            <Sparkles className="h-5 w-5 text-accent" />
            {labels.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted">{labels.note}</p>
        </div>
        <button onClick={generate} disabled={loading} className="btn-primary shrink-0 text-white disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Newspaper className="h-4 w-4" />}
          {loading ? labels.generating : labels.generateBtn}
        </button>
      </div>

      {edition && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid gap-4 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-line/10 bg-surface/5 p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">{edition.label}</span>
              <span className="text-xs text-faint">{new Date(edition.generatedAt).toLocaleString()}</span>
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
                <motion.span
                  key={o}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-full border border-line/10 bg-surface/5 px-2.5 py-1 text-xs text-muted"
                >
                  {o}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
