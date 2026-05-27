"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  dirFor,
  type Locale,
  LOCALES,
} from "@/i18n/config";
import { getDictionary, interpolate, type Dictionary } from "@/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dir: "ltr" | "rtl";
  dict: Dictionary;
  /** Translate a dotted key path, with optional {placeholder} interpolation. */
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "iqcdl_locale";

function resolveByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY)) as Locale | null;
    if (stored && LOCALES.includes(stored)) {
      setLocaleState(stored);
    } else if (typeof navigator !== "undefined") {
      const browser = navigator.language.slice(0, 2) as Locale;
      if (LOCALES.includes(browser)) setLocaleState(browser);
    }
  }, []);

  useEffect(() => {
    const dir = dirFor(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const dict = useMemo(() => getDictionary(locale), [locale]);

  const t = useMemo(() => {
    return (path: string, vars?: Record<string, string | number>) => {
      const value = resolveByPath(dict, path);
      if (typeof value === "string") return interpolate(value, vars);
      return path;
    };
  }, [dict]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, dir: dirFor(locale), dict, t }),
    [locale, dict, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
