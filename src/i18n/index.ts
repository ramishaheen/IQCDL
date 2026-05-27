import { type Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import ar from "./dictionaries/ar";
import fr from "./dictionaries/fr";
import es from "./dictionaries/es";
import zh from "./dictionaries/zh";
import de from "./dictionaries/de";
import type { DeepPartial } from "./types";

const OVERRIDES: Record<Locale, DeepPartial<Dictionary>> = {
  en: {},
  ar,
  fr,
  es,
  zh,
  de,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/** Deep-merge an override onto a base. Arrays and scalars replace; objects recurse. */
function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : (override as T));
  }
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const o = override[key];
    if (o === undefined) continue;
    result[key] = isPlainObject((base as Record<string, unknown>)[key])
      ? deepMerge((base as Record<string, unknown>)[key], o)
      : o;
  }
  return result as T;
}

const CACHE = new Map<Locale, Dictionary>();

export function getDictionary(locale: Locale): Dictionary {
  const cached = CACHE.get(locale);
  if (cached) return cached;
  const merged = deepMerge<Dictionary>(en, OVERRIDES[locale] ?? {});
  CACHE.set(locale, merged);
  return merged;
}

/** Interpolate {placeholders} in a template string. */
export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

export { en };
export type { Dictionary };
