"use client";

import { FC, use, useState, useTransition } from "react";

import { RiLoader5Line } from "@remixicon/react";
import { clsx } from "clsx";

import { DropdownOption } from "@components/Dropdown/_internal/Dropdown.types";
import { Dropdown } from "@components/Dropdown/Dropdown";
import { Spinner } from "@components/icons/Spinner/Spinner";
import { Button } from "@components/ui/button";

import { Dictionary } from "@lib/i18n/types";
import { Product, ProductVariant } from "@lib/shopify/types";
import { formatPrice } from "@lib/utils";

import { CartContext } from "@contexts/CartContext/CartContext";

import { AvailabilityIndicator } from "./AvailabilityIndicator";
import { checkIsUniqueSize } from "./internal/ProductInteractive.utils";
import { addItemAction } from "./internal/ProductIntercative.actions";

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
  const { setCart, setCartOpen } = use(CartContext) || {};

  const options = variants.map<DropdownOption>((variant) => ({
    value: variant.id,
    display: variant.title,
    disabled: !variant.availableForSale,
  }));

  const uniqueSize = checkIsUniqueSize(variants);
  const amount =
    selectedIndex !== undefined ? variants[selectedIndex].price.amount : minVariantPrice.amount;
  const currency =
    selectedIndex !== undefined
      ? variants[selectedIndex].price.currencyCode
      : minVariantPrice.currencyCode;

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

        if (!setCartOpen || !setCart) {
          return;
        }

        setCartOpen(true);
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

        if (!setCartOpen || !setCart) {
          return;
        }

        setCartOpen(true);
        setCart(cart);
      });
    }
  };

  return (
    <>
      <p className={clsx("font-light")}>{formatPrice(amount, currency)}</p>
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
      </div>
      {/* <Button
        className={clsx("w-full")}
        color='black'
        disabled={!uniqueSize && selectedIndex === undefined}
        element='button'
        loading={isPending}
        onClick={addToCart}
      >
        {dictionary.product.addToCart}
      </Button> */}
      <Button
        className={clsx("w-full", "gap-2")}
        disabled={!uniqueSize && selectedIndex === undefined}
        onClick={addToCart}
      >
        {isPending ? (
          <>
            {dictionary.product.addingToCart}
            <RiLoader5Line className={clsx("animate-spin")} />
          </>
        ) : (
          dictionary.product.addToCart
        )}
      </Button>
      {selectedIndex !== undefined ? (
        <AvailabilityIndicator
          dictionary={dictionary}
          inStock={!variants[selectedIndex].currentlyNotInStock}
          shippingDelays={shippingDelays}
        />
      ) : null}
    </>
  );
};
