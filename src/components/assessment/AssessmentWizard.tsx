"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Info,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { QuantumSpark } from "@/components/visuals/QuantumSpark";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/cn";

type LevelKey = "critical" | "developing" | "advancing" | "ready";
type DimKey =
  | "exposure"
  | "visibility"
  | "agility"
  | "adoption"
  | "people"
  | "governance";

// Maps each question (by index) to a readiness dimension.
const QUESTION_DIMENSIONS: DimKey[] = [
  "exposure",
  "visibility",
  "agility",
  "adoption",
  "people",
  "governance",
  "adoption",
  "governance",
];
// Questions where a HIGHER answer means MORE risk (lower readiness).
const REVERSE_INDICES = new Set<number>([0]);

const DIM_ORDER: DimKey[] = [
  "exposure",
  "visibility",
  "agility",
  "adoption",
  "people",
  "governance",
];

interface DimResult {
  key: DimKey;
  pct: number;
}

interface Result {
  pct: number;
  level: LevelKey;
  track: "foundation" | "practitioner";
  dimensions: DimResult[];
  weakest: DimKey[];
}

function computeResult(answers: number[]): Result {
  const contributions = answers.map((ans, i) =>
    REVERSE_INDICES.has(i) ? 3 - ans : ans,
  );

  const byDim = new Map<DimKey, number[]>();
  contributions.forEach((c, i) => {
    const dim = QUESTION_DIMENSIONS[i];
    if (!byDim.has(dim)) byDim.set(dim, []);
    byDim.get(dim)!.push(c);
  });

  const dimensions: DimResult[] = DIM_ORDER.map((key) => {
    const vals = byDim.get(key) ?? [0];
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return { key, pct: Math.round((avg / 3) * 100) };
  });

  const mean =
    contributions.reduce((a, b) => a + b, 0) / contributions.length; // 0..3
  const pct = Math.max(3, Math.min(99, Math.round((mean / 3) * 100)));

  let level: LevelKey = "critical";
  if (pct >= 80) level = "ready";
  else if (pct >= 55) level = "advancing";
  else if (pct >= 30) level = "developing";

  const adoptionPct = dimensions.find((d) => d.key === "adoption")?.pct ?? 0;
  const track: Result["track"] =
    pct >= 60 && adoptionPct >= 50 ? "practitioner" : "foundation";

  const weakest = [...dimensions]
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3)
    .map((d) => d.key);

  return { pct, level, track, dimensions, weakest };
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
        <div className="mb-2 flex items-center justify-between text-xs text-faint">
          <span>
            {done
              ? t("assessment.resultTitle")
              : t("assessment.questionOf", { current: step + 1, total })}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface/10">
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
              <h3 className="text-xl font-semibold text-fg sm:text-2xl">
                {current.q}
              </h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-faint">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
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
                          ? "border-brand-400 bg-brand-500/15 text-brand-200"
                          : "border-line/10 bg-surface/5 text-muted hover:border-line/20 hover:bg-surface/10",
                      )}
                    >
                      <span>{opt}</span>
                      <span
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                          selected
                            ? "border-brand-500 bg-brand-500 text-fg"
                            : "border-line/20",
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
              >
                <div className="text-center">
                  <ScoreGauge
                    pct={result.pct}
                    color={LEVEL_COLOR[result.level]}
                  />
                  <p className="mt-4 text-sm uppercase tracking-wider text-faint">
                    {t("assessment.resultScore")}
                  </p>
                  <h3
                    className="mt-1 text-2xl font-bold"
                    style={{ color: LEVEL_COLOR[result.level] }}
                  >
                    {t(`assessment.levels.${result.level}`)}
                  </h3>
                </div>

                {/* dimension breakdown */}
                <div className="mt-7">
                  <p className="mb-3 text-sm font-semibold text-fg">
                    {t("assessment.breakdownTitle")}
                  </p>
                  <div className="space-y-2.5">
                    {result.dimensions.map((d, i) => (
                      <div key={d.key} className="flex items-center gap-3">
                        <span className="w-28 shrink-0 text-xs text-faint sm:w-36 sm:text-sm">
                          {t(`assessment.dimensions.${d.key}`)}
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface/10">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background:
                                d.pct >= 55
                                  ? "linear-gradient(90deg,#22d3ee,#34d399)"
                                  : d.pct >= 30
                                    ? "linear-gradient(90deg,#f59e0b,#22d3ee)"
                                    : "linear-gradient(90deg,#f43f5e,#f59e0b)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${d.pct}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                          />
                        </div>
                        <span className="w-9 shrink-0 text-end text-xs tabular-nums text-muted">
                          {d.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* recommended track */}
                <div className="mt-6 rounded-2xl border border-line/10 bg-surface/5 p-5">
                  <p className="text-xs uppercase tracking-wider text-faint">
                    {t("assessment.recommendedTrack")}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-fg">
                    {result.track === "practitioner"
                      ? dict.tracks.practitioner.name
                      : dict.tracks.foundation.name}
                  </p>
                  <p className="mt-1 text-sm text-faint">
                    {result.track === "practitioner"
                      ? dict.tracks.practitioner.forWho
                      : dict.tracks.foundation.forWho}
                  </p>
                </div>

                {/* next steps */}
                <div className="mt-6">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    {t("assessment.nextStepsTitle")}
                  </p>
                  <ul className="space-y-2.5">
                    {result.weakest.map((key) => (
                      <li
                        key={key}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent rtl:rotate-180" />
                        <span>{t(`assessment.tips.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 rounded-xl border border-line/10 bg-surface/5 p-3 text-xs leading-relaxed text-faint">
                  {t("assessment.moscaNote")}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href="/programs" className="btn-primary">
                    <QuantumSpark className="h-4 w-4" />
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
                  className="mx-auto mt-5 flex items-center gap-1.5 text-sm text-faint transition hover:text-accent"
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
          className="font-display text-4xl font-bold text-fg"
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
