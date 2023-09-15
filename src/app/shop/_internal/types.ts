export enum CategoriesKey {
  ALL_PRODUCTS = "all_products",
  RINGS = "rings",
  NECKLACES = "necklaces",
}

export interface CategoryValue {
  display: string;
  id: string;
  url: string;
}
