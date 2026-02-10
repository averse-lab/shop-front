import { CategoryKey, CategoryValue, PageKey, PageValue } from "./types";

export const PAGES: Record<PageKey, PageValue> = {
  home: { i18nKey: "home", url: "" },
  shop: { i18nKey: "shop", url: "shop" },
  about: { i18nKey: "about", url: "about" },
  process: { i18nKey: "process", url: "process" },
  materials: { i18nKey: "materials", url: "materials" },
  maintenance: { i18nKey: "maintenance", url: "maintenance" },
  termsOfSale: { i18nKey: "termsOfSale", url: "legal/terms-of-sale" },
  legalNotice: { i18nKey: "legalNotice", url: "legal/legal-notice" },
  privacyPolicy: {
    i18nKey: "privacyPolicy",
    url: "legal/privacy-policy",
  },
  contact: { i18nKey: "contact", url: "contact" },
};

export const CATEGORIES: Record<CategoryKey, CategoryValue> = {
  allProducts: {
    i18nKey: "allProducts",
    shopifyId: "",
    url: "all-products",
  },
  rings: { i18nKey: "rings", shopifyId: "rings", url: "rings" },
  necklaces: {
    i18nKey: "necklaces",
    shopifyId: "necklaces",
    url: "necklaces",
  },
  bracelets: {
    i18nKey: "bracelets",
    shopifyId: "bracelets",
    url: "bracelets",
  },
};

export const PUBLIC_PATHS: string[] = ["/images", "/robots.txt", "/sitemap.xml", "/UI"];
