import { SECTIONS } from "@averse/app/_internal/constants";

export const MAIN_NAV = Array.from(SECTIONS, ([_, value]) => ({
  display: value.display,
  url: value.url,
}));
