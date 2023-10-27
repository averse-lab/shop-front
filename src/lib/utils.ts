import { FC, PropsWithChildren, createElement } from "react";

import { Locale } from "./i18n/types";
import { SupportedLanguageCode } from "./shopify/types";

export const getSupportedLanguageCodeFromLocale = (
  locale: Locale,
): SupportedLanguageCode => {
  switch (locale) {
    case "en":
      return "EN";
    case "fr":
      return "FR";
  }
};

export const combineProviders = (
  providers: FC<PropsWithChildren>[],
): FC<PropsWithChildren> => {
  return ({ children }) => {
    return providers.reduceRight((acc, curr) => {
      return createElement(curr, null, acc);
    }, children);
  };
};
