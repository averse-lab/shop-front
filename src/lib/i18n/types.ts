import "server-only";

import { DICTIONNARIES } from "./constants";

export type Locale = keyof typeof DICTIONNARIES;
export type Dictionnary = Awaited<ReturnType<(typeof DICTIONNARIES)[Locale]>>;
export type Config = {
  defaultLocale: Locale;
  locales: Locale[];
};
