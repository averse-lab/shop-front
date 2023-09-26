import { FC } from "react";

import { cookies } from "next/headers";

import { Dictionary, Locale } from "@lib/i18n/types";
import { getCart } from "@lib/shopify";
import { Cart } from "@lib/shopify/types";

import { CartWrapper } from "./CartWrapper/CartWrapper";

type IProps = {
  dictionary: Dictionary;
  lang: Locale;
};

export const ShoppingCart: FC<IProps> = async (props) => {
  const { dictionary, lang } = props;

  const cartIdCookie = cookies().get("cartId");

  let cart: Cart | undefined;

  if (cartIdCookie !== undefined) {
    const cartId = cartIdCookie.value;
    cart = await getCart(cartId);
  }

  return <CartWrapper cart={cart} dictionary={dictionary} lang={lang} />;
};
