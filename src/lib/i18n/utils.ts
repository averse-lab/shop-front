import "server-only";

import { DICTIONNARIES } from "./constants";
import { Locale } from "./types";

export const getDictionary = (locale: Locale) => {
  return DICTIONNARIES[locale]();
};
