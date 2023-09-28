"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

import { Cart } from "@lib/shopify/types";
import { StateSetter } from "@lib/types";

type CartContextValue = {
  cart: Cart | undefined;
  setCart: StateSetter<Cart | undefined>;
  isCartOpen: boolean;
  setIsCartOpen: StateSetter<boolean>;
};

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

export const CartContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [cart, setCart] = useState<Cart>();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const contextValue: CartContextValue = {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
