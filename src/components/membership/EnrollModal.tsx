"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock, Upload, ShieldCheck, Clock, Check, Loader2, AlertTriangle } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

const inputCls =
  "w-full rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-brand-400 focus:outline-none";

type Step = "benefits" | "upload" | "verifying" | "review";
type VerifyStatus = "approved" | "manual_review" | "rejected";

function FileRow({
  label,
  value,
  onPick,
}: {
  label: string;
  value: string;
  onPick: (name: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-line/10 bg-surface/5 px-3.5 py-2.5 text-sm transition hover:border-brand-300">
      <span className="flex items-center gap-2 text-muted">
        {value ? <Check className="h-4 w-4 text-emerald-500" /> : <Upload className="h-4 w-4 text-accent" />}
        <span className={value ? "text-fg" : ""}>{value || label}</span>
      </span>
      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0]?.name ?? "")}
      />
      <span className="text-xs font-semibold text-accent">Upload</span>
    </label>
  );
}

export function EnrollModal() {
  const { dict } = useLocale();
  const m = dict.membership;
  const k = m.kyc;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("benefits");
  const [form, setForm] = useState({ name: "", email: "", country: "" });
  const [files, setFiles] = useState({ photo: "", id: "", cv: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus | null>(null);
  const [verifyReason, setVerifyReason] = useState<string>("");

  useEffect(() => {
    const onOpen = () => {
      setStep("benefits");
      setError(null);
      setVerifyStatus(null);
      setVerifyReason("");
      setOpen(true);
    };
    window.addEventListener("iqcdl:open-enroll", onOpen);
    return () => window.removeEventListener("iqcdl:open-enroll", onOpen);
  }, []);

  async function verifyWithAI() {
    setStep("verifying");
    setError(null);
    setVerifyStatus(null);
    setVerifyReason("");
    try {
      const res = await fetch("/api/verify-membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          country: form.country,
          photoName: files.photo,
          idName: files.id,
          cvName: files.cv,
        }),
      });
      const data = await res.json();
      const status: VerifyStatus = data?.status ?? "manual_review";
      setVerifyStatus(status);
      setVerifyReason(typeof data?.reason === "string" ? data.reason : "");
      if (status === "rejected") {
        // Stay on upload step so the applicant can fix and resubmit.
        setStep("upload");
        setError(data?.reason || "Verification failed. Please review your details and try again.");
        return;
      }
      // approved + manual_review both go to the review screen.
      setStep("review");
    } catch {
      setError("Network error during verification. Please try again.");
      setStep("upload");
    }
  }

  async function pay() {
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
        window.location.href = data.url;
        return;
      }
      if (data.mode === "demo") {
        router.push(
          `/membership/success?demo=1&e=${encodeURIComponent(form.email)}&n=${encodeURIComponent(form.name)}`,
        );
        setOpen(false);
        return;
      }
      setError(data.error || "Something went wrong.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="glass-strong my-8 w-full max-w-md rounded-2xl p-6 shadow-card"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fg">{m.modalTitle}</h3>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-faint transition hover:bg-surface/10 hover:text-fg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {step === "benefits" && (
              <div className="space-y-4">
                <p className="text-sm text-muted">{m.modalNote}</p>
                <ul className="space-y-2">
                  {m.benefits.slice(0, 4).map((b) => (
                    <li key={b.title} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-fg">{b.title}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setStep("upload")} className="btn-primary w-full text-white">
                  {k.startVerify}
                </button>
              </div>
            )}

            {step === "upload" && (
              <div className="space-y-3">
                <p className="flex items-start gap-2 text-sm text-muted">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {k.uploadNote}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputCls} placeholder={m.nameLabel} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input type="email" className={inputCls} placeholder={m.emailLabel} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <input className={inputCls} placeholder={m.countryLabel} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                <FileRow label={k.photo} value={files.photo} onPick={(n) => setFiles({ ...files, photo: n })} />
                <FileRow label={k.idDoc} value={files.id} onPick={(n) => setFiles({ ...files, id: n })} />
                <FileRow label={k.cv} value={files.cv} onPick={(n) => setFiles({ ...files, cv: n })} />
                <button
                  onClick={() => {
                    if (!form.name || !form.email || !files.photo || !files.id) {
                      setError("Please add your name, email, photo and ID document.");
                      return;
                    }
                    setError(null);
                    verifyWithAI();
                  }}
                  className="btn-primary w-full text-white"
                >
                  <ShieldCheck className="h-4 w-4" />
                  {k.submitVerify}
                </button>
                {error && <p className="text-sm text-rose-400">{error}</p>}
              </div>
            )}

            {step === "verifying" && (
              <div className="space-y-3 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-quantum-cyan/15 text-quantum-cyan">
                  <Loader2 className="h-7 w-7 animate-spin" />
                </span>
                <h4 className="text-lg font-semibold text-fg">AI verification in progress</h4>
                <p className="text-sm text-muted">
                  Cross-checking your name, email and document references against IQCDL's automated review. This usually takes a few seconds.
                </p>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-4 text-center">
                {verifyStatus === "approved" ? (
                  <>
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-400">
                      <Check className="h-7 w-7" />
                    </span>
                    <h4 className="text-lg font-semibold text-fg">Verified by IQCDL AI</h4>
                  </>
                ) : verifyStatus === "manual_review" ? (
                  <>
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-400/15 text-amber-500">
                      <AlertTriangle className="h-7 w-7" />
                    </span>
                    <h4 className="text-lg font-semibold text-fg">Flagged for human review</h4>
                  </>
                ) : (
                  <>
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-400/15 text-amber-500">
                      <Clock className="h-7 w-7" />
                    </span>
                    <h4 className="text-lg font-semibold text-fg">{k.reviewTitle}</h4>
                  </>
                )}
                <p className="text-sm text-muted">{verifyReason || k.reviewBody}</p>
                <button onClick={pay} disabled={busy} className="btn-primary w-full text-white">
                  <Lock className="h-4 w-4" />
                  {busy ? m.processing : k.continuePay}
                </button>
                <p className="text-xs text-faint">{k.autoRenew}</p>
                {error && <p className="text-sm text-rose-400">{error}</p>}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
