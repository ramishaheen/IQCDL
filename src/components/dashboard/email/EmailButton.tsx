"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { EmailComposerModal, type ComposerSeed } from "./EmailComposerModal";

/**
 * Tiny per-row "send email" trigger. Drop into any table row that has an email
 * address — passes the address (and an optional cohort label) to the composer.
 */
export function EmailButton({
  to,
  name,
  cohort,
  variant = "icon",
  label = "Email",
}: {
  to: string;
  name?: string;
  cohort?: string;
  variant?: "icon" | "pill";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const seed: ComposerSeed = { to: [to], cohort, recipientName: name };

  const base =
    variant === "pill"
      ? "inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
      : "inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700";

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className={base}
        title={`Email ${name ?? to}`}
        aria-label={`Email ${name ?? to}`}
      >
        <Mail className="h-3.5 w-3.5" />
        {variant === "pill" && <span>{label}</span>}
      </button>
      <EmailComposerModal open={open} onClose={() => setOpen(false)} seed={seed} />
    </>
  );
}
