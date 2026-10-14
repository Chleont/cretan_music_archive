import { el } from "./el";
import { en } from "./en";

export const dictionaries = {
  el,
  en,
} as const;

export type Locale = keyof typeof dictionaries;

export function getLocale(value?: string | string[]) {
  const lang = Array.isArray(value) ? value[0] : value;

  return lang === "en" ? "en" : "el";
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getMusicians(locale: Locale) {
  return dictionaries[locale].musiciansPage.musicians;
}
