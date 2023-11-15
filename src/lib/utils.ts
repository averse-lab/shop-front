import { FC, PropsWithChildren, createElement } from "react";

import muxBlurHash from "@mux/blurhash";
import { MetadataRoute } from "next";

import { Locale } from "./i18n/types";
import { CATEGORIES } from "./routing/constants";
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

export const generateStaticPagesSitemapItems = (
  lang: Locale,
): MetadataRoute.Sitemap[0][] => {
  const shopCategoriesSitemapItems = Object.values(CATEGORIES).map<
    MetadataRoute.Sitemap[0]
  >((category) => ({
    url: `${process.env.BASE_URL!}/${lang}/shop/${category.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.BASE_URL!}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL!}/${lang}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...shopCategoriesSitemapItems,
    {
      url: `${process.env.BASE_URL!}/${lang}/legal/terms-of-sale`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${process.env.BASE_URL!}/fr/legal/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${process.env.BASE_URL!}/fr/legal/legal-notice`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
};
