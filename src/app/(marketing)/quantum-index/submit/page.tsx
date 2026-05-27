"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { FileUpload, type UploadedFile } from "@/components/ui/FileUpload";
import { PILLAR_KEYS } from "@/lib/iqci";

export default function SubmitEvidencePage() {
  const { dict } = useLocale();
  const s = dict.iqci.submit;
  const names = dict.iqci.pillarNames as Record<string, string>;

  const [form, setForm] = useState({
    org: "", contactName: "", officialEmail: "", phone: "", country: "",
    pillar: names[PILLAR_KEYS[0]], claim: "",
  });
  const [passport, setPassport] = useState<UploadedFile | null>(null);
  const [docs, setDocs] = useState<UploadedFile | null>(null);
  const [ai, setAi] = useState<{ score: number; verdict: string; needsEvidence: boolean } | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const canSubmit = form.org && form.contactName && form.officialEmail && form.phone && form.claim && passport;

  async function review() {
    setReviewing(true);
    try {
      const res = await fetch("/api/ai/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Pillar: ${form.pillar}\n\n${form.claim}` }),
      });
      setAi(await res.json());
    } finally {
      setReviewing(false);
    }
  }

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const files = [passport && { ...passport, name: `passport-${passport.name}` }, docs].filter(Boolean);
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "evidence", ...form, files }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone({ id: data.id });
        setAi({ score: data.aiScore, verdict: data.aiVerdict, needsEvidence: data.aiNeedsEvidence });
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <>
        <PageHero eyebrow={dict.iqci.eyebrow} title={s.title} />
        <section className="section pt-0">
          <div className="container-x">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg">
              <div className="card p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h2 className="mt-4 text-xl font-bold text-fg">{s.submitted}</h2>
                <p className="mt-2 font-mono text-sm text-accent">{done.id}</p>
                {ai && (
                  <div className="mt-5 rounded-xl border border-line/10 bg-surface/5 p-4 text-start">
                    <p className="text-[11px] uppercase tracking-wider text-faint">{s.scoreLabel}</p>
                    <p className="font-display text-2xl font-bold text-fg">{ai.score}/100</p>
                    <p className="mt-2 text-sm text-muted">{ai.verdict}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow={dict.iqci.eyebrow} title={s.title} subtitle={s.note} />
      <section className="section pt-0">
        <div className="container-x">
          <div className="mx-auto max-w-2xl">
            <div className="card space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label={s.org} value={form.org} onChange={set("org")} />
                <Input label={s.country} value={form.country} onChange={set("country")} />
                <Input label={s.contactName} value={form.contactName} onChange={set("contactName")} />
                <Input label={s.officialEmail} type="email" value={form.officialEmail} onChange={set("officialEmail")} />
                <Input label={s.phone} value={form.phone} onChange={set("phone")} />
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-fg">{s.pillar}</span>
                  <select value={form.pillar} onChange={set("pillar")} className="w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg focus:border-brand-400 focus:outline-none">
                    {PILLAR_KEYS.map((k) => <option key={k} value={names[k]}>{names[k]}</option>)}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-fg">{s.claim}</span>
                <textarea value={form.claim} onChange={set("claim")} rows={5} placeholder={s.claimPh}
                  className="w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none" />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <FileUpload label={s.passport} kind="passport" value={passport} onChange={setPassport} />
                <FileUpload label={s.docs} kind="evidence" value={docs} onChange={setDocs} />
              </div>

              <p className="flex items-center gap-1.5 text-xs text-faint">
                <ShieldCheck className="h-3.5 w-3.5" />
                {s.requiredNote}
              </p>

              {ai && (
                <div className="rounded-xl border border-line/10 bg-surface/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-faint">{s.scoreLabel}</p>
                    {ai.needsEvidence && <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-medium text-amber-500">{s.needsEvidence}</span>}
                  </div>
                  <p className="font-display text-2xl font-bold text-fg">{ai.score}/100</p>
                  <p className="mt-2 text-sm text-muted">{ai.verdict}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={review} disabled={!form.claim || reviewing} className="btn-ghost flex-1 disabled:opacity-50">
                  {reviewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
                  {s.review}
                </button>
                <button onClick={submit} disabled={!canSubmit || submitting} className="btn-primary flex-1 text-white disabled:opacity-50">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {s.submit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-fg">{label}</span>
      <input {...props} className="w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none" />
    </label>
  );
}
