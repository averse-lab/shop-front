"use client";

import { FC, useEffect } from "react";

import { useConsent } from "@lib/hooks";
import { getPixelContentId, trackPixelEvent } from "@lib/meta-pixel";
import { Money } from "@lib/shopify/types";

type IProps = {
  productId: string;
  title: string;
  price: Money;
};

export const ProductViewTracker: FC<IProps> = (props) => {
  const { productId, title, price } = props;
  const { amount, currencyCode } = price;

  const consent = useConsent();

  // Depends on consent so a visitor who accepts while on the product page is still counted.
  useEffect(() => {
    if (consent !== "granted") {
      return;
    }

    trackPixelEvent("ViewContent", {
      content_ids: [getPixelContentId(productId)],
      content_type: "product_group",
      content_name: title,
      value: Number(amount),
      currency: currencyCode,
    });
  }, [consent, productId, title, amount, currencyCode]);

  return null;
};
