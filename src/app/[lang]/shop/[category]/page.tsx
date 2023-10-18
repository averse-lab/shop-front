import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

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
          {products.map((item, idx) => (
            <>
              <ProductPreview
                key={item.id}
                className='outline outline-1 outline-neutral-500'
                href={`/${lang}/${shopSection.url}/${item.productType}/${item.handle}`}
                imageUrl={item.images[0].url}
                title={item.title}
                price={item.priceRange.maxVariantPrice.amount}
                currency={item.priceRange.maxVariantPrice.currencyCode}
              />
              {ANIMATIONS.map((animation) => {
                if (animation.index === idx + 1) {
                  return (
                    <VideoPlayer
                      className='w-full h-full outline outline-1 outline-neutral-500 overflow-hidden'
                      key={animation.playbackId}
                      playbackId={animation.playbackId}
                      widthRatio={1}
                      heighRatio={1}
                    />
                  );
                }
              })}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
