import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";

import { Locale } from "@lib/i18n/types";
import { Cart, CartItem as ShopifyCartItem } from "@lib/shopify/types";
import { StateSetter } from "@lib/types";

import { QuantitySelector } from "./QuantitySelector/QuantitySelector";

type IProps = {
  item: ShopifyCartItem;
  lang: Locale;
  setCart: StateSetter<Cart | undefined>;
};

export const CartItem: FC<IProps> = (props) => {
  const { item, lang, setCart } = props;
  const { merchandise, cost, quantity } = item;
  const { product, selectedOptions } = merchandise;

  const shopSection = SECTIONS.shop;

  return (
    <div className='flex items-center gap-3'>
      <Link
        href={`/${lang}/${shopSection.url}/${product.productType}/${product.handle}`}
      >
        <Image
          className='object-center object-cover rounded'
          src={product.featuredImage.url}
          alt={`${product.title} photography`}
          width={120}
          height={120}
        />
      </Link>
      <div className='flex flex-col items-start h-full p-1 gap-3'>
        <div className='flex flex-col'>
          <Link
            href={`/${lang}/${shopSection.url}/${product.productType}/${product.handle}`}
            className='uppercase'
          >
            {product.title}
          </Link>
          <div className='flex items-center'>
            {selectedOptions.map((option) => (
              <p
                className='text-sm font-light uppercase text-neutral-600'
                key={option.value}
              >{`${option.name} ${option.value}`}</p>
            ))}
          </div>
          <p className='text-sm font-light uppercase text-neutral-600'>
            {cost.totalAmount.amount} {cost.totalAmount.currencyCode}
          </p>
        </div>
        <QuantitySelector
          lineId={item.id}
          variantId={item.merchandise.id}
          quantity={quantity}
          setCart={setCart}
        />
      </div>
    </div>
  );
};
