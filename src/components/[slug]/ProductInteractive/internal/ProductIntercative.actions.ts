"use server";

import { cookies } from "next/headers";

import { addToCart, createCart, getCart } from "@lib/shopify";
import { Cart } from "@lib/shopify/types";

export const addItemAction = async (
  variantId: string,
): Promise<Error | Cart> => {
  let cart: Cart | undefined;

  const cartIdCookie = cookies().get("cartId");

  if (cartIdCookie === undefined) {
    cart = await createCart();
  } else {
    cart = await getCart(cartIdCookie.value);
  }

  if (cart === undefined) {
    cart = await createCart();
  }

  cookies().set("cartId", cart.id);

  try {
    return await addToCart(cart.id, [
      { merchandiseId: variantId, quantity: 1 },
    ]);
  } catch (e) {
    return new Error("Error adding item", { cause: e });
  }
};
