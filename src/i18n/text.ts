export type Locale = "en" | "ar";

export type L = {
  en: string;
  ar: string;
};

export function tx(_locale: Locale, value: L) {
  return value.en;
}
