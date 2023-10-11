"use client";

import { FC, useContext, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { CartContext } from "@averse/contexts/CartContext/CartContext";

import { Button } from "@components/Button/Button";

import { useLockBodyScroll } from "@lib/hooks";
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

  useEffect(() => {
    if (setCart === undefined) {
      return;
    }

    (async () => {
      setCart(await getCartAction());
    })();
  }, [setCart]);

  useLockBodyScroll(isCartOpen || false);

  const handleCartHintClick = () => {
    if (setIsCartOpen === undefined) {
      return;
    }

    setIsCartOpen(true);
  };

  const handleCloseClick = () => {
    if (setIsCartOpen === undefined) {
      return;
    }

    setIsCartOpen(false);
  };

  return (
    <>
      <CartButton
        className={clsx(s["cart__trigger"], className)}
        quantity={cart?.totalQuantity}
        onClick={handleCartHintClick}
      />
      <div
        className={clsx(
          s["cart__modal"],
          isCartOpen && s["cart__modal--open"],
          cart !== undefined && "gap-4",
          "fixed z-20 h-screen md:h-auto w-screen md:w-[450px] md:max-h-[70vh] md:min-h-[350px] top-0 md:top-2 right-0 md:right-2",
          "flex flex-col justify-between px-6 pb-4 pt-6 md:p-6",
          "bg-white border md:rounded",
        )}
      >
        <div className={`flex flex-col flex-1 gap-6 overflow-hidden`}>
          <XMarkIcon
            onClick={handleCloseClick}
            className={`w-6 h-6 cursor-pointer hover:stroke-2 hover:scale-105 transition-all shrink-0`}
          />
          {cart !== undefined &&
          cart.totalQuantity !== 0 &&
          setCart !== undefined ? (
            <div
              className={clsx(
                s["cart__items-wrapper"],
                "flex flex-col gap-4 flex-1 overflow-y-scroll",
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
            <div className='flex flex-1 justify-center items-center'>
              <p className='md:py-16'>{dictionary.cart.empty}</p>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-6'>
          {cart !== undefined ? (
            <div className='flex flex-col gap-4'>
              <SummaryItem
                metric={dictionary.cart.taxes}
                value={`${cart.cost.totalTaxAmount.amount}${" "}${
                  cart.cost.totalTaxAmount.currencyCode
                }`}
              />
              <SummaryItem
                className={s["cart__shipping-sumary"]}
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
            className='w-full'
            element='link'
            href={cart ? cart.checkoutUrl : ""}
            disabled={cart === undefined || cart.totalQuantity === 0}
          >
            {dictionary.cart.checkout}
          </Button>
        </div>
      </div>
    </>
  );
};
