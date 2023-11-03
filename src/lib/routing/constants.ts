import { CategoryKey, CategoryValue, PageKey, PageValue } from "./types";

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

export const CATEGORIES: Record<CategoryKey, CategoryValue> = {
  rings: { i18nKey: "rings", shopifyId: "rings", url: "rings" },
  allProducts: {
    i18nKey: "allProducts",
    shopifyId: "",
    url: "all-products",
  },
  necklaces: {
    i18nKey: "necklaces",
    shopifyId: "necklaces",
    url: "necklaces",
  },
};
