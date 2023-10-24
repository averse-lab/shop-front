import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { v4 } from "uuid";

import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";
import { SectionsKey } from "@averse/app/[lang]/_internal/HomePage.types";

import { Filter } from "@components/[category]/FilterSelector/_internal/FilterSelector.types";
import { FilterSelector } from "@components/[category]/FilterSelector/FilterSelector";
import { ProductPreview } from "@components/[category]/ProductPreview/ProductPreview";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getProducts } from "@lib/shopify";
import { getSupportedLanguageCodeFromLocale } from "@lib/utils";

import { ANIMATIONS } from "./_internal/CategoryPage.constants";
import { CATEGORIES } from "../_internal/ShopPage.constants";
import { CategoriesUrlSegment } from "../_internal/ShopPage.types";
import { mapCategoryUrlSegmentToCategoryKey } from "../_internal/ShopPage.utils";

export const metadata: Metadata = {
  title: "Averse - Shop",
  description: "Shop for products in the store.",
};

type IProps = {
  params: { category: string; lang: Locale };
};

const CategoryPage: FC<IProps> = async (props) => {
  const { category: categoryUrlSegment, lang } = props.params;

  const dictionary = await getDictionary(lang);
  const categoryKey = mapCategoryUrlSegmentToCategoryKey(categoryUrlSegment);

  if (categoryKey === undefined) {
    notFound();
  }

  const category = CATEGORIES.get(categoryKey);
  const shopSection = SECTIONS.get(SectionsKey.SHOP);

  if (category === undefined || shopSection === undefined) {
    notFound();
  }

  const languageCode = getSupportedLanguageCodeFromLocale(lang);

  const products = await getProducts({
    query:
      categoryUrlSegment === CategoriesUrlSegment.ALL_PRODUCTS
        ? category.shopifyId
        : `product_type:${category.shopifyId}`,
    lang: languageCode,
  });

  const filters: Filter[] = Array.from(CATEGORIES, ([_, { url, i18nKey }]) => ({
    url,
    display: dictionary.categories[i18nKey],
  }));

  const selectedFilterIndex = filters.reduce((acc, curr, idx) => {
    return curr.url === categoryUrlSegment ? idx : acc;
  }, 0);

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
          {products.reduce<JSX.Element[]>((acc, curr, idx) => {
            acc.push(
              <ProductPreview
                key={curr.id}
                className='outline outline-1 outline-neutral-500'
                href={`/${lang}/${shopSection.url}/${curr.productType}/${curr.handle}`}
                imageUrl={curr.images[0].url}
                title={curr.title}
                price={curr.priceRange.maxVariantPrice.amount}
                currency={curr.priceRange.maxVariantPrice.currencyCode}
              />,
            );

            const animation = ANIMATIONS.find(
              (animation) => animation.index === idx,
            );

            if (animation !== undefined) {
              acc.push(
                <VideoPlayer
                  key={v4()}
                  className='w-full h-full outline outline-1 outline-neutral-500 overflow-hidden aspect-square'
                  playbackId={animation.playbackId}
                  widthRatio={1}
                  heighRatio={1}
                />,
              );
            }

            return acc;
          }, [])}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
