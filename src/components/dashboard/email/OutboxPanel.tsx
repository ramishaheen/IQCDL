"use client";

import { useEffect, useState } from "react";
import { Inbox, RefreshCw, Check, AlertTriangle, Loader2, Eye } from "lucide-react";
import type { OutboxEntry, OutboxStatus } from "@/lib/email-outbox";

const STATUS_COLOUR: Record<OutboxStatus, string> = {
  queued: "bg-slate-100 text-slate-700",
  sent: "bg-sky-100 text-sky-800",
  delivered: "bg-emerald-100 text-emerald-800",
  opened: "bg-emerald-100 text-emerald-800",
  clicked: "bg-emerald-100 text-emerald-800",
  bounced: "bg-rose-100 text-rose-800",
  complained: "bg-rose-100 text-rose-800",
  failed: "bg-rose-100 text-rose-800",
};

function timeAgo(iso?: string): string {
  if (!iso) return "—";
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function OutboxPanel() {
  const [items, setItems] = useState<OutboxEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/email/outbox?limit=100", { cache: "no-store" });
      const data = await res.json();
      setItems(Array.isArray(data?.items) ? (data.items as OutboxEntry[]) : []);
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <Inbox className="h-4 w-4 text-brand-600" />
            Outbox
          </h2>
          <p className="text-xs text-slate-500">
            Last {items.length} email{items.length === 1 ? "" : "s"} sent via Resend. Status syncs from webhook events.
          </p>
        </div>
        <button
          onClick={load}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Refresh
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">To</th>
              <th className="px-3 py-2">Cohort</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 && !busy && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-xs text-slate-400">
                  No emails sent yet.
                </td>
              </tr>
            )}
            {items.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/60">
                <td className="px-3 py-2 text-xs text-slate-500" title={e.createdAt}>{timeAgo(e.createdAt)}</td>
                <td className="px-3 py-2 font-medium text-slate-900">
                  <div className="line-clamp-1 max-w-[28ch]" title={e.subject}>{e.subject}</div>
                </td>
                <td className="px-3 py-2 text-xs text-slate-600">
                  <span className="line-clamp-1 max-w-[24ch]" title={e.to.join(", ")}>
                    {e.to[0]}
                    {e.to.length > 1 ? ` +${e.to.length - 1}` : ""}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-slate-500">{e.cohort ?? "—"}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLOUR[e.status] ?? "bg-slate-100 text-slate-700"}`}>
                    {["delivered", "opened", "clicked", "sent"].includes(e.status) ? (
                      <Check className="h-3 w-3" />
                    ) : ["bounced", "complained", "failed"].includes(e.status) ? (
                      <AlertTriangle className="h-3 w-3" />
                    ) : null}
                    {e.status}
                    {e.test && <span className="ml-0.5 rounded-sm bg-white/40 px-1 text-[9px]">test</span>}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <Eye className="h-3 w-3" />
                    {expanded === e.id ? "Hide" : "View"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expanded && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          {(() => {
            const e = items.find((x) => x.id === expanded);
            if (!e) return null;
            return (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>To: {e.to.join(", ")}</span>
                  <span>{e.createdAt}</span>
                </div>
                <h4 className="text-base font-semibold text-slate-900">{e.subject}</h4>
                {e.reason && (
                  <p className="rounded-md bg-rose-100 px-2 py-1 text-xs text-rose-800">{e.reason}</p>
                )}
                <div
                  className="prose prose-sm max-w-none rounded-lg border border-slate-200 bg-white p-3"
                  dangerouslySetInnerHTML={{ __html: e.bodyHtml }}
                />
                {e.events && e.events.length > 0 && (
                  <ul className="text-xs text-slate-500">
                    {e.events.slice(-6).map((ev, i) => (
                      <li key={i}>
                        {ev.at.slice(0, 19).replace("T", " ")} — {ev.type}
                        {ev.recipient ? ` (${ev.recipient})` : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </section>
  );
}
