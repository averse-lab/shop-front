"use client";

import { FC, use, useState, useTransition } from "react";

import { RiExternalLinkLine, RiLoader5Line } from "@remixicon/react";
import { clsx } from "clsx";

import { checkIsUniqueSize } from "@components/[slug]/ProductInteractive/_internal/ProductInteractive.utils";
import { addItemAction } from "@components/[slug]/ProductInteractive/_internal/ProductIntercative.actions";
import { DropdownOption } from "@components/Dropdown/_internal/Dropdown.types";
import { Dropdown } from "@components/Dropdown/Dropdown";
import { Button } from "@components/ui/button";

import { Dictionary, Locale } from "@lib/i18n/types";
import { Product, ProductVariant } from "@lib/shopify/types";
import { formatPrice } from "@lib/utils";

import { CartContext } from "@contexts/CartContext/CartContext";

import { AvailabilityIndicator } from "./AvailabilityIndicator";

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
      <p className={clsx("text-sm font-light", "mb-6")}>{formatPrice(amount, currency)}</p>
      <div
        className={clsx(
          "mb-8",
          "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
        )}
      >
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
            <RiExternalLinkLine size={20} />
          </a>
        ) : null}
      </div>
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
          // inStock={!variants[selectedIndex].currentlyNotInStock}
          inStock={true}
          shippingDelays={shippingDelays}
        />
      ) : null}
    </>
  );
};
