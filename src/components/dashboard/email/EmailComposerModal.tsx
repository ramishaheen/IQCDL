"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Sparkles, Loader2, Check, AlertTriangle, Eye, FlaskConical } from "lucide-react";

export interface ComposerSeed {
  to?: string[];
  subject?: string;
  html?: string;
  cohort?: string;
  recipientName?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  seed?: ComposerSeed;
}

const tones = ["warm", "formal", "concise", "celebratory"] as const;

export function EmailComposerModal({ open, onClose, seed }: Props) {
  const [to, setTo] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [cohort, setCohort] = useState<string>("");
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [tone, setTone] = useState<(typeof tones)[number]>("warm");
  const [busy, setBusy] = useState<"draft" | "send" | "test" | null>(null);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "ok"; msg: string }
    | { kind: "warn"; msg: string }
    | { kind: "err"; msg: string }
  >({ kind: "idle" });
  const [preview, setPreview] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    setTo((seed?.to ?? []).join(", "));
    setSubject(seed?.subject ?? "");
    setHtml(seed?.html ?? "");
    setCohort(seed?.cohort ?? "");
    setAiPrompt("");
    setStatus({ kind: "idle" });
    setPreview(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, seed]);

  async function draftWithAI() {
    if (!aiPrompt.trim()) {
      setStatus({ kind: "warn", msg: "Describe what the email should say first." });
      return;
    }
    setBusy("draft");
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/admin/email/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: aiPrompt,
          audience: cohort || "IQCDL contact",
          tone,
          recipientName: seed?.recipientName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: "err", msg: data?.error || "Draft failed" });
        return;
      }
      setSubject(data.subject || "");
      setHtml(data.html || "");
      setStatus({ kind: "ok", msg: "Draft ready — edit and send." });
    } catch {
      setStatus({ kind: "err", msg: "Network error during draft." });
    } finally {
      setBusy(null);
    }
  }

  async function send(test: boolean) {
    const recipients = to
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (recipients.length === 0) {
      setStatus({ kind: "warn", msg: "Add at least one recipient." });
      return;
    }
    if (!subject.trim() || !html.trim()) {
      setStatus({ kind: "warn", msg: "Subject and body are required." });
      return;
    }
    setBusy(test ? "test" : "send");
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/admin/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipients,
          subject,
          html,
          cohort: cohort || undefined,
          test,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: "err", msg: data?.error || "Send failed" });
        return;
      }
      setStatus({
        kind: "ok",
        msg: test
          ? `Test logged for ${recipients.length} recipient${recipients.length === 1 ? "" : "s"}.`
          : `Sent to ${recipients.length} recipient${recipients.length === 1 ? "" : "s"}. Outbox id ${data.id}.`,
      });
      if (!test) {
        // Clear the form so a fresh send doesn't accidentally re-fire.
        setTimeout(() => onClose(), 1200);
      }
    } catch {
      setStatus({ kind: "err", msg: "Network error during send." });
    } finally {
      setBusy(null);
    }
  }

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="email-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          onClick={(e) => e.stopPropagation()}
          className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Send className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Compose email</h2>
                <p className="text-xs text-slate-500">Sent from {`{RESEND_FROM}`} via Resend · logged in the IQCDL outbox</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 px-6 py-5 sm:grid-cols-[1fr_220px]">
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                To
              </label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com, another@example.com"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              />
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Quarterly chapter update — Q1 2027"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              />
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Body (HTML)
                </label>
                <button
                  type="button"
                  onClick={() => setPreview((p) => !p)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                >
                  <Eye className="h-3.5 w-3.5" />
                  {preview ? "Edit" : "Preview"}
                </button>
              </div>
              {preview ? (
                <div
                  className="prose prose-sm min-h-[18rem] max-w-none rounded-lg border border-slate-200 bg-slate-50 p-4"
                  dangerouslySetInnerHTML={{ __html: html || "<p class='text-slate-400'>Nothing to preview yet.</p>" }}
                />
              ) : (
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  rows={12}
                  placeholder="<p>Hi {{name}},</p><p>...</p>"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs leading-relaxed focus:border-brand-400 focus:outline-none"
                />
              )}
            </div>

            <aside className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                AI draft
              </p>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={4}
                placeholder="Draft a renewal reminder for chapter leads, mention the 2027 cycle kickoff in January."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-brand-400 focus:outline-none"
              />
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as (typeof tones)[number])}
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button
                onClick={draftWithAI}
                disabled={busy !== null}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-50"
              >
                {busy === "draft" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                Draft with AI
              </button>
              <label className="mt-3 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Cohort tag (optional)
              </label>
              <input
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                placeholder="chapter-leads-q1-2027"
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:border-brand-400 focus:outline-none"
              />
            </aside>
          </div>

          {status.kind !== "idle" && (
            <div
              className={`mx-6 mb-3 flex items-start gap-2 rounded-lg border px-3 py-2 text-xs ${
                status.kind === "ok"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : status.kind === "warn"
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-rose-200 bg-rose-50 text-rose-800"
              }`}
            >
              {status.kind === "ok" ? (
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              ) : (
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              )}
              <span>{status.msg}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-3">
            <p className="text-[11px] text-slate-500">
              Live sends go through Resend. Test-send only logs to the outbox.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => send(true)}
                disabled={busy !== null}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-50"
              >
                {busy === "test" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FlaskConical className="h-3.5 w-3.5" />}
                Test
              </button>
              <button
                onClick={() => send(false)}
                disabled={busy !== null}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
              >
                {busy === "send" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
