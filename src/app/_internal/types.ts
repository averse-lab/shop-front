export enum SectionsKey {
  HOME = "home",
  SHOP = "shop",
  ABOUT = "about",
}

export interface SectionValue {
  i18nKey: SectionsKey.HOME | SectionsKey.SHOP | SectionsKey.ABOUT;
  url: string;
}
