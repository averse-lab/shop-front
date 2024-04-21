import { Product } from "@lib/shopify/types";
import { NonNullablePick } from "@lib/types";

type ProductWithSingleAdditionalVideoProperties =
  | "firstAdditionalVideoID"
  | "firstAdditionalVideoWidthRatio"
  | "firstAdditionalVideoHeightRatio"
  | "firstAdditionalVideoDescription"
  | "additionalVideosLayout";

export type ProductWithSingleAdditionalVideo = Omit<
  Product,
  "customMetafields"
> & {
  customMetafields: NonNullablePick<
    Product["customMetafields"],
    ProductWithSingleAdditionalVideoProperties
  >;
};
