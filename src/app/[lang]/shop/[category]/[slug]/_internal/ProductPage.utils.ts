import { Product } from "@lib/shopify/types";

import {
  ProductWithMultipleAdditionalVideos,
  ProductWithSingleAdditionalVideo,
} from "./ProductPage.types";

export const isProductWithSingleAdditionalVideo = (
  product: any,
): product is ProductWithSingleAdditionalVideo => {
  return (
    product.firstAdditionalVideoID !== null &&
    product.firstAdditionalVideoWidthRatio !== null &&
    product.firstAdditionalVideoHeightRatio !== null &&
    product.firstAdditionalVideoDescription !== null &&
    product.additionalVideosLayout !== null
  );
};

export const isProductWithMultipleAdditionalVideos = (
  product: Product,
): product is ProductWithMultipleAdditionalVideos => {
  return (
    product.secondAdditionalVideoID !== null &&
    product.secondAdditionalVideoWidthRatio !== null &&
    product.secondAdditionalVideoHeightRatio !== null &&
    product.secondAdditionalVideoDescription !== null
  );
};
