import { PageKey, PageValue } from "./types";

export const PAGES: Record<PageKey, PageValue> = {
  home: { i18nKey: "home", url: "" },
  shop: { i18nKey: "shop", url: "shop" },
  about: { i18nKey: "about", url: "about" },
  termsOfSale: { i18nKey: "termsOfSale", url: "legal/terms-of-sale" },
  legalNotice: { i18nKey: "legalNotice", url: "legal/legal-notice" },
  privacyPolicy: {
    i18nKey: "privacyPolicy",
    url: "legal/privacy-policy",
  },
};
