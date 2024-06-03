"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

import { Cart } from "@lib/shopify/types";
import { StateSetter } from "@lib/types";

type ContextValue = {
  cart: Cart | undefined;
  setCart: StateSetter<Cart | undefined> | undefined;
  cartOpen: boolean;
  setCartOpen: StateSetter<boolean> | undefined;
};

const init: ContextValue = {
  cart: undefined,
  setCart: undefined,
  cartOpen: false,
  setCartOpen: undefined,
};

export const CartContext = createContext<ContextValue>(init);

export const CartContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [cart, setCart] = useState<ContextValue["cart"]>(init.cart);
  const [cartOpen, setCartOpen] = useState<ContextValue["cartOpen"]>(init.cartOpen);

  const contextValue: ContextValue = {
    cart,
    setCart,
    cartOpen,
    setCartOpen,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
