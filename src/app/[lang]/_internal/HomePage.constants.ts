import { MuxVideoSource } from "@lib/types";

import { SectionKey, SectionValue } from "./HomePage.types";

export const HOME_VIDEO: MuxVideoSource = {
  playbackId: "9NAAiw4fOQs02P00n7nSKuP1GEQfwrRipeVG2pgllB01WI",
  widthRatio: 16,
  heightRatio: 9,
};

export const SECTIONS: Record<SectionKey, SectionValue> = {
  home: { i18nKey: "home", url: "" },
  shop: { i18nKey: "shop", url: "shop" },
  about: { i18nKey: "about", url: "about" },
};
