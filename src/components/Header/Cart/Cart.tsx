"use client";

import { FC, use, useEffect, useRef } from "react";

import { RiCloseLine } from "@remixicon/react";
import { clsx } from "clsx";
import Link from "next/link";

import { Backdrop } from "@components/Backdrop";
import { Button } from "@components/ui/button";

import { useClickOutsideDetector } from "@lib/hooks";
import { Dictionary, Locale } from "@lib/i18n/types";

import { CartContext } from "@contexts/CartContext/CartContext";

import { getCartAction } from "./_internal/Cart.actions";
import s from "./_internal/Cart.module.scss";
import { CartButton } from "./CartButton/CartButton";
import { CartItem } from "./CartItem/CartItem";
import { SummaryItem } from "./SummaryItem/SummaryItem";

interface IProps {
  className?: string;
  dictionary: Dictionary;
  lang: Locale;
}

export const Cart: FC<IProps> = (props) => {
  const { dictionary, lang, className } = props;
  const { openCartAriaLabel, closeBurgerMenuAriaLabel } = dictionary.header;

  const { setCart, cart, cartOpen, setCartOpen } = use(CartContext);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!setCart) {
      return;
    }

    (async () => {
      setCart(await getCartAction());
    })();
  }, [setCart]);

  const openCart = () => {
    if (!setCartOpen) {
      return;
    }

    setCartOpen(true);
  };

  const closeCart = () => {
    if (!setCartOpen) {
      return;
    }

    setCartOpen(false);
  };

  const checkoutDisabled = cart === undefined || cart.totalQuantity === 0;

  useClickOutsideDetector(cartRef.current, closeCart, cartOpen);

  return (
    <>
      <Backdrop activate={cartOpen} />
      <CartButton
        ariaLabel={openCartAriaLabel}
        className={clsx(
          className,
          "lg:[&:hover+div]:translate-x-[calc(100%-8px)]",
          cartOpen && "lg:[&:hover+div]:!-translate-x-2",
        )}
        onClick={openCart}
        quantity={cart?.totalQuantity}
      />
      <div
        className={clsx(
          "fixed right-0 top-0 z-20 md:top-2",
          "h-dvh w-screen px-6 pb-4 pt-6 md:h-auto md:max-h-[70vh] md:w-[450px] md:p-6",
          "flex flex-col justify-between gap-6",
          "bg-secondary/40 backdrop-blur transition-all duration-500 ease-in-out md:rounded md:border md:border-border/20 md:shadow-lg",
          cartOpen ? "opacity-100 md:-translate-x-2" : "translate-x-full opacity-0",
        )}
        ref={cartRef}
      >
        <div className={clsx("flex flex-1 flex-col gap-6", "overflow-hidden")}>
          <Button
            aria-label={closeBurgerMenuAriaLabel}
            className={clsx("absolute left-6 top-6")}
            onClick={closeCart}
            size='icon'
            variant={"secondary-icon"}
          >
            <RiCloseLine size={20} />
          </Button>
          {cart !== undefined && cart.totalQuantity !== 0 && setCart !== undefined ? (
            <div
              className={clsx(
                s["cart__items-wrapper"],
                "mt-14",
                "flex flex-1 flex-col gap-4",
                "overflow-y-scroll",
              )}
            >
              {cart.lines.map((item) => (
                <CartItem
                  dictionary={dictionary}
                  item={item}
                  key={item.id}
                  lang={lang}
                  setCart={setCart}
                />
              ))}
            </div>
          ) : (
            <div className={clsx("flex flex-1 items-center justify-center")}>
              <p className={clsx("md:py-40", "md:mt-4", "text-secondary-foreground")}>
                {dictionary.cart.empty}
              </p>
            </div>
          )}
        </div>
        <div className={clsx("flex flex-col gap-6")}>
          {cart !== undefined ? (
            <div className={clsx("flex flex-col gap-4")}>
              <SummaryItem
                metric={dictionary.cart.shipping}
                value={dictionary.cart.shippingHint}
                variant='shipping'
              />
              <SummaryItem
                metric={dictionary.cart.total}
                value={`${cart.cost.totalAmount.amount}${" "}${cart.cost.totalAmount.currencyCode}`}
                variant='total'
              />
            </div>
          ) : null}
          <Button asChild className={clsx("w-full")} disabled={checkoutDisabled}>
            <Link href={cart?.checkoutUrl ?? ""}>{dictionary.cart.checkout}</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
