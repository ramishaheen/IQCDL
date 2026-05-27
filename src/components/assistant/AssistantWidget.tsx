"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/cn";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export function AssistantWidget() {
  const { t, dict } = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"live" | "local" | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("assistant.greeting") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
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
        body: JSON.stringify({ messages: next }),
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

  const suggestions = dict.assistant.suggestions;

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-primary fixed bottom-5 end-5 z-[60] !rounded-full !px-4 !py-3.5 shadow-glow"
        aria-label={t("assistant.open")}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
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
            <div className="flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-quantum-indigo/30 to-quantum-cyan/20 px-4 py-3.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan">
                <Bot className="h-5 w-5 text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {t("assistant.title")}
                </p>
                <p className="truncate text-xs text-slate-600">
                  {mode === "live"
                    ? t("assistant.poweredLive")
                    : mode === "local"
                      ? t("assistant.poweredLocal")
                      : t("assistant.subtitle")}
                </p>
              </div>
            </div>

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
                        : "glass text-slate-800",
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
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-start text-xs text-slate-700 transition hover:border-quantum-cyan/40 hover:bg-slate-100"
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
              className="flex items-center gap-2 border-t border-slate-200 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("assistant.placeholder")}
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-quantum-cyan/50 focus:outline-none"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
