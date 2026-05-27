"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Send } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

const inputCls =
  "w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none";

export function BoardApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { dict } = useLocale();
  const a = dict.about;
  const [form, setForm] = useState({ name: "", email: "", profile: "", fit: "", value: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.fit) return;
    setBusy(true);
    try {
      await fetch("/api/board-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* ignore — still acknowledge in demo */
    }
    setBusy(false);
    setDone(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-strong my-8 w-full max-w-lg rounded-2xl p-6 shadow-card"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fg">{a.boardModalTitle}</h3>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg text-faint transition hover:bg-surface/10 hover:text-fg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {done ? (
              <div className="py-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-500">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <p className="mt-4 text-muted">{a.boardThanks}</p>
                <button onClick={onClose} className="btn-ghost mt-5">
                  {dict.common.backHome}
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted">{a.boardModalNote}</p>
                <form onSubmit={submit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputCls} placeholder={dict.membership.nameLabel} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <input type="email" className={inputCls} placeholder={dict.membership.emailLabel} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <input className={inputCls} placeholder={a.profileLabel} value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} />
                  <input type="file" accept=".pdf,.doc,.docx" className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-surface/10 file:px-3 file:py-1.5 file:text-sm file:text-fg" onChange={(e) => setForm({ ...form, profile: form.profile || (e.target.files?.[0]?.name ?? "") })} />
                  <textarea className={inputCls} rows={2} placeholder={a.fitLabel} value={form.fit} onChange={(e) => setForm({ ...form, fit: e.target.value })} required />
                  <textarea className={inputCls} rows={2} placeholder={a.valueLabel} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
                  <button type="submit" disabled={busy} className="btn-primary w-full text-white">
                    <Send className="h-4 w-4" />
                    {busy ? "…" : a.boardSubmit}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
