"use client";

import { useMemo, useState } from "react";
import { Megaphone } from "lucide-react";
import { EmailComposerModal, type ComposerSeed } from "./EmailComposerModal";

export interface BroadcastCohort {
  /** Display label, e.g. "All chapter leads · 14 contacts". */
  label: string;
  /** Email addresses. */
  emails: string[];
  /** Stable cohort tag. */
  tag: string;
}

/**
 * Admin-level broadcast trigger. Pass any number of cohorts you want to expose
 * (the consumer decides what "all students at this centre", "all chapter leads",
 * etc. means in your data).
 */
export function BroadcastButton({ cohorts }: { cohorts: BroadcastCohort[] }) {
  const [picker, setPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<BroadcastCohort | null>(null);

  const seed: ComposerSeed = useMemo(
    () =>
      picked
        ? {
            to: picked.emails,
            cohort: picked.tag,
          }
        : {},
    [picked],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setPicker(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-700"
      >
        <Megaphone className="h-3.5 w-3.5" />
        Broadcast
      </button>

      {picker && (
        <div
          className="fixed inset-0 z-[85] grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setPicker(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-slate-900">Pick a recipient cohort</h3>
            <p className="mt-1 text-xs text-slate-500">
              The composer opens pre-filled with everyone in the cohort. You can still edit the list before sending.
            </p>
            <ul className="mt-4 space-y-2">
              {cohorts.length === 0 && (
                <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  No cohorts available yet.
                </li>
              )}
              {cohorts.map((c) => (
                <li key={c.tag}>
                  <button
                    type="button"
                    disabled={c.emails.length === 0}
                    onClick={() => {
                      setPicked(c);
                      setPicker(false);
                      setOpen(true);
                    }}
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-800 transition hover:border-brand-300 hover:bg-brand-50 disabled:opacity-40"
                  >
                    <span>{c.label}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                      {c.emails.length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <EmailComposerModal open={open} onClose={() => setOpen(false)} seed={seed} />
    </>
  );
}
