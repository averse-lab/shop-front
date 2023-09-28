import "server-only";

import { DICTIONARIES } from "./constants";
import { Locale } from "./types";

export const getDictionary = (locale: Locale) => {
  return DICTIONARIES[locale]();
};
