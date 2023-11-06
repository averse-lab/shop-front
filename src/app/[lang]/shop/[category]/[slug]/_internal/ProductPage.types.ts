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

type ProductWithMultipleAdditionalVideosProperties =
  | "secondAdditionalVideoID"
  | "secondAdditionalVideoWidthRatio"
  | "secondAdditionalVideoHeightRatio"
  | "secondAdditionalVideoDescription";

export type ProductWithMultipleAdditionalVideos = Omit<
  Product,
  "customMetafields"
> & {
  customMetafields: Pick<
    ProductWithSingleAdditionalVideo["customMetafields"],
    ProductWithSingleAdditionalVideoProperties
  > &
    NonNullablePick<
      Product["customMetafields"],
      ProductWithMultipleAdditionalVideosProperties
    >;
};
