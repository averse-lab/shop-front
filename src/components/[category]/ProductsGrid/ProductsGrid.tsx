"use client";

import { FC, useRef, useState } from "react";

import clsx from "clsx";
import { InView } from "react-intersection-observer";

import { Dictionary, Locale } from "@lib/i18n/types";
import { CATEGORIES, PAGES } from "@lib/routing/constants";
import { Product } from "@lib/shopify/types";

import { FilterSelector } from "../FilterSelector/FilterSelector";
import { Filter } from "../FilterSelector/_internal/FilterSelector.types";
import { ProductPreview } from "../ProductPreview/ProductPreview";
import { ProductGridObserver } from "./ProductGridObserver";

export type IProps = {
  products: Product[];
  lang: Locale;
  className?: string;
  dictionary: Dictionary;
  categoryUrlSegment: string;
};

export const ProductsGrid: FC<IProps> = (props) => {
  const { products, lang, className, dictionary, categoryUrlSegment } = props;

  const [initAnimationsOver, setInitAnimationsOver] = useState(false);

  const productsInViewAtInit = useRef(0);
  const productsVisible = useRef(0);

  const filters: Filter[] = Object.values(CATEGORIES).map<Filter>(({ url, i18nKey }) => ({
    url,
    display: dictionary.categories[i18nKey],
  }));

  const selectedFilterIndex = filters.reduce((selectedFilterIndex, filter, idx) => {
    return filter.url === categoryUrlSegment ? idx : selectedFilterIndex;
  }, 0);

  const onAnimationEnd = () => {
    if (initAnimationsOver) {
      return;
    }

    productsVisible.current += 1;

    if (productsInViewAtInit.current !== productsVisible.current) {
      return;
    }

    setInitAnimationsOver(true);
  };

  return (
    <>
      <ProductGridObserver />
      <div
        className={clsx(
          className,
          "grid auto-rows-min grid-cols-2 items-start gap-px lg:grid-cols-4",
        )}
      >
        {products.map(
          (product, idx) =>
            !product.customMetafields.hideOnWebsite && (
              <ProductPreview
                currency={product.priceRange.maxVariantPrice.currencyCode}
                href={`/${lang}/${PAGES.shop.url}/${product.productType}/${product.handle}`}
                imageUrl={
                  product.productImage?.reference.image.url || product.featuredImage?.url || ""
                }
                index={idx}
                key={product.id}
                lang={lang}
                light={product.customMetafields.darkFeaturedImage || false}
                onAnimationEnd={onAnimationEnd}
                price={product.priceRange.minVariantPrice.amount}
                productsInViewAtInit={productsInViewAtInit}
                title={product.title}
              />
            ),
        )}
      </div>
      <InView initialInView>
        {({ inView, ref }) => {
          return (
            <>
              <div ref={ref}></div>
              <FilterSelector
                className={clsx(
                  "fixed bottom-2 left-0 right-0 z-10 m-auto lg:bottom-auto lg:top-[112px]",
                  "transition-all duration-200 ease-out lg:translate-y-0 lg:opacity-0",
                  initAnimationsOver && "lg:animate-filter-selector-desktop-appearing",
                  initAnimationsOver
                    ? inView
                      ? "translate-y-3 opacity-0"
                      : "-translate-y-3 opacity-100"
                    : "opacity-0",
                )}
                filters={filters}
                lang={lang}
                selectedFilterIndex={selectedFilterIndex}
              />
            </>
          );
        }}
      </InView>
    </>
  );
};
