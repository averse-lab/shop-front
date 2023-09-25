import { MuxVideoSource } from "@lib/types";

import { SectionsKey, SectionValue } from "./HomePage.types";

export const HOME_VIDEO: MuxVideoSource = {
  playbackId: "9NAAiw4fOQs02P00n7nSKuP1GEQfwrRipeVG2pgllB01WI",
  aspectRatio: "16 / 9",
};

export const SECTIONS: Map<SectionsKey, SectionValue> = new Map([
  [SectionsKey.HOME, { i18nKey: "home", url: "" }],
  [SectionsKey.SHOP, { i18nKey: "shop", url: "shop" }],
  [SectionsKey.ABOUT, { i18nKey: "about", url: "about" }],
]);
