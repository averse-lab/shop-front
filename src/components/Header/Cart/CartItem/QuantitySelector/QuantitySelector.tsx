"use client";

import { FC, useTransition } from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { Spinner } from "@components/icons/Spinner/Spinner";

import { Cart } from "@lib/shopify/types";
import { StateSetter } from "@lib/types";

import {
  removeItem,
  updateItemQuantity,
} from "./_internal/QuantitySelector.actions";

type IProps = {
  quantity: number;
  lineId: string;
  variantId: string;
  setCart: StateSetter<Cart | undefined>;
};

export const QuantitySelector: FC<IProps> = (props) => {
  const { quantity, lineId, variantId, setCart } = props;

  const [isPending, startTransition] = useTransition();

  const addQuantity = () => {
    startTransition(async () => {
      const cart = await updateItemQuantity({
        lineId,
        variantId,
        quantity: quantity + 1,
      });

      if (cart instanceof Error) {
        alert(cart);
        return;
      }

      setCart(cart);
    });
  };

  const removeQuantity = () => {
    startTransition(async () => {
      let cart: Cart | Error;

      if (quantity === 1) {
        cart = await removeItem(lineId);
      } else {
        cart = await updateItemQuantity({
          lineId,
          variantId,
          quantity: quantity - 1,
        });
      }

      if (cart instanceof Error) {
        alert(cart);
        return;
      }

      setCart(cart);
    });
  };

  return (
    <div
      className={clsx(
        "min-h-[30px] px-2 py-1",
        "flex items-center gap-3",
        "border border-black",
      )}
    >
      <MinusIcon
        className={clsx(
          "h-4 w-4",
          "cursor-pointer transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-[1.75]",
        )}
        onClick={removeQuantity}
      />
      {isPending ? (
        <Spinner className={clsx("h-4 w-4")} />
      ) : (
        <p className={clsx("text-center font-serif text-sm", "min-w-[16px]")}>
          {quantity}
        </p>
      )}
      <PlusIcon
        className={clsx(
          "h-4 w-4",
          "cursor-pointer transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-[1.75]",
        )}
        onClick={addQuantity}
      />
    </div>
  );
};
