import { SectionsKey, SectionValue } from "./types";

export const SECTIONS: Map<SectionsKey, SectionValue> = new Map([
  [SectionsKey.HOME, { i18nKey: SectionsKey.HOME, url: "" }],
  [SectionsKey.SHOP, { i18nKey: SectionsKey.SHOP, url: "shop" }],
  [SectionsKey.ABOUT, { i18nKey: SectionsKey.ABOUT, url: "about" }],
]);
