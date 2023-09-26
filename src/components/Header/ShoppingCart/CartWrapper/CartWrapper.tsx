"use client";

import { FC, useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { Button } from "@components/Button/Button";

import { useLockBodyScroll } from "@lib/hooks";
import { Dictionary, Locale } from "@lib/i18n/types";
import { Cart } from "@lib/shopify/types";

import s from "./_internal/CartWrapper.module.scss";
import { AmountSummary } from "./AmountSummary/AmountSummary";
import { CartItem } from "./CartItem/CartItem";
import { CartHint } from "../CartHint/CartHint";

interface IProps {
  cart: Cart | undefined;
  dictionary: Dictionary;
  lang: Locale;
}

export const CartWrapper: FC<IProps> = (props) => {
  const { cart: cartDefault, dictionary, lang } = props;

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Cart | undefined>(cartDefault);

  useLockBodyScroll(open);

  const handleCartHintClick = () => {
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  return (
    <>
      <CartHint
        className={`${s["cart-wrapper__trigger"]} justify-self-end`}
        quantity={cart?.totalQuantity}
        onClick={handleCartHintClick}
      />
      <div
        className={`${s["cart-wrapper__modal"]} ${
          open ? s["cart-wrapper__modal--open"] : ""
        } ${
          cart !== undefined ? "gap-4" : ""
        } fixed flex flex-col justify-between z-20 bg-white border h-full md:h-auto w-full md:w-[400px] md:max-h-[60vh] md:min-h-[350px] top-0 md:top-2 right-0 md:right-2 md:rounded p-6`}
      >
        <div className={`flex flex-col flex-1 gap-6`}>
          <XMarkIcon
            onClick={handleCloseClick}
            className={`${s["cart-wrapper__close"]} w-6 h-6 cursor-pointer`}
          />
          {cart !== undefined ? (
            <div className='flex flex-col gap-4 flex-1 overflow-y-scroll'>
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
              <p>{dictionary.cart.empty}</p>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          {cart !== undefined ? (
            <div className='flex flex-col gap-2'>
              <AmountSummary
                metric={dictionary.cart.taxes}
                value={`${cart.cost.totalTaxAmount.amount}${" "}${
                  cart.cost.totalTaxAmount.currencyCode
                }`}
              />
              <AmountSummary
                metric={dictionary.cart.shipping}
                value={dictionary.cart.shippingHint}
              />
              <AmountSummary
                metric={dictionary.cart.total}
                value={`${cart.cost.totalAmount.amount}${" "}${
                  cart.cost.totalAmount.currencyCode
                }`}
              />
            </div>
          ) : null}
          <Button className='w-full' element='button' onClick={() => {}}>
            {dictionary.cart.checkout}
          </Button>
        </div>
      </div>
    </>
  );
};
