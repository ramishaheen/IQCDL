"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Lock, Printer, ArrowLeft, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";

function credentialId(seed: string, date: Date): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const code = h.toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  return `IQCDL-FND-${date.getFullYear()}-${code}`;
}

export function CertificateClient() {
  const { user } = useAuth();
  const { t, locale } = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [passed, setPassed] = useState(false);
  const [issued, setIssued] = useState<Date>(new Date());

  useEffect(() => {
    try {
      const ok = localStorage.getItem("iqcdl_exam_passed") === "true";
      const dateStr = localStorage.getItem("iqcdl_exam_date");
      setPassed(ok);
      setIssued(dateStr ? new Date(dateStr) : new Date());
    } catch {
      setPassed(false);
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="h-64" />;
  }

  if (!passed) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            {t("certificate.lockedTitle")}
          </h1>
          <p className="mt-2 text-slate-600">{t("certificate.lockedBody")}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard/exam" className="btn-primary">
              {t("certificate.goToExam")}
            </Link>
            <Link href="/dashboard" className="btn-ghost">
              {t("certificate.backToDashboard")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const name = user?.name ?? "—";
  const expires = new Date(issued);
  expires.setFullYear(expires.getFullYear() + 3);
  const fmt = (d: Date) =>
    d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  const cid = credentialId((user?.id ?? "") + name, issued);

  return (
    <div className="mx-auto max-w-3xl">
      {/* actions (hidden when printing) */}
      <div className="no-print mb-5 flex items-center justify-between gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("certificate.backToDashboard")}
        </Link>
        <button onClick={() => window.print()} className="btn-primary">
          <Printer className="h-4 w-4" />
          {t("certificate.download")}
        </button>
      </div>

      {/* certificate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border-2 border-brand-200 bg-white p-8 shadow-card sm:p-12"
      >
        {/* corner flourishes */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-brand-100/60 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-brand-100/60 blur-2xl" />
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-brand-100" />

        <div className="relative text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/iqcdl-logo.svg"
            alt="IQCDL"
            className="mx-auto h-14 w-auto"
          />

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
            {t("certificate.title")}
          </p>

          <p className="mt-6 text-sm text-slate-500">
            {t("certificate.presentedTo")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            {name}
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-slate-600">
            {t("certificate.completed")}{" "}
            <span className="font-semibold text-slate-900">
              {t("certificate.program")}
            </span>{" "}
            — <span className="text-brand-700">Foundation Level</span>.
          </p>

          {/* seal */}
          <div className="mt-8 flex justify-center">
            <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
              <Award className="h-9 w-9" />
              <span className="absolute inset-0 rounded-full ring-2 ring-inset ring-white/40" />
            </span>
          </div>

          {/* meta grid */}
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-4 text-start sm:grid-cols-3">
            <Meta label={t("certificate.issued")} value={fmt(issued)} />
            <Meta label={t("certificate.expires")} value={fmt(expires)} />
            <Meta label={t("certificate.credentialId")} value={cid} mono />
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-6 sm:flex-row sm:items-end">
            <div className="text-start">
              <div className="h-8 w-44 border-b border-slate-300" />
              <p className="mt-2 text-xs text-slate-500">
                {t("certificate.signatory")}
              </p>
            </div>
            <p className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-brand-500" />
              {t("certificate.verify")}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Meta({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={`mt-0.5 text-sm font-semibold text-slate-900 ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
