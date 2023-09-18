import { CategoriesKey, CategoryValue } from "./types";

export const CATEGORIES: Map<CategoriesKey, CategoryValue> = new Map([
  [
    CategoriesKey.RINGS,
    { display: "Rings", id: "rings", url: CategoriesKey.RINGS },
  ],
  [
    CategoriesKey.ALL_PRODUCTS,
    { display: "All products", id: "", url: CategoriesKey.ALL_PRODUCTS },
  ],
  [
    CategoriesKey.NECKLACES,
    { display: "Necklaces", id: "necklaces", url: CategoriesKey.NECKLACES },
  ],
]);
