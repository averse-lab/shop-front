import "server-only";

import { Locale } from "./types";
import { DICTIONNARIES } from "./constants";

export const getDictionary = (locale: Locale) => {
  return DICTIONNARIES[locale]();
};
