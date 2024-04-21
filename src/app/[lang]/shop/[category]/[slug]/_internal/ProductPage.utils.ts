import { Product } from "@lib/shopify/types";

import { ProductWithSingleAdditionalVideo } from "./ProductPage.types";

export const isProductWithSingleAdditionalVideo = (
  product: Product,
): product is ProductWithSingleAdditionalVideo => {
  return (
    product.customMetafields.firstAdditionalVideoID !== null &&
    product.customMetafields.firstAdditionalVideoWidthRatio !== null &&
    product.customMetafields.firstAdditionalVideoHeightRatio !== null &&
    product.customMetafields.firstAdditionalVideoDescription !== null &&
    product.customMetafields.additionalVideosLayout !== null
  );
};
