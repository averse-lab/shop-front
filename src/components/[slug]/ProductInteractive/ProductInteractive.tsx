"use client";

import { FC, useContext, useState, useTransition } from "react";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { Button } from "@components/Button/Button";
import { DropdownOption } from "@components/Dropdown/_internal/Dropdown.types";
import { Dropdown } from "@components/Dropdown/Dropdown";

import { Dictionary, Locale } from "@lib/i18n/types";
import { Product, ProductVariant } from "@lib/shopify/types";

import { CartContext } from "@contexts/CartContext/CartContext";

import { checkIsUniqueSize } from "./_internal/ProductInteractive.utils";
import { addItemAction } from "./_internal/ProductIntercative.actions";

type IProps = {
  variants: ProductVariant[];
  minVariantPrice: Product["priceRange"]["minVariantPrice"];
  dictionary: Dictionary;
  shippingDelays: string | null;
  lang: Locale;
};

export const ProductInteractive: FC<IProps> = (props) => {
  const { variants, minVariantPrice, dictionary, shippingDelays, lang } = props;

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const { setCart, setIsCartOpen } = useContext(CartContext) || {};

  const options = variants.map<DropdownOption>((variant) => ({
    value: variant.id,
    display: variant.title,
    disabled: !variant.availableForSale,
  }));

  const uniqueSize = checkIsUniqueSize(variants);

  const updateSelectedIndex = (newSelectedIndex: number) => {
    setSelectedIndex(newSelectedIndex);
  };

  const addToCart = () => {
    if (uniqueSize) {
      startTransition(async () => {
        const cart = await addItemAction(options[0].value);

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
    } else {
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
    }
  };

  return (
    <>
      <p className={clsx("mb-6", "font-light")}>
        {selectedIndex !== undefined
          ? `${Number(variants[selectedIndex].price.amount).toFixed()} ${
              variants[selectedIndex].price.currencyCode
            }`
          : `${Number(minVariantPrice.amount).toFixed()} ${
              minVariantPrice.currencyCode
            }`}
      </p>
      <div className={clsx("mb-7", "flex items-center justify-between gap-4")}>
        {uniqueSize ? (
          <p className='font-medium'>{dictionary.product.uniqueSize}</p>
        ) : (
          <Dropdown
            className={clsx("basis-1/2")}
            name='variant-selector'
            onChange={updateSelectedIndex}
            options={options}
            placeholder={dictionary.product.size}
            selectedIndex={selectedIndex}
          />
        )}

        {!uniqueSize ? (
          <a
            className={clsx("flex items-center gap-2")}
            href={`/manual/${lang}/manual.pdf`}
            rel='noopener noreferrer'
            target='_blank'
          >
            {dictionary.product.sizeGuide}
            <ArrowTopRightOnSquareIcon className='h-5 w-5 stroke-[1.75]' />
          </a>
        ) : null}
      </div>
      <Button
        className={clsx("w-full")}
        color='black'
        disabled={!uniqueSize && selectedIndex === undefined}
        element='button'
        loading={isPending}
        onClick={addToCart}
      >
        {dictionary.product.addToCart}
      </Button>
      <div className={clsx("mt-5", "flex items-center gap-4")}>
        <p>{dictionary.product.origin}</p>
        {selectedIndex !== undefined ? (
          <>
            <div
              className={clsx(
                "h-3 w-3",
                "flex-shrink-0",
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
          </>
        ) : null}
      </div>
    </>
  );
};
