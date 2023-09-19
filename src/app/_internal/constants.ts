import { SectionsKey, SectionValue } from "./types";

export const SECTIONS: Map<SectionsKey, SectionValue> = new Map([
  [SectionsKey.HOME, { i18nKey: "home", url: "" }],
  [SectionsKey.SHOP, { i18nKey: "shop", url: "shop" }],
  [SectionsKey.ABOUT, { i18nKey: "about", url: "about" }],
]);
