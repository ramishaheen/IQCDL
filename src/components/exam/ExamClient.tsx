"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Award,
  RotateCcw,
  FileText,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import {
  EXAM_PASS_MARK,
  EXAM_QUESTIONS,
  EXAM_TIME_SECONDS,
} from "@/lib/exam-bank";
import { cn } from "@/lib/cn";

type Phase = "intro" | "running" | "result";

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ExamClient() {
  const { t } = useLocale();
  const total = EXAM_QUESTIONS.length;

  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(total).fill(-1));
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME_SECONDS);
  const [score, setScore] = useState(0);

  const score100 = useMemo(() => {
    const correct = answers.filter(
      (a, i) => a === EXAM_QUESTIONS[i].answer,
    ).length;
    return Math.round((correct / total) * 100);
  }, [answers, total]);

  const submit = useCallback(() => {
    setScore(score100);
    setPhase("result");
    const passed = score100 >= EXAM_PASS_MARK;
    try {
      if (passed) {
        localStorage.setItem("iqcdl_exam_passed", "true");
        localStorage.setItem("iqcdl_exam_score", String(score100));
        localStorage.setItem("iqcdl_exam_date", new Date().toISOString());
      }
    } catch {
      /* ignore */
    }
  }, [score100]);

  useEffect(() => {
    if (phase !== "running") return;
    if (timeLeft <= 0) {
      submit();
      return;
    }
    const id = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft, submit]);

  function choose(i: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = i;
      return next;
    });
  }

  function start() {
    setAnswers(Array(total).fill(-1));
    setCurrent(0);
    setTimeLeft(EXAM_TIME_SECONDS);
    setScore(0);
    setPhase("running");
  }

  const answeredCount = answers.filter((a) => a >= 0).length;
  const passed = score >= EXAM_PASS_MARK;
  const lowTime = timeLeft <= 30;

  // ---- Intro ----
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="card p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <FileText className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            {t("exam.title")}
          </h1>
          <p className="mt-2 text-slate-600">{t("exam.subtitle")}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
            <Stat label={t("common.questions")} value={String(total)} />
            <Stat label={t("exam.timeLeft")} value={fmt(EXAM_TIME_SECONDS)} />
            <Stat label={t("exam.passMark")} value={`${EXAM_PASS_MARK}%`} />
          </div>

          <p className="mt-6 text-sm text-slate-500">{t("exam.instructions")}</p>
          <button onClick={start} className="btn-primary mt-6 w-full sm:w-auto">
            {t("exam.start")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    );
  }

  // ---- Result ----
  if (phase === "result") {
    return (
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 text-center"
        >
          <span
            className={cn(
              "mx-auto grid h-16 w-16 place-items-center rounded-full",
              passed ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600",
            )}
          >
            {passed ? <Award className="h-8 w-8" /> : <RotateCcw className="h-8 w-8" />}
          </span>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            {passed ? t("exam.passed") : t("exam.failed")}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-wider text-slate-500">
            {t("exam.yourScore")}
          </p>
          <p
            className={cn(
              "font-display text-5xl font-bold",
              passed ? "text-emerald-600" : "text-amber-600",
            )}
          >
            {score}%
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {t("exam.passMark")}: {EXAM_PASS_MARK}%
          </p>
          <p className="mx-auto mt-4 max-w-md text-slate-600">
            {passed ? t("exam.passBody") : t("exam.failBody")}
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            {passed ? (
              <Link href="/dashboard/certificate" className="btn-primary">
                <Award className="h-4 w-4" />
                {t("exam.viewCertificate")}
              </Link>
            ) : (
              <button onClick={start} className="btn-primary">
                <RotateCcw className="h-4 w-4" />
                {t("exam.retake")}
              </button>
            )}
            <Link href="/dashboard" className="btn-ghost">
              {t("exam.backToDashboard")}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---- Running ----
  const q = EXAM_QUESTIONS[current];
  return (
    <div className="mx-auto max-w-2xl">
      {/* top bar: progress + timer */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-sm text-slate-500">
          {t("exam.questionLabel")} {current + 1} {t("exam.of")} {total} ·{" "}
          {answeredCount} {t("exam.answered")}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold tabular-nums",
            lowTime
              ? "bg-rose-50 text-rose-600"
              : "bg-brand-50 text-brand-700",
          )}
        >
          <Clock className="h-4 w-4" />
          {fmt(timeLeft)}
        </span>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-quantum-cyan to-quantum-violet"
          animate={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      <div className="card overflow-hidden p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              {q.q}
            </h2>
            <div className="mt-5 space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[current] === i;
                return (
                  <button
                    key={opt}
                    onClick={() => choose(i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-start text-sm transition",
                      selected
                        ? "border-brand-400 bg-brand-50 text-brand-800"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100",
                    )}
                  >
                    <span>{opt}</span>
                    <span
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                        selected
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-slate-300",
                      )}
                    >
                      {selected && <CheckCircle2 className="h-4 w-4" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="btn-ghost disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("exam.prev")}
          </button>
          {current < total - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
              className="btn-primary"
            >
              {t("exam.next")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          ) : (
            <button onClick={submit} className="btn-primary">
              {t("exam.submit")}
              <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
      <p className="font-display text-lg font-bold text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </div>
  );
}
