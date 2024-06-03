import { Product } from "@lib/shopify/types";

import { ProductWithSingleAdditionalVideo } from "./ProductPage.types";

export const isProductWithSingleAdditionalVideo = (
  product: Product,
): product is ProductWithSingleAdditionalVideo => {
  return (
    product.customMetafields.additionalVideosLayout !== null &&
    product.customMetafields.additionalDescriptionVideoId !== null &&
    product.customMetafields.additionalDescription !== null
  );
};
