"use server";

import { cookies } from "next/headers";

import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@lib/shopify";
import { Cart } from "@lib/shopify/types";

export const addItem = async (variantId: string): Promise<Error | Cart> => {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }

  try {
    return await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
  } catch (e) {
    return new Error("Error adding item", { cause: e });
  }
};

export const removeItem = async (lineId: string): Promise<Error | Cart> => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return new Error("Missing cartId");
  }
  try {
    return await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return new Error("Error removing item", { cause: e });
  }
};

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity,
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<Error | Cart> => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return new Error("Missing cartId");
  }
  try {
    return await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);
  } catch (e) {
    return new Error("Error updating item quantity", { cause: e });
  }
};
