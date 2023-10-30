import { FC, PropsWithChildren, createElement } from "react";

import muxBlurHash from "@mux/blurhash";

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

export const getBlurHash = async (playbackId: string) => {
  const { blurHash, blurHashBase64, sourceWidth, sourceHeight } =
    await muxBlurHash(playbackId);

  return { blurHash, blurHashBase64, sourceWidth, sourceHeight };
};
