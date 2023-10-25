import { Product } from "@lib/shopify/types";
import { NonNullablePick } from "@lib/types";

export type ProductWithSingleAdditionalVideo = NonNullablePick<
  Product,
  | "firstAdditionalVideoID"
  | "firstAdditionalVideoWidthRatio"
  | "firstAdditionalVideoHeightRatio"
  | "firstAdditionalVideoDescription"
  | "additionalVideosLayout"
>;

export type ProductWithMultipleAdditionalVideos = NonNullablePick<
  ProductWithSingleAdditionalVideo,
  | "secondAdditionalVideoID"
  | "secondAdditionalVideoWidthRatio"
  | "secondAdditionalVideoHeightRatio"
  | "secondAdditionalVideoDescription"
>;
