import { FC } from "react";

import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { Dictionary, Locale } from "@lib/i18n/types";
import { PAGES } from "@lib/routing/constants";
import { Cart, CartItem as ShopifyCartItem } from "@lib/shopify/types";
import { StateSetter } from "@lib/types";

import { QuantitySelector } from "./QuantitySelector/QuantitySelector";

type IProps = {
  className?: string;
  item: ShopifyCartItem;
  lang: Locale;
  setCart: StateSetter<Cart | undefined>;
  dictionary: Dictionary;
};

export const CartItem: FC<IProps> = (props) => {
  const { item, lang, setCart, className, dictionary } = props;
  const { merchandise, cost, quantity } = item;
  const { product, selectedOptions } = merchandise;

  const uniqueSize =
    selectedOptions.length === 1 && selectedOptions[0].name === "Title";

  return (
    <div className={clsx(className, "flex items-center gap-3")}>
      <Link
        href={`/${lang}/${PAGES.shop.url}/${product.productType}/${product.handle}`}
        hrefLang={lang}
      >
        <Image
          alt={`${product.title} photography`}
          className={clsx("h-[120px] w-[120px]", "object-cover object-center")}
          height={120}
          src={product.featuredImage !== null ? product.featuredImage.url : ""}
          width={120}
        />
      </Link>
      <div className={clsx("flex flex-col items-start gap-3", "h-full p-1")}>
        <div className={clsx("flex flex-col")}>
          <Link
            className={clsx("font-bold uppercase")}
            href={`/${lang}/${PAGES.shop.url}/${product.productType}/${product.handle}`}
            hrefLang={lang}
          >
            {product.title}
          </Link>
          <div className={clsx("flex items-center")}>
            {uniqueSize ? (
              <p
                className={clsx(
                  "font-serif text-sm font-light uppercase text-neutral-600",
                )}
              >
                {dictionary.product.uniqueSize}
              </p>
            ) : (
              selectedOptions.map((option) => (
                <p
                  className={clsx(
                    "font-serif text-sm font-light uppercase text-neutral-600",
                  )}
                  key={option.value}
                >{`${option.value}`}</p>
              ))
            )}
          </div>
          <p
            className={clsx(
              "font-serif text-sm font-light uppercase text-neutral-600",
            )}
          >
            {cost.totalAmount.amount} {cost.totalAmount.currencyCode}
          </p>
        </div>
        <QuantitySelector
          lineId={item.id}
          quantity={quantity}
          setCart={setCart}
          variantId={item.merchandise.id}
        />
      </div>
    </div>
  );
};
