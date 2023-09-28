"use server";

import { cookies } from "next/headers";

import { getCart } from "@lib/shopify";
import { Cart } from "@lib/shopify/types";

export const getCartAction = async (): Promise<Cart | undefined> => {
  const cartIdCookie = cookies().get("cartId");

  if (cartIdCookie === undefined) {
    return;
  }

  return getCart(cartIdCookie.value);
};
