import { getCart } from "@averse/lib/shopify";
import { cookies } from "next/headers";
import CartModal from "./CartModal";
import { CartHint } from "./_internal/components";

export const Cart = async () => {
  const cartIdCookie = cookies().get("cartId");

  if (cartIdCookie === undefined) {
    return <CartHint className='justify-self-end' />;
  }

  const cartId = cartIdCookie.value;

  const cart = await getCart(cartId);

  if (cart === undefined) {
    return <CartHint className='justify-self-end' />;
  }

  return <CartModal cart={cart} />;
};
