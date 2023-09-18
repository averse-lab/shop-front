import { SectionsKey, SectionValue } from "./types";

export const SECTIONS: Map<SectionsKey, SectionValue> = new Map([
  [SectionsKey.HOME, { display: "Home", url: "" }],
  [SectionsKey.SHOP, { display: "Shop", url: "shop" }],
  [SectionsKey.ABOUT, { display: "About", url: "about" }],
]);
