import { CATEGORIES } from "@lib/routing/constants";
import { CategoryValue } from "@lib/routing/types";

export const getCategoryFromCategoryUrlSegment = (
  categoryUrlSegment: string,
): CategoryValue | undefined => {
  return Object.values(CATEGORIES).find(
    (category) => category.url === categoryUrlSegment,
  );
};
