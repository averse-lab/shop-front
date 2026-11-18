"use client";

import { FC, useState, useTransition } from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { Spinner } from "@components/icons/Spinner/Spinner";

import { Dictionary } from "@lib/i18n/types";
import { Cart } from "@lib/shopify/types";
import { StateSetter } from "@lib/types";

import { removeItem, updateItemQuantity } from "./_internal/QuantitySelector.actions";

type IProps = {
  quantity: number;
  lineId: string;
  variantId: string;
  setCart: StateSetter<Cart | undefined>;
  dictionary: Dictionary;
};

const BTN_CLASSES = clsx(
  "h-11 w-11 lg:h-7 lg:w-7",
  "flex items-center justify-center",
  "text-white disabled:opacity-50",
  "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:ease-out",
  "lg:hover:[&>svg]:scale-105 lg:hover:[&>svg]:stroke-[1.75]",
);

export const QuantitySelector: FC<IProps> = (props) => {
  const { quantity, lineId, variantId, setCart, dictionary } = props;
  const { decreaseQuantity, increaseQuantity, error: errorMessage } = dictionary.cart;

  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

  const changeQuantity = (newQuantity: number) => {
    startTransition(async () => {
      const cart =
        newQuantity === 0
          ? await removeItem(lineId)
          : await updateItemQuantity({ lineId, variantId, quantity: newQuantity });

      if (cart instanceof Error) {
        setHasError(true);
        return;
      }

      setHasError(false);
      setCart(cart);
    });
  };

  return (
    <div className={clsx("flex flex-col items-start gap-1")}>
      <div className={clsx("flex items-center", "border border-white")}>
        <button
          aria-label={decreaseQuantity}
          className={BTN_CLASSES}
          disabled={isPending}
          onClick={() => changeQuantity(quantity - 1)}
          type='button'
        >
          <MinusIcon />
        </button>
        {isPending ? (
          <Spinner className={clsx("h-4 w-4")} />
        ) : (
          <p className={clsx("text-center font-abhaya text-sm text-white", "min-w-[16px]")}>
            {quantity}
          </p>
        )}
        <button
          aria-label={increaseQuantity}
          className={BTN_CLASSES}
          disabled={isPending}
          onClick={() => changeQuantity(quantity + 1)}
          type='button'
        >
          <PlusIcon />
        </button>
      </div>
      {hasError ? (
        <p className={clsx("font-abhaya text-sm text-white")} role='alert'>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
