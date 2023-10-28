import { PageKey, PageValue } from "./types";

export const PAGES: Record<PageKey, PageValue> = {
  home: { i18nKey: "home", url: "" },
  shop: { i18nKey: "shop", url: "shop" },
  about: { i18nKey: "about", url: "about" },
  termsOfService: { i18nKey: "termsOfService", url: "legal/terms-of-service" },
  privacyPolicy: {
    i18nKey: "privacyPolicy",
    url: "legal/privacy-policy",
  },
};
