import { CategoriesKey, CategoriesUrlSegment, CategoryValue } from "./types";

export const CATEGORIES: Map<CategoriesKey, CategoryValue> = new Map([
  [
    CategoriesKey.RINGS,
    { display: "Rings", shopifyId: "rings", url: CategoriesUrlSegment.RINGS },
  ],
  [
    CategoriesKey.ALL_PRODUCTS,
    {
      display: "All products",
      shopifyId: "",
      url: CategoriesUrlSegment.ALL_PRODUCTS,
    },
  ],
  [
    CategoriesKey.NECKLACES,
    {
      display: "Necklaces",
      shopifyId: "necklaces",
      url: CategoriesUrlSegment.NECKLACES,
    },
  ],
]);
