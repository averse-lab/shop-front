import { PAGES } from "@lib/routing/constants";
import { PageValue } from "@lib/routing/types";

import { MainNavKey } from "./BurgerMenu.types";

export const MAIN_NAV: Record<MainNavKey, PageValue> = {
  home: PAGES.home,
  shop: PAGES.shop,
  about: PAGES.about,
  process: PAGES.process,
  materials: PAGES.materials,
};
