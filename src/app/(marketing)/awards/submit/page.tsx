"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { FileUpload, type UploadedFile } from "@/components/ui/FileUpload";

export default function SubmitAwardPage() {
  const { dict } = useLocale();
  const s = dict.gqa.submit;
  const categories = dict.gqa.categories;

  const [form, setForm] = useState({
    org: "", contactName: "", officialEmail: "", phone: "", country: "",
    category: categories[0].name, title: "", summary: "",
  });
  const [docs, setDocs] = useState<UploadedFile | null>(null);
  const [improving, setImproving] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [paying, setPaying] = useState(false);
  const [ai, setAi] = useState<{ score: number; verdict: string } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const canPay = form.org && form.contactName && form.officialEmail && form.title && form.summary;

  async function improve() {
    if (!form.summary.trim()) return;
    setImproving(true);
    try {
      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: `${form.title}\n\n${form.summary}` }),
      });
      const data = await res.json();
      if (data.text) setForm((f) => ({ ...f, summary: data.text }));
    } finally {
      setImproving(false);
    }
  }

  async function score() {
    setScoring(true);
    try {
      const res = await fetch("/api/ai/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Category: ${form.category}\nTitle: ${form.title}\n\n${form.summary}` }),
      });
      const data = await res.json();
      setAi({ score: data.score, verdict: data.verdict });
    } finally {
      setScoring(false);
    }
  }

  async function pay() {
    if (!canPay) return;
    setPaying(true);
    try {
      // Store the submission (also AI-scored server-side for the jury).
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "award", ...form, files: [docs].filter(Boolean) }),
      });
      // Then take payment for the category entry.
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "gqa_award", email: form.officialEmail, name: form.contactName, meta: { category: form.category } }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = `/awards/success?demo=1&p=gqa_award`;
      }
    } finally {
      setPaying(false);
    }
  }

  return (
    <>
      <PageHero eyebrow={dict.gqa.eyebrow} title={s.title} subtitle={s.note} />
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
                  <span className="mb-1.5 block text-sm font-medium text-fg">{s.category}</span>
                  <select value={form.category} onChange={set("category")} className="w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg focus:border-brand-400 focus:outline-none">
                    {categories.map((c) => <option key={c.key} value={c.name}>{c.name}</option>)}
                  </select>
                </label>
              </div>

              <Input label={s.titleField} value={form.title} onChange={set("title")} />

              <label className="block">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-fg">{s.summary}</span>
                  <button onClick={improve} disabled={!form.summary || improving} className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent transition hover:bg-accent/25 disabled:opacity-50">
                    {improving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
                    {improving ? s.improving : s.improve}
                  </button>
                </div>
                <textarea value={form.summary} onChange={set("summary")} rows={7} placeholder={s.summaryPh}
                  className="w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none" />
              </label>

              <FileUpload label={s.docs} kind="award" value={docs} onChange={setDocs} />

              {ai && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-line/10 bg-gradient-to-br from-brand-500/15 to-brand-400/5 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-faint">{s.scoreLabel}</p>
                  <p className="font-display text-2xl font-bold text-fg">{ai.score}/100</p>
                  <p className="mt-2 text-sm text-muted">{ai.verdict}</p>
                </motion.div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={score} disabled={!form.summary || scoring} className="btn-ghost flex-1 disabled:opacity-50">
                  {scoring ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
                  {scoring ? s.scoring : s.score}
                </button>
                <button onClick={pay} disabled={!canPay || paying} className="btn-primary flex-1 text-white disabled:opacity-50">
                  {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {paying ? s.processing : s.pay}
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
