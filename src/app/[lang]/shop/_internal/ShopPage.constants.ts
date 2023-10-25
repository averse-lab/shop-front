import { CategoryKey, CategoryValue } from "./ShopPage.types";

export const CATEGORIES: Record<CategoryKey, CategoryValue> = {
  rings: { i18nKey: "rings", shopifyId: "rings", url: "rings" },
  allProducts: {
    i18nKey: "allProducts",
    shopifyId: "",
    url: "all-products",
  },
  necklaces: {
    i18nKey: "necklaces",
    shopifyId: "necklaces",
    url: "necklaces",
  },
};
