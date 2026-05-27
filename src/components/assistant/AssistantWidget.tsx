"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Bot, Lock, ArrowRight, ArrowLeft, MessageCircle, GraduationCap } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useMembership } from "@/components/providers/MembershipProvider";
import { cn } from "@/lib/cn";

/** Animated IQCDL atom mark for the launcher: orbits spin and the nucleus blinks. */
function AtomMark({ className }: { className?: string }) {
  const orbit = (rot: number, dur: number) => (
    <g>
      <ellipse cx="12" cy="12" rx="9" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={`${rot} 12 12`}
        to={`${rot + 360} 12 12`}
        dur={`${dur}s`}
        repeatCount="indefinite"
      />
    </g>
  );
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-hidden="true">
      {orbit(0, 6)}
      {orbit(60, 7)}
      {orbit(120, 8)}
      <circle cx="12" cy="12" r="2.4" fill="currentColor">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="2.4;3.1;2.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

interface Msg {
  role: "user" | "assistant";
  content: string;
}

type Topic = "general" | "tutor";

export function AssistantWidget() {
  const { t, dict } = useLocale();
  const { user } = useAuth();
  const { isMember, link } = useMembership();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [idInput, setIdInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"live" | "local" | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadBusy, setLeadBusy] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // The tutoring & support track is for portal users (any role) and members.
  // General questions are open to everyone once they leave contact details.
  const allowed = !!user || isMember;

  function backToMenu() {
    setTopic(null);
    setMessages([]);
    setMode(null);
    setInput("");
  }

  function reset() {
    backToMenu();
    setLeadCaptured(false);
  }

  function pick(next: Topic) {
    setTopic(next);
    setMessages([]);
    setMode(null);
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    setLeadError(null);
    const email = leadEmail.trim();
    const phone = leadPhone.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 5) {
      setLeadError(t("assistant.leadError"));
      return;
    }
    setLeadBusy(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: leadName.trim(), email, phone }),
      });
    } catch {
      // best-effort — still let the visitor chat if the network hiccups
    } finally {
      setLeadBusy(false);
      setLeadCaptured(true);
    }
  }

  // Seed the greeting whenever a topic's conversation starts empty.
  useEffect(() => {
    if (!open || topic === null || messages.length > 0) return;
    setMessages([
      {
        role: "assistant",
        content:
          topic === "general"
            ? t("assistant.generalGreeting")
            : t("assistant.greeting"),
      },
    ]);
  }, [open, topic, messages.length, t]);

  useEffect(() => {
    const onOpen = () => {
      reset();
      setOpen(true);
    };
    window.addEventListener("iqcdl:open-guide", onOpen);
    return () => window.removeEventListener("iqcdl:open-guide", onOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, mode: topic }),
      });
      const data = await res.json();
      setMode(data.mode ?? null);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply ?? t("assistant.error"),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: t("assistant.error") },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions =
    topic === "general"
      ? dict.assistant.generalSuggestions
      : dict.assistant.suggestions;

  const headerTitle =
    topic === "general" ? t("assistant.modeGeneralTitle") : t("assistant.title");
  const headerSubtitle =
    topic === null
      ? t("assistant.subtitle")
      : mode === "live"
        ? t("assistant.poweredLive")
        : mode === "local"
          ? t("assistant.poweredLocal")
          : t("assistant.subtitle");

  const showChat =
    (topic === "general" && leadCaptured) || (topic === "tutor" && allowed);

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : (reset(), setOpen(true)))}
        className="btn-primary fixed bottom-5 end-5 z-[60] !rounded-full !px-4 !py-3.5 shadow-glow"
        aria-label={t("assistant.open")}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="h-5 w-5" /> : <AtomMark className="h-5 w-5" />}
        <span className="hidden sm:inline">{t("assistant.open")}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="glass-strong fixed bottom-24 end-5 z-[60] flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl shadow-card"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line/10 bg-gradient-to-r from-quantum-indigo/30 to-quantum-cyan/20 px-4 py-3.5">
              {topic !== null ? (
                <button
                  type="button"
                  onClick={backToMenu}
                  aria-label={t("assistant.back")}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface/10 text-fg transition hover:bg-surface/20"
                >
                  <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
                </button>
              ) : (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan">
                  <Bot className="h-5 w-5 text-white" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-fg">
                  {headerTitle}
                </p>
                <p className="truncate text-xs text-muted">{headerSubtitle}</p>
              </div>
            </div>

            {topic === null ? (
              /* Topic picker */
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
                <p className="text-sm text-muted">{t("assistant.chooseMode")}</p>
                <button
                  type="button"
                  onClick={() => pick("general")}
                  className="flex items-start gap-3 rounded-2xl border border-line/10 bg-surface/5 p-4 text-start transition hover:border-quantum-cyan/40 hover:bg-surface/10"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/60 to-quantum-cyan/40 text-white">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-fg">
                      {t("assistant.modeGeneralTitle")}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted">
                      {t("assistant.modeGeneralDesc")}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => pick("tutor")}
                  className="flex items-start gap-3 rounded-2xl border border-line/10 bg-surface/5 p-4 text-start transition hover:border-quantum-cyan/40 hover:bg-surface/10"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo to-quantum-cyan text-white">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-fg">
                      {t("assistant.modeTutorTitle")}
                      {!allowed && <Lock className="h-3.5 w-3.5 text-faint" />}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted">
                      {t("assistant.modeTutorDesc")}
                    </span>
                  </span>
                </button>
              </div>
            ) : showChat ? (
              <>
                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
                >
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex",
                        m.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                          m.role === "user"
                            ? "bg-quantum-indigo text-white"
                            : "glass text-fg",
                        )}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="glass flex items-center gap-1.5 rounded-2xl px-3.5 py-3">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full bg-quantum-cyan"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: d * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.length <= 1 && !loading && (
                    <div className="space-y-2 pt-1">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="block w-full rounded-xl border border-line/10 bg-surface/5 px-3 py-2 text-start text-xs text-fg transition hover:border-quantum-cyan/40 hover:bg-surface/10"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-center gap-2 border-t border-line/10 p-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("assistant.placeholder")}
                    className="flex-1 rounded-full border border-line/10 bg-surface/5 px-4 py-2.5 text-sm text-fg placeholder:text-faint focus:border-quantum-cyan/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan text-white transition disabled:opacity-40"
                    aria-label={t("assistant.send")}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : topic === "general" ? (
              /* General: capture contact details, save + email admin, then chat */
              <form
                onSubmit={submitLead}
                className="flex flex-1 flex-col justify-center gap-3 p-6"
              >
                <div className="text-center">
                  <p className="font-semibold text-fg">{t("assistant.leadTitle")}</p>
                  <p className="mt-1 text-sm text-muted">{t("assistant.leadPrompt")}</p>
                </div>
                <input
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder={t("assistant.leadName")}
                  className="w-full rounded-full border border-line/10 bg-surface/5 px-4 py-2.5 text-sm text-fg placeholder:text-faint focus:border-quantum-cyan/50 focus:outline-none"
                />
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder={t("assistant.leadEmail")}
                  className="w-full rounded-full border border-line/10 bg-surface/5 px-4 py-2.5 text-sm text-fg placeholder:text-faint focus:border-quantum-cyan/50 focus:outline-none"
                />
                <input
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder={t("assistant.leadPhone")}
                  className="w-full rounded-full border border-line/10 bg-surface/5 px-4 py-2.5 text-sm text-fg placeholder:text-faint focus:border-quantum-cyan/50 focus:outline-none"
                />
                {leadError && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    {leadError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={leadBusy}
                  className="btn-primary w-full text-white disabled:opacity-50"
                >
                  {leadBusy ? t("assistant.thinking") : t("assistant.leadSubmit")}
                </button>
              </form>
            ) : (
              /* Gate (tutor track, not a member) */
              <div className="flex flex-1 flex-col items-center justify-center gap-5 p-6 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface/10 text-accent">
                  <Lock className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-fg">{t("assistant.gateTitle")}</p>
                  <p className="mt-1 text-sm text-muted">{t("assistant.gatePrompt")}</p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (idInput.trim()) link(idInput);
                  }}
                  className="w-full space-y-2"
                >
                  <input
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                    placeholder={t("assistant.idPlaceholder")}
                    className="w-full rounded-full border border-line/10 bg-surface/5 px-4 py-2.5 text-center text-sm text-fg placeholder:text-faint focus:border-quantum-cyan/50 focus:outline-none"
                  />
                  <button type="submit" className="btn-primary w-full text-white">
                    {t("assistant.unlock")}
                  </button>
                </form>
                <Link
                  href="/membership"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  {t("assistant.becomeMember")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
