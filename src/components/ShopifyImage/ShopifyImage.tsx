"use client";

import { FC } from "react";

import Image, { ImageLoader, ImageProps } from "next/image";

// Shopify's CDN resizes and picks the format itself, so these images skip Vercel Image Optimization.
const shopifyLoader: ImageLoader = ({ src, width }) => {
  if (!src) return src;

  const url = new URL(src);

  url.searchParams.set("width", String(width));

  return url.toString();
};

export const ShopifyImage: FC<Omit<ImageProps, "loader">> = (props) => (
  <Image {...props} loader={shopifyLoader} />
);
