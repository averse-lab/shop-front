import { FC } from "react";

import { cookies } from "next/headers";

import { getCart } from "@lib/shopify";
import { Cart } from "@lib/shopify/types";

import { CartWrapper } from "./CartWrapper/CartWrapper";

export const ShoppingCart: FC = async () => {
  const cartIdCookie = cookies().get("cartId");

  let cart: Cart | undefined;

  if (cartIdCookie !== undefined) {
    const cartId = cartIdCookie.value;
    cart = await getCart(cartId);
  }

  return <CartWrapper cart={cart} />;
};
