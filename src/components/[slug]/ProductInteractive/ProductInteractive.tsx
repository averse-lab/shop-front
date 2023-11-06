"use client";

import { FC, useContext, useState, useTransition } from "react";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";

import { Button } from "@components/Button/Button";
import { DropdownOption } from "@components/Dropdown/_internal/Dropdown.types";
import { Dropdown } from "@components/Dropdown/Dropdown";

import { Dictionary } from "@lib/i18n/types";
import { Product, ProductVariant } from "@lib/shopify/types";

import { CartContext } from "@contexts/CartContext/CartContext";

import { addItemAction } from "./_internal/ProductIntercative.actions";

type IProps = {
  variants: ProductVariant[];
  minVariantPrice: Product["priceRange"]["minVariantPrice"];
  dictionary: Dictionary;
  shippingDelays: string | null;
};

export const ProductInteractive: FC<IProps> = (props) => {
  const { variants, minVariantPrice, dictionary, shippingDelays } = props;

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const { setCart, setIsCartOpen } = useContext(CartContext) || {};

  const options = variants.map<DropdownOption>((variant) => ({
    value: variant.id,
    display: variant.title,
    disabled: !variant.availableForSale,
  }));

  const updateSelectedIndex = (newSelectedIndex: number) => {
    setSelectedIndex(newSelectedIndex);
  };

  const addToCart = () => {
    if (selectedIndex === undefined) {
      return;
    }

    startTransition(async () => {
      const cart = await addItemAction(options[selectedIndex].value);

      if (cart instanceof Error) {
        alert(cart);
        return;
      }

      if (setIsCartOpen === undefined || setCart === undefined) {
        return;
      }

      setIsCartOpen(true);
      setCart(cart);
    });
  };

  return (
    <>
      <p className={clsx("mb-6", "font-light")}>
        {selectedIndex !== undefined
          ? `${variants[selectedIndex].price.amount} ${variants[selectedIndex].price.currencyCode}`
          : `${minVariantPrice.amount} ${minVariantPrice.currencyCode}`}
      </p>
      <div className={clsx("mb-7", "flex items-center justify-between gap-4")}>
        <Dropdown
          className={clsx("basis-1/2")}
          name='variant-selector'
          onChange={updateSelectedIndex}
          options={options}
          placeholder={dictionary.product.size}
          selectedIndex={selectedIndex}
        />
        <Link
          className={clsx("flex items-center gap-2")}
          href={"#"}
          target='_blank'
        >
          {dictionary.product.sizeGuide}
          <ArrowTopRightOnSquareIcon className='h-5 w-5 stroke-[1.75]' />
        </Link>
      </div>
      <Button
        className={clsx("w-full")}
        disabled={selectedIndex === undefined}
        element='button'
        loading={isPending}
        onClick={addToCart}
      >
        {dictionary.product.addToCart}
      </Button>
      {selectedIndex !== undefined ? (
        <div className={clsx("mt-5", "flex items-center gap-4")}>
          <div
            className={clsx(
              "h-3 w-3",
              "flex-shrink-0",
              "rounded-full",
              variants[selectedIndex].currentlyNotInStock
                ? "bg-neutral-400"
                : "bg-green-600",
            )}
          ></div>
          <p className={clsx("italic")}>
            {variants[selectedIndex].currentlyNotInStock
              ? `${dictionary.product.madeToOrder} ${
                  shippingDelays
                    ? `${dictionary.product.notInStockCustom} ${shippingDelays}`
                    : dictionary.product.notInStock
                }`
              : dictionary.product.inStock}
          </p>
        </div>
      ) : null}
    </>
  );
};
