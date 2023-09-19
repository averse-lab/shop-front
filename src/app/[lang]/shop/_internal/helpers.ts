import { CategoriesKey, CategoriesUrlSegment } from "./types";

export const mapCategoryUrlSegmentToCategoryKey = (
  categoryUrlSegment: string,
): CategoriesKey | undefined => {
  switch (categoryUrlSegment) {
    case CategoriesUrlSegment.RINGS:
      return CategoriesKey.RINGS;
    case CategoriesUrlSegment.ALL_PRODUCTS:
      return CategoriesKey.ALL_PRODUCTS;
    case CategoriesUrlSegment.NECKLACES:
      return CategoriesKey.NECKLACES;
  }
};
