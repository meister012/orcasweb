export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de", "ch", "ar"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export interface Lang {
  em: string;
  ps: string;
  pem: string;
  pps: string;
  bt: string;
  pr: string;
  wpr: string;
}
