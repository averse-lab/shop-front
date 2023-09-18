import { SECTIONS } from "@averse/app/_internal/constants";

export const MAIN_NAV = Array.from(SECTIONS, ([_, { i18nKey, url }]) => ({
  i18nKey,
  url,
}));
