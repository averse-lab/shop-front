import { Dictionary } from "@lib/i18n/types";

export enum SectionsKey {
  HOME = "home",
  SHOP = "shop",
  ABOUT = "about",
}

export interface SectionValue {
  i18nKey: keyof Dictionary["menu"];
  url: string;
}
