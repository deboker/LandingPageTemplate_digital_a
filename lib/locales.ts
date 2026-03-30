export const locales = ["sk", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sk";

export const localeLabels: Record<Locale, string> = {
  sk: "SK",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
