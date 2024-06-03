"use client";

import { FC, useTransition } from "react";

import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { clsx } from "clsx";

import { Spinner } from "@components/icons/Spinner/Spinner";
import { Button } from "@components/ui/button";

import { Cart } from "@lib/shopify/types";
import { StateSetter } from "@lib/types";

import { removeItem, updateItemQuantity } from "./_internal/QuantitySelector.actions";

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
    <div className={clsx("min-h-[30px]", "flex items-center gap-3")}>
      <Button
        className={clsx("[&:hover>svg]:text-primary-foreground/80")}
        onClick={removeQuantity}
        size='icon'
        variant='default-icon'
      >
        <RiSubtractLine className={clsx("transition-all", "text-primary-foreground/60")} />
      </Button>
      {isPending ? (
        <Spinner className={clsx("h-4 w-4")} />
      ) : (
        <p className={clsx("text-center text-sm", "min-w-[16px]")}>{quantity}</p>
      )}
      <Button
        className={clsx("[&:hover>svg]:text-primary-foreground/80")}
        onClick={addQuantity}
        size='icon'
        variant='default-icon'
      >
        <RiAddLine className={clsx("transition-all", "text-primary-foreground/60")} />
      </Button>
    </div>
  );
};
