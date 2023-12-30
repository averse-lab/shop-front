"use client";

import { FC } from "react";

import clsx from "clsx";
import { InView } from "react-intersection-observer";

import { Dictionary, Locale } from "@lib/i18n/types";
import { CATEGORIES, PAGES } from "@lib/routing/constants";
import { Product } from "@lib/shopify/types";

import { Filter } from "../FilterSelector/_internal/FilterSelector.types";
import { FilterSelector } from "../FilterSelector/FilterSelector";
import { ProductPreview } from "../ProductPreview/ProductPreview";

export type IProps = {
  products: Product[];
  lang: Locale;
  className?: string;
  dictionary: Dictionary;
  categoryUrlSegment: string;
};

export const ProductsGrid: FC<IProps> = (props) => {
  const { products, lang, className, dictionary, categoryUrlSegment } = props;

  const filters: Filter[] = Object.values(CATEGORIES).map<Filter>(
    ({ url, i18nKey }) => ({
      url,
      display: dictionary.categories[i18nKey],
    }),
  );

  const selectedFilterIndex = filters.reduce(
    (selectedFilterIndex, filter, idx) => {
      return filter.url === categoryUrlSegment ? idx : selectedFilterIndex;
    },
    0,
  );

  return (
    <>
      <div className={clsx("min-h-[calc(100vh+1px)]")}>
        <div
          className={clsx(
            className,
            "grid auto-rows-[1fr] grid-cols-2 items-start gap-px lg:grid-cols-4",
          )}
        >
          {products.map(
            (product, idx) =>
              !product.customMetafields.hideOnWebsite && (
                <InView key={product.id} threshold={0.25} triggerOnce>
                  {({ inView, ref }) => (
                    <ProductPreview
                      className={clsx(
                        "even:delay-100",
                        "lg:[&:nth-child(4n+2)]:delay-100 lg:[&:nth-child(4n+3)]:delay-200 lg:[&:nth-child(4n+4)]:delay-300",
                        "outline outline-1 outline-neutral-500 transition-all duration-200 ease-out",
                        inView ? "opacity-100" : "opacity-0",
                      )}
                      currency={product.priceRange.maxVariantPrice.currencyCode}
                      href={`/${lang}/${PAGES.shop.url}/${product.productType}/${product.handle}`}
                      imageUrl={
                        product.images.length > 0 ? product.images[0].url : ""
                      }
                      index={idx}
                      lang={lang}
                      light={
                        product.customMetafields.darkFeaturedImage || false
                      }
                      price={product.priceRange.minVariantPrice.amount}
                      reference={ref}
                      title={product.title}
                    />
                  )}
                </InView>
              ),
          )}
        </div>
      </div>
      <InView initialInView>
        {({ inView, ref }) => {
          return (
            <>
              <div ref={ref}></div>
              <FilterSelector
                className={clsx(
                  "fixed bottom-2 left-0 right-0 z-10 m-auto lg:bottom-auto lg:top-[120px]",
                  "transition-all duration-200 ease-out lg:translate-y-0 lg:opacity-100",
                  inView
                    ? "translate-y-3 opacity-0"
                    : "-translate-y-3 opacity-100",
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
