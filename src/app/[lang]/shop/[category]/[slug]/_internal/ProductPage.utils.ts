import { Product } from "@lib/shopify/types";

import {
  ProductWithMultipleAdditionalVideos,
  ProductWithSingleAdditionalVideo,
} from "./ProductPage.types";

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

export const isProductWithMultipleAdditionalVideos = (
  product: Product,
): product is ProductWithMultipleAdditionalVideos => {
  return (
    product.customMetafields.secondAdditionalVideoID !== null &&
    product.customMetafields.secondAdditionalVideoWidthRatio !== null &&
    product.customMetafields.secondAdditionalVideoHeightRatio !== null &&
    product.customMetafields.secondAdditionalVideoDescription !== null
  );
};
