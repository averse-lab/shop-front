import "server-only";

import { DICTIONNARIES } from "./constants";

export type Locale = keyof typeof DICTIONNARIES;
export type Dictionary = Awaited<ReturnType<(typeof DICTIONNARIES)[Locale]>>;
export type Config = {
  defaultLocale: Locale;
  locales: Locale[];
};
