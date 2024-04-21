import { Product } from "@lib/shopify/types";

export type Animation = {
  playbackId: string;
  gridIndex: number | undefined;
  gridDesktopIndex: number | undefined;
};

export type ProductWithPlaceholder = Product & {
  placeholder: string;
};
