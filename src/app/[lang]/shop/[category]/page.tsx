import Image from "next/image";
import { getProducts } from "@averse/lib/shopify";
import Link from "next/link";
import { Animation } from "@averse/components/product/animation";
import { Metadata } from "next";
import { FC } from "react";
import { CategoriesUrlSegment } from "../_internal/types";
import { CATEGORIES } from "../_internal/constants";
import { FilterSelector } from "./_internal/components";
import { ANIMATIONS } from "./_internal/constants";
import { notFound } from "next/navigation";
import { SECTIONS } from "@averse/app/_internal/constants";
import { SectionsKey } from "@averse/app/_internal/types";
import { mapCategoryUrlSegmentToCategoryKey } from "../_internal/helpers";
import { Filter } from "./_internal/components/FilterSelector/_internal/types";
import { getDictionary } from "@averse/lib/i18n/utils";
import { Locale } from "@averse/lib/i18n/types";
import { Header, VideoPlayer } from "@averse/components";
import { ProductPreview } from "./_internal/components/ProductPreview/ProductPreview";

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

  const products = await getProducts({
    query:
      categoryUrlSegment === CategoriesUrlSegment.ALL_PRODUCTS
        ? category.shopifyId
        : `product_type:${category.shopifyId}`,
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
      <Header dictionary={dictionary} lang={lang} />
      <FilterSelector
        filters={filters}
        selectedFilterIndex={selectedFilterIndex}
        className='border-t border-black'
      />
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-px auto-rows-[1fr] grow border-t border-b border-black'>
        {products.map((item, index) => (
          <>
            <ProductPreview
              className='outline outline-1 outline-black'
              href={`/${lang}/${shopSection.url}/${item.productType}/${item.handle}`}
              imageUrl={item.images[0].url}
              title={item.title}
              price={item.priceRange.maxVariantPrice.amount}
              currency={item.priceRange.maxVariantPrice.currencyCode}
            />
            {ANIMATIONS.map((animation) => {
              if (animation.index === index + 1) {
                return (
                  <VideoPlayer
                    className='w-full h-full outline outline-1 outline-black overflow-hidden'
                    key={animation.playbackId}
                    playbackId={animation.playbackId}
                    aspectRatio={animation.aspectRatio}
                  />
                );
              }
            })}
          </>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
