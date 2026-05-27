"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

const inputCls =
  "w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none";

export function EnrollModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { dict } = useLocale();
  const m = dict.membership;
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", country: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Stripe Checkout
        return;
      }
      if (data.mode === "demo") {
        router.push(
          `/membership/success?demo=1&e=${encodeURIComponent(form.email)}&n=${encodeURIComponent(form.name)}`,
        );
        return;
      }
      setError(data.error || "Something went wrong.");
      setBusy(false);
    } catch {
      setError("Network error. Please try again.");
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-strong w-full max-w-md rounded-2xl p-6 shadow-card"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fg">{m.modalTitle}</h3>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg text-faint transition hover:bg-surface/10 hover:text-fg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-4 text-sm text-muted">{m.modalNote}</p>
            <form onSubmit={submit} className="space-y-3">
              <input
                className={inputCls}
                placeholder={m.nameLabel}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                className={inputCls}
                placeholder={m.emailLabel}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                className={inputCls}
                placeholder={m.countryLabel}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
              {error && <p className="text-sm text-rose-400">{error}</p>}
              <button type="submit" disabled={busy} className="btn-primary w-full text-white">
                <Lock className="h-4 w-4" />
                {busy ? m.processing : m.pay}
              </button>
              <p className="text-center text-xs text-faint">
                Secured by Stripe · You can cancel anytime
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
