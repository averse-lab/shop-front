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
  display: string;
  shopifyId: string;
  url: string;
}
