"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

interface ContactRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  sequenceStep: number;
  nextSendAt: string;
  lastSentAt?: string;
  lastTopic?: string;
  converted: boolean;
  convertedAt?: string;
  convertedReason?: "member" | "admin-tag";
  unsubscribed: boolean;
}

function fmt(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function ContactsPage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/contacts", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setContacts(data.contacts ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") load();
  }, [user, load]);

  async function markCandidate(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/contacts/${id}/convert`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to mark candidate");
    } finally {
      setBusyId(null);
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
          Marketing contacts
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Leads from the General-chat contact form. The drip stops automatically
          when a contact pays via Stripe (becomes a Member), or when you mark them
          as a candidate here.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Step</th>
              <th className="px-4 py-3">Next send</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-end">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && contacts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  No contacts yet.
                </td>
              </tr>
            )}
            {contacts.map((c) => {
              const status = c.unsubscribed
                ? { label: "Unsubscribed", cls: "bg-slate-100 text-slate-600" }
                : c.converted
                  ? {
                      label:
                        c.convertedReason === "member"
                          ? "Member"
                          : "Candidate",
                      cls: "bg-emerald-100 text-emerald-700",
                    }
                  : { label: "Prospect", cls: "bg-sky-100 text-sky-700" };
              return (
                <tr key={c.id}>
                  <td className="px-4 py-3 text-slate-900">{c.name || "—"}</td>
                  <td className="px-4 py-3 text-slate-700">{c.email}</td>
                  <td className="px-4 py-3 text-slate-700">{c.phone}</td>
                  <td className="px-4 py-3 text-slate-700">{c.sequenceStep}</td>
                  <td className="px-4 py-3 text-slate-500">{fmt(c.nextSendAt)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${status.cls}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    {c.converted || c.unsubscribed ? (
                      <span className="text-xs text-slate-400">—</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markCandidate(c.id)}
                        disabled={busyId === c.id}
                        className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {busyId === c.id ? "Marking…" : "Mark as candidate"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400">
        Tip: the drip cron runs daily — each contact gets a new email every 3–6 days.
      </p>
    </div>
  );
}
