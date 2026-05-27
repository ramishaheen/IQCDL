"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/cn";

type LevelKey = "critical" | "developing" | "advancing" | "ready";

interface Result {
  pct: number;
  level: LevelKey;
  track: "foundation" | "practitioner";
}

function computeResult(answers: number[]): Result {
  // answers[0] = data shelf-life (higher = more exposure / Mosca risk)
  // answers[1..4] = preparedness signals (higher = more ready)
  const prepared = answers.slice(1).reduce((a, b) => a + b, 0); // 0..12
  const moscaRisk = answers[0]; // 0..3
  const adjusted = prepared - moscaRisk; // -3..12
  const pct = Math.max(3, Math.min(99, Math.round(((adjusted + 3) / 15) * 100)));

  let level: LevelKey = "critical";
  if (pct >= 80) level = "ready";
  else if (pct >= 55) level = "advancing";
  else if (pct >= 30) level = "developing";

  const track: Result["track"] =
    pct >= 60 && answers[3] >= 2 ? "practitioner" : "foundation";

  return { pct, level, track };
}

const LEVEL_COLOR: Record<LevelKey, string> = {
  critical: "#f43f5e",
  developing: "#f59e0b",
  advancing: "#22d3ee",
  ready: "#34d399",
};

export function AssessmentWizard() {
  const { dict, t } = useLocale();
  const questions = dict.assessment.questions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );
  const [done, setDone] = useState(false);

  const total = questions.length;
  const current = questions[step];
  const answered = answers[step] >= 0;
  const progress = done ? 100 : Math.round((step / total) * 100);

  const result = useMemo(
    () => (done ? computeResult(answers) : null),
    [done, answers],
  );

  function choose(optionIdx: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIdx;
      return next;
    });
  }

  function next() {
    if (step < total - 1) setStep((s) => s + 1);
    else setDone(true);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setAnswers(Array(total).fill(-1));
    setStep(0);
    setDone(false);
  }

  function openGuide() {
    window.dispatchEvent(new CustomEvent("iqcdl:open-guide"));
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>
            {done
              ? t("assessment.resultTitle")
              : t("assessment.questionOf", {
                  current: step + 1,
                  total,
                })}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-quantum-cyan to-quantum-violet"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <div className="card overflow-hidden p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {current.q}
              </h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-slate-400">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-quantum-cyan" />
                {current.help}
              </p>

              <div className="mt-6 space-y-3">
                {current.options.map((opt, i) => {
                  const selected = answers[step] === i;
                  return (
                    <button
                      key={opt}
                      onClick={() => choose(i)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-start text-sm transition",
                        selected
                          ? "border-quantum-cyan/60 bg-quantum-cyan/10 text-white"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:bg-white/10",
                      )}
                    >
                      <span>{opt}</span>
                      <span
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                          selected
                            ? "border-quantum-cyan bg-quantum-cyan text-void"
                            : "border-white/30",
                        )}
                      >
                        {selected && <CheckCircle2 className="h-4 w-4" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="btn-ghost disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                  {t("assessment.back")}
                </button>
                <button
                  onClick={next}
                  disabled={!answered}
                  className="btn-primary disabled:opacity-40"
                >
                  {step === total - 1
                    ? t("assessment.seeResults")
                    : t("assessment.next")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </div>
            </motion.div>
          ) : (
            result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <ScoreGauge pct={result.pct} color={LEVEL_COLOR[result.level]} />

                <p className="mt-4 text-sm uppercase tracking-wider text-slate-400">
                  {t("assessment.resultScore")}
                </p>
                <h3
                  className="mt-1 text-2xl font-bold"
                  style={{ color: LEVEL_COLOR[result.level] }}
                >
                  {t(`assessment.levels.${result.level}`)}
                </h3>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-start">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {t("assessment.recommendedTrack")}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {result.track === "practitioner"
                      ? dict.tracks.practitioner.name
                      : dict.tracks.foundation.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {result.track === "practitioner"
                      ? dict.tracks.practitioner.forWho
                      : dict.tracks.foundation.forWho}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href="/programs" className="btn-primary">
                    <Sparkles className="h-4 w-4" />
                    {result.track === "practitioner"
                      ? dict.tracks.practitioner.name
                      : dict.tracks.foundation.name}
                  </Link>
                  <button onClick={openGuide} className="btn-ghost">
                    {t("assessment.talkToGuide")}
                  </button>
                </div>

                <button
                  onClick={restart}
                  className="mx-auto mt-5 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t("assessment.restart")}
                </button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScoreGauge({ pct, color }: { pct: number; color: string }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <motion.span
          className="font-display text-4xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {pct}%
        </motion.span>
      </div>
    </div>
  );
}
