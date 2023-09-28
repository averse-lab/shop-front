"use server";

import { getCart } from "@lib/shopify";

type getAndSetCartParams = {
  cartId: string;
};

export const getCartAction = async (params: getAndSetCartParams) => {
  const { cartId } = params;

  return getCart(cartId);
};
