"use client";

import { useEffect, useState } from "react";
import { Bot, Loader2, RefreshCw, Scale } from "lucide-react";
import { Panel, Table, Td, EmptyRow, Btn } from "@/components/dashboard/ui";

interface Submission {
  id: string;
  kind: "evidence" | "award";
  createdAt: string;
  org: string;
  contactName: string;
  officialEmail: string;
  country: string;
  category?: string;
  pillar?: string;
  title?: string;
  aiScore?: number;
  aiVerdict?: string;
  aiNeedsEvidence?: boolean;
}

function scoreColor(s: number) {
  if (s >= 75) return "text-emerald-600";
  if (s >= 50) return "text-amber-600";
  return "text-rose-600";
}

export function JuryConsole() {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "award" | "evidence">("all");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions");
      const data = await res.json();
      setSubs(Array.isArray(data.submissions) ? data.submissions : []);
    } catch {
      setSubs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const shown = subs
    .filter((s) => filter === "all" || s.kind === filter)
    .sort((a, b) => (b.aiScore ?? 0) - (a.aiScore ?? 0));

  return (
    <Panel
      title="Award & Index AI jury"
      desc="Every award and index submission, scored and compared by the neutral AI jury. Ranked highest-first — the jury's comparative verdict."
      action={
        <Btn variant="soft" onClick={load}>
          <span className="inline-flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </span>
        </Btn>
      }
    >
      <div className="mb-4 flex gap-1.5">
        {(["all", "award", "evidence"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
              filter === f ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f === "evidence" ? "Index evidence" : f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading submissions…
        </div>
      ) : (
        <Table head={["#", "Submission", "Type", "Jury score", "AI verdict"]}>
          {shown.length === 0 && <EmptyRow cols={5} label="No submissions yet. They appear here as soon as entrants submit." />}
          {shown.map((s, i) => (
            <tr key={s.id}>
              <Td className="font-display font-bold text-brand-600">{i + 1}</Td>
              <Td className="font-medium text-slate-900">
                <div>{s.title || s.org}</div>
                <div className="text-xs font-normal text-slate-400">
                  {s.org}{s.country ? ` · ${s.country}` : ""}{s.category ? ` · ${s.category}` : ""}{s.pillar ? ` · ${s.pillar}` : ""}
                </div>
              </Td>
              <Td>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-600">
                  {s.kind === "award" ? <Scale className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                  {s.kind}
                </span>
              </Td>
              <Td>
                <span className={`font-display text-lg font-bold ${scoreColor(s.aiScore ?? 0)}`}>{s.aiScore ?? "—"}</span>
                <span className="text-slate-400">/100</span>
                {s.aiNeedsEvidence && (
                  <div className="mt-0.5 text-[11px] font-medium text-amber-600">Needs clearer evidence</div>
                )}
              </Td>
              <Td className="max-w-xs text-xs text-slate-500">{s.aiVerdict}</Td>
            </tr>
          ))}
        </Table>
      )}
    </Panel>
  );
}
