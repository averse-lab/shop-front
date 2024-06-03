import { ProductVariant } from "@lib/shopify/types";

export const checkIsUniqueSize = (variants: ProductVariant[]): boolean => {
  return (
    variants.length === 1 &&
    variants[0].selectedOptions.length === 1 &&
    variants[0].selectedOptions[0].name === "Title"
  );
};
