"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

type Segment = "minister" | "policymaker" | "partner" | "sponsor";
type Status =
  | "queued"
  | "in-sequence"
  | "engaged"
  | "replied"
  | "dormant"
  | "unsubscribed";

interface TargetRow {
  id: string;
  name: string;
  title?: string;
  org: string;
  country?: string;
  email: string;
  segment: Segment;
  language?: string;
  notes?: string;
  createdAt: string;
  step: number;
  status: Status;
  nextSendAt: string;
  lastSentAt?: string;
  openedAt?: string;
  lastClickAt?: string;
  clickCount: number;
  repliedAt?: string;
}

function fmt(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

const STATUS_CLS: Record<Status, string> = {
  queued: "bg-sky-100 text-sky-700",
  "in-sequence": "bg-amber-100 text-amber-700",
  engaged: "bg-blue-100 text-blue-700",
  replied: "bg-emerald-100 text-emerald-700",
  dormant: "bg-slate-100 text-slate-600",
  unsubscribed: "bg-rose-100 text-rose-700",
};

export default function OutreachAdminPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<TargetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  // form state
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState<Segment>("partner");
  const [language, setLanguage] = useState("");
  const [notes, setNotes] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/outreach", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRows(data.targets ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load targets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") load();
  }, [user, load]);

  async function addOne(e: React.FormEvent) {
    e.preventDefault();
    setBusy("add");
    setError(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          title,
          org,
          country,
          email,
          segment,
          language,
          notes,
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(d?.error || `HTTP ${res.status}`);
      }
      setName("");
      setTitle("");
      setOrg("");
      setCountry("");
      setEmail("");
      setLanguage("");
      setNotes("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add target");
    } finally {
      setBusy(null);
    }
  }

  async function setStatus(id: string, status: Status) {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/outreach/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this target? This cannot be undone.")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/outreach/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(null);
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
        <p className="font-semibold">Admin access required.</p>
        <p className="mt-2 text-sm text-slate-500">
          <Link href="/dashboard" className="text-quantum-cyan hover:underline">
            Back to dashboard
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Award outreach
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Ministers, policy-makers, partners and sponsors targeted by the
          award-outreach agent. The agent drafts and sends each touch, advances
          the sequence (5 → 6 → 7 days), and auto-marks engagement when a target
          opens, clicks or replies — no manual marking required.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Add target */}
      <form
        onSubmit={addOne}
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <input
          required
          placeholder="Full name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="Title / role"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          required
          placeholder="Organisation / ministry *"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="email"
          required
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value as Segment)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="minister">Minister / senior official</option>
          <option value="policymaker">Policy maker / regulator</option>
          <option value="partner">Partner organisation</option>
          <option value="sponsor">Sponsor / funder</option>
        </select>
        <input
          placeholder="Language (e.g. en, fr, ar)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
        />
        <button
          type="submit"
          disabled={busy === "add"}
          className="rounded-full bg-quantum-cyan px-4 py-2 text-sm font-semibold text-white hover:bg-quantum-blue disabled:opacity-50 sm:col-span-1"
        >
          {busy === "add" ? "Adding…" : "Add target"}
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Org / country</th>
              <th className="px-4 py-3">Segment</th>
              <th className="px-4 py-3">Step</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Next send</th>
              <th className="px-4 py-3">Engagement</th>
              <th className="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-slate-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-slate-400">
                  No targets yet. Add ministers, partners and sponsors above —
                  the agent picks them up on the next cron run.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 text-slate-900">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.title || ""}</div>
                  <div className="text-xs text-slate-500">{r.email}</div>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  <div>{r.org}</div>
                  <div className="text-xs text-slate-500">{r.country || ""}</div>
                </td>
                <td className="px-4 py-3 text-slate-700 capitalize">{r.segment}</td>
                <td className="px-4 py-3 text-slate-700">{r.step} / 3</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_CLS[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{fmt(r.nextSendAt)}</td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  <div>Opened: {r.openedAt ? "✓" : "—"}</div>
                  <div>
                    Clicks: {r.clickCount} {r.lastClickAt ? `(${fmt(r.lastClickAt)})` : ""}
                  </div>
                  <div>Replied: {r.repliedAt ? "✓" : "—"}</div>
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex flex-wrap justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, "dormant")}
                      disabled={busy === r.id}
                      className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-300 disabled:opacity-50"
                    >
                      Mark dormant
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, "queued")}
                      disabled={busy === r.id}
                      className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-200 disabled:opacity-50"
                    >
                      Re-queue
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      disabled={busy === r.id}
                      className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-200 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400">
        The cron at <code>/api/cron/outreach</code> runs daily and is
        CRON_SECRET-protected. Status auto-advances on Resend open/click
        webhooks (<code>/api/webhooks/resend</code>) and on inbound replies
        (<code>/api/outreach/inbound</code>) — manual buttons above are only
        for overrides.
      </p>
    </div>
  );
}
