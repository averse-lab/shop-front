import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";

export const MAIN_NAV = Array.from(SECTIONS, ([_, { i18nKey, url }]) => ({
  i18nKey,
  url,
}));
