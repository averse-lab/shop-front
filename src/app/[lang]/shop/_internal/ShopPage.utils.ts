import { CATEGORIES } from "./ShopPage.constants";
import { CategoryValue } from "./ShopPage.types";

export const getCategoryFromCategoryUrlSegment = (
  categoryUrlSegment: string,
): CategoryValue | undefined => {
  return Object.values(CATEGORIES).find(
    (category) => category.url === categoryUrlSegment,
  );
};
