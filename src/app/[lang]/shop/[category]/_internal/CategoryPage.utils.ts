import { Dictionary } from "@lib/i18n/types";

import { CATEGORIES } from "../../_internal/ShopPage.constants";

export const getMetadataTitle = (
  category: string,
  metadata: Dictionary["shop"]["metadata"],
): string => {
  switch (category) {
    case CATEGORIES.allProducts.url:
      return metadata.allProducts.title;
    case CATEGORIES.rings.url:
      return metadata.rings.title;
    case CATEGORIES.necklaces.url:
      return metadata.necklaces.title;
    default:
      return metadata.allProducts.title;
  }
};

export const getMetadataDescription = (
  category: string,
  metadata: Dictionary["shop"]["metadata"],
): string => {
  switch (category) {
    case CATEGORIES.allProducts.url:
      return metadata.allProducts.description;
    case CATEGORIES.rings.url:
      return metadata.rings.description;
    case CATEGORIES.necklaces.url:
      return metadata.necklaces.description;
    default:
      return metadata.allProducts.description;
  }
};

export const getMetadataTwitterDescription = (
  category: string,
  metadata: Dictionary["shop"]["metadata"],
): string => {
  switch (category) {
    case CATEGORIES.allProducts.url:
      return metadata.allProducts.description;
    case CATEGORIES.rings.url:
      return metadata.rings.description;
    case CATEGORIES.necklaces.url:
      return metadata.necklaces.description;
    default:
      return metadata.allProducts.description;
  }
};
