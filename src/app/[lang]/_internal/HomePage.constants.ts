import { PAGES } from "@lib/routing/constants";
import { PageValue } from "@lib/routing/types";
import { MuxVideoSource } from "@lib/types";

import { MainNavKey } from "./HomePage.types";

export const HOME_VIDEO: MuxVideoSource = {
  playbackId: "9NAAiw4fOQs02P00n7nSKuP1GEQfwrRipeVG2pgllB01WI",
  widthRatio: 16,
  heightRatio: 9,
};

export const MAIN_NAV: Record<MainNavKey, PageValue> = {
  home: PAGES.home,
  shop: PAGES.shop,
  about: PAGES.about,
};
