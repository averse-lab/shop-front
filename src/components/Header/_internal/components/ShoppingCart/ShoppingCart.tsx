import { FC } from "react";
import { CartWrapper } from "./_internal/components/CartWrapper/CartWrapper";
import { cookies } from "next/headers";
import { Cart } from "@averse/lib/shopify/types";
import { getCart } from "@averse/lib/shopify";

export const ShoppingCart: FC = async () => {
  const cartIdCookie = cookies().get("cartId");

  let cart: Cart | undefined;

  if (cartIdCookie !== undefined) {
    const cartId = cartIdCookie.value;
    cart = await getCart(cartId);
  }

  return <></>;

  return <CartWrapper cart={cart} />;
};
