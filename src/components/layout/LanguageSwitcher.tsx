"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LOCALE_META, LOCALES } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
      >
        <Globe className="h-4 w-4" />
        {!compact && <span>{LOCALE_META[locale].label}</span>}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="glass-strong absolute end-0 z-50 mt-2 w-48 overflow-hidden rounded-xl p-1.5 shadow-card"
        >
          {LOCALES.map((code) => {
            const meta = LOCALE_META[code];
            const active = code === locale;
            return (
              <button
                key={code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-quantum-indigo/20 text-white"
                    : "text-slate-300 hover:bg-white/5",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{meta.flag}</span>
                  <span>{meta.label}</span>
                </span>
                {active && <Check className="h-4 w-4 text-quantum-cyan" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
