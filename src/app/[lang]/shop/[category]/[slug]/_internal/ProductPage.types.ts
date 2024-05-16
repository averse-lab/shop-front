import { Product } from "@lib/shopify/types";
import { NonNullablePick } from "@lib/types";

type ProductWithSingleAdditionalVideoProperties =
  | "macroVideoId"
  | "additionalVideosLayout"
  | "additionalDescriptionVideoId"
  | "additionalDescription";

export type ProductWithSingleAdditionalVideo = Omit<Product, "customMetafields"> & {
  customMetafields: NonNullablePick<
    Product["customMetafields"],
    ProductWithSingleAdditionalVideoProperties
  >;
};
