export type Locale = "en" | "ar" | "fr" | "es" | "zh" | "de";

export const LOCALES: Locale[] = ["en", "ar", "fr", "es", "zh", "de"];

export const DEFAULT_LOCALE: Locale = "en";

export const RTL_LOCALES: Locale[] = ["ar"];

export interface LocaleMeta {
  code: Locale;
  /** Native language name */
  label: string;
  /** English language name */
  english: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: "en", label: "English", english: "English", flag: "🇬🇧", dir: "ltr" },
  ar: { code: "ar", label: "العربية", english: "Arabic", flag: "🇸🇦", dir: "rtl" },
  fr: { code: "fr", label: "Français", english: "French", flag: "🇫🇷", dir: "ltr" },
  es: { code: "es", label: "Español", english: "Spanish", flag: "🇪🇸", dir: "ltr" },
  zh: { code: "zh", label: "中文", english: "Chinese", flag: "🇨🇳", dir: "ltr" },
  de: { code: "de", label: "Deutsch", english: "German", flag: "🇩🇪", dir: "ltr" },
};

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return isRtl(locale) ? "rtl" : "ltr";
}
