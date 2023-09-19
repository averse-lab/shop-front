import { CategoriesKey, CategoriesUrlSegment, CategoryValue } from "./types";

export const CATEGORIES: Map<CategoriesKey, CategoryValue> = new Map([
  [
    CategoriesKey.RINGS,
    { i18nKey: "rings", shopifyId: "rings", url: CategoriesUrlSegment.RINGS },
  ],
  [
    CategoriesKey.ALL_PRODUCTS,
    {
      i18nKey: "allProducts",
      shopifyId: "",
      url: CategoriesUrlSegment.ALL_PRODUCTS,
    },
  ],
  [
    CategoriesKey.NECKLACES,
    {
      i18nKey: "necklaces",
      shopifyId: "necklaces",
      url: CategoriesUrlSegment.NECKLACES,
    },
  ],
]);
