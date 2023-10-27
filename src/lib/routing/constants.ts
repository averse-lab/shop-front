import { PageKey, PageValue } from "./types";

export const PAGES: Record<PageKey, PageValue> = {
  home: { i18nKey: "home", url: "" },
  shop: { i18nKey: "shop", url: "shop" },
  about: { i18nKey: "about", url: "about" },
  legal: { i18nKey: "legal", url: "legal" },
  contact: { i18nKey: "contact", url: "contact" },
};
