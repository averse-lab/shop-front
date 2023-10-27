import { PageKey, PageValue } from "./types";

export const PAGES: Record<PageKey, PageValue> = {
  home: { i18nKey: "home", url: "" },
  shop: { i18nKey: "shop", url: "shop" },
  about: { i18nKey: "about", url: "about" },
  legalNotices: { i18nKey: "legalNotices", url: "legal-notices" },
  termsAndConditions: {
    i18nKey: "termsAndConditions",
    url: "terms-and-conditions",
  },
};
