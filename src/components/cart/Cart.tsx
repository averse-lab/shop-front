import { getCart } from "@averse/lib/shopify";
import { cookies } from "next/headers";
import CartModal from "@averse/components/cart/CartModal";

export const Cart = async () => {
  const cartIdCookie = cookies().get("cartId");

  if (cartIdCookie === undefined) {
    return;
  }

  const cartId = cartIdCookie.value;

  const cart = await getCart(cartId);

  return <CartModal cart={cart} />;
};
