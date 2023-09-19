import { Dictionnary } from "@averse/lib/i18n/types";

export enum CategoriesKey {
  ALL_PRODUCTS = "all_products",
  RINGS = "rings",
  NECKLACES = "necklaces",
}

export enum CategoriesUrlSegment {
  ALL_PRODUCTS = "all_products",
  RINGS = "rings",
  NECKLACES = "necklaces",
}

export interface CategoryValue {
  i18nKey: keyof Dictionnary["categories"];
  shopifyId: string;
  url: string;
}
