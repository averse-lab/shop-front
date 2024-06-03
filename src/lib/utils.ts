import { FC, PropsWithChildren, createElement } from "react";

import { MetadataRoute } from "next";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";

import { DICTIONARIES } from "./i18n/constants";
import { Locale } from "./i18n/types";
import { CATEGORIES } from "./routing/constants";
import { SupportedLanguageCode } from "./shopify/types";

export const getLocaleFromString = (string: string): Locale | undefined => {
  switch (string) {
    case "en":
      return string;
    case "fr":
      return string;
    default:
      return;
  }
};

export const getSupportedLanguageCodeFromLocale = (locale: Locale): SupportedLanguageCode => {
  switch (locale) {
    case "en":
      return "EN";
    case "fr":
      return "FR";
  }
};

export const combineProviders = (providers: FC<PropsWithChildren>[]): FC<PropsWithChildren> => {
  return ({ children }) => {
    return providers.reduceRight((acc, curr) => {
      return createElement(curr, null, acc);
    }, children);
  };
};

export const generateStaticPagesSitemapItems = (lang: Locale): MetadataRoute.Sitemap[0][] => {
  const shopCategoriesSitemapItems = Object.values(CATEGORIES).map<MetadataRoute.Sitemap[0]>(
    (category) => ({
      url: `${process.env.BASE_URL!}/${lang}/shop/${category.url}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

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

export const generateAlternates = (pathWithoutLang: string, lang: Locale): AlternateURLs => {
  const locales = Object.keys(DICTIONARIES) as Locale[];

  const languages: AlternateURLs["languages"] = locales.reduce<
    Record<Locale | "x-default", string>
  >(
    (languages, language) => {
      languages[language] = `${process.env.BASE_URL}/${language}${pathWithoutLang}`;

      return languages;
    },
    {
      "x-default": `${process.env.BASE_URL}/en${pathWithoutLang}`,
      en: "",
      fr: "",
    },
  );

  return {
    canonical: `${process.env.BASE_URL}/${lang}${pathWithoutLang}`,
    languages,
  };
};

export const formatPrice = (price: string, currency: string): string => {
  return `${Number(price).toFixed()} ${currency}`;
};

export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: NodeJS.Timeout | null;

  return (...args: Parameters<F>): ReturnType<F> | void => {
    const later = () => {
      if (!timeout) {
        return;
      }

      clearTimeout(timeout);
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
};

export const throttle = <F extends (...args: any[]) => any>(func: F, limit: number) => {
  let inThrottle = false;

  return (...args: Parameters<F>): ReturnType<F> | void => {
    if (!inThrottle) {
      func(...args);

      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// export const areRectsWithinBounds = (rect1: DOMRect, rect2: DOMRect): boolean => {
//   return (
//     rect1.left >= rect2.left &&
//     rect1.right <= rect2.right &&
//     rect1.top >= rect2.top &&
//     rect1.bottom <= rect2.bottom
//   );
// };
