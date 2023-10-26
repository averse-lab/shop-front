"use client";

import { FC, useContext, useEffect, useRef } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { CartContext } from "@averse/contexts/CartContext/CartContext";

import { Button } from "@components/Button/Button";

import { useClickOutsideDetector, useBodyScrollLocker } from "@lib/hooks";
import { Dictionary, Locale } from "@lib/i18n/types";

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

  const { setCart, cart, isCartOpen, setIsCartOpen } =
    useContext(CartContext) || {};
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (setCart === undefined) {
      return;
    }

    (async () => {
      setCart(await getCartAction());
    })();
  }, [setCart]);

  const openCart = () => {
    if (setIsCartOpen === undefined) {
      return;
    }

    setIsCartOpen(true);
  };

  const closeCart = () => {
    if (setIsCartOpen === undefined) {
      return;
    }

    setIsCartOpen(false);
  };

  const checkoutDisabled = cart === undefined || cart.totalQuantity === 0;

  useBodyScrollLocker(isCartOpen || false);
  useClickOutsideDetector(cartRef.current, closeCart, isCartOpen || false);

  return (
    <>
      <CartButton
        className={clsx(className, s["cart__trigger"])}
        quantity={cart?.totalQuantity}
        onClick={openCart}
      />
      <div
        ref={cartRef}
        className={clsx(
          s["cart__modal"],
          isCartOpen && s["cart__modal--open"],
          cart !== undefined && "gap-4",
          "fixed right-0 top-0 z-20 md:right-2 md:top-2",
          "h-screen w-screen px-6 pb-4 pt-6 md:h-auto md:max-h-[70vh] md:min-h-[350px] md:w-[450px] md:p-6",
          "flex flex-col justify-between",
          "bg-white md:rounded md:border md:border-neutral-100 md:shadow-md",
        )}
      >
        <div className={clsx("flex flex-1 flex-col gap-6", "overflow-hidden")}>
          <button
            className={clsx(
              s["cart__close-btn"],
              "p-2 lg:p-1",
              "shrink-0 self-start",
              "rounded-full bg-neutral-100 transition-all duration-200 ease-out lg:bg-transparent lg:hover:bg-neutral-100",
            )}
          >
            <XMarkIcon
              onClick={closeCart}
              className={clsx(
                "h-6 w-6",
                "transition-all duration-200 ease-out",
              )}
            />
          </button>
          {cart !== undefined &&
          cart.totalQuantity !== 0 &&
          setCart !== undefined ? (
            <div
              className={clsx(
                s["cart__items-wrapper"],
                "flex flex-1 flex-col gap-4",
                "overflow-y-scroll",
              )}
            >
              {cart.lines.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  lang={lang}
                  setCart={setCart}
                />
              ))}
            </div>
          ) : (
            <div className={clsx("flex flex-1 items-center justify-center")}>
              <p className={clsx('md:py-16", "text-neutral-600')}>
                {dictionary.cart.empty}
              </p>
            </div>
          )}
        </div>
        <div className={clsx("flex flex-col gap-6")}>
          {cart !== undefined ? (
            <div className={clsx("flex flex-col gap-4")}>
              <SummaryItem
                metric={dictionary.cart.taxes}
                value={`${cart.cost.totalTaxAmount.amount}${" "}${
                  cart.cost.totalTaxAmount.currencyCode
                }`}
              />
              <SummaryItem
                className={clsx(s["cart__shipping-sumary"])}
                metric={dictionary.cart.shipping}
                value={dictionary.cart.shippingHint}
              />
              <SummaryItem
                metric={dictionary.cart.total}
                value={`${cart.cost.totalAmount.amount}${" "}${
                  cart.cost.totalAmount.currencyCode
                }`}
              />
            </div>
          ) : null}
          <Button
            className={clsx("w-full")}
            element='link'
            href={!checkoutDisabled ? cart.checkoutUrl : ""}
            disabled={checkoutDisabled}
          >
            {dictionary.cart.checkout}
          </Button>
        </div>
      </div>
    </>
  );
};
