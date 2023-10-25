import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { v4 } from "uuid";

import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";

import { Filter } from "@components/[category]/FilterSelector/_internal/FilterSelector.types";
import { FilterSelector } from "@components/[category]/FilterSelector/FilterSelector";
import { ProductPreview } from "@components/[category]/ProductPreview/ProductPreview";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { I18N_CONFIG } from "@lib/i18n/config";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getProducts } from "@lib/shopify";
import { getSupportedLanguageCodeFromLocale } from "@lib/utils";

import { ANIMATIONS } from "./_internal/CategoryPage.constants";
import { CATEGORIES } from "../_internal/ShopPage.constants";
import { getCategoryFromCategoryUrlSegment } from "../_internal/ShopPage.utils";

export const metadata: Metadata = {
  title: "Averse - Shop",
  description: "Shop for products in the store.",
};

type Params = { category: string; lang: Locale };

export async function generateStaticParams() {
  return I18N_CONFIG.locales.reduce<Params[]>((staticParams, locale) => {
    Object.values(CATEGORIES)
      .map(({ url }) => ({ url }))
      .forEach(({ url }) => {
        staticParams.push({ lang: locale, category: url });
      });

    return staticParams;
  }, []);
}

type IProps = {
  params: Params;
};

const CategoryPage: FC<IProps> = async (props) => {
  const { category: categoryUrlSegment, lang } = props.params;

  const dictionary = await getDictionary(lang);
  const category = getCategoryFromCategoryUrlSegment(categoryUrlSegment);

  if (category === undefined) {
    notFound();
  }

  const products = await getProducts({
    query:
      categoryUrlSegment === CATEGORIES.allProducts.url
        ? category.shopifyId
        : `product_type:${category.shopifyId}`,
    lang: getSupportedLanguageCodeFromLocale(lang),
  });

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
      <div className='fixed z-10 h-[72px] md:h-[96px] w-full top-0 left-0 bg-white border-b border-neutral-200'></div>
      <FilterSelector
        className='fixed z-10 mt-[72px] md:mt-[96px] w-full'
        filters={filters}
        selectedFilterIndex={selectedFilterIndex}
      />
      <div className='mt-[128px] md:mt-[152px] flex flex-col'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-px auto-rows-[1fr] border-t border-b border-neutral-500'>
          {products.reduce<JSX.Element[]>((gridElements, product, idx) => {
            gridElements.push(
              <ProductPreview
                key={product.id}
                className='outline outline-1 outline-neutral-500'
                href={`/${lang}/${SECTIONS.shop.url}/${product.productType}/${product.handle}`}
                imageUrl={product.images[0].url}
                title={product.title}
                price={product.priceRange.maxVariantPrice.amount}
                currency={product.priceRange.maxVariantPrice.currencyCode}
              />,
            );

            const animation = ANIMATIONS.find(
              (animation) => animation.index === idx,
            );

            if (animation !== undefined) {
              gridElements.push(
                <VideoPlayer
                  key={v4()}
                  className='w-full h-full outline outline-1 outline-neutral-500'
                  playbackId={animation.playbackId}
                  widthRatio={1}
                  heighRatio={1}
                />,
              );
            }

            return gridElements;
          }, [])}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
