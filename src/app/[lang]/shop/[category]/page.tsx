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
import { Header } from "@averse/components";

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
      />
      <div className='grid grid-cols-2 md:grid-cols-4'>
        {products.map((item, index) => (
          <>
            <div
              key={item.id}
              className='relative border-t border-l border-black overflow-hidden'
              style={{ outline: "1px solid black", outlineOffset: "-1px" }}
            >
              <Link
                href={`/${lang}/${shopSection.url}/${item.productType}/${item.handle}`}
              >
                {item.images[0] && (
                  <Image
                    src={item.images[0]?.url}
                    alt={item.title}
                    width={2200}
                    height={2200}
                    className='object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer'
                  />
                )}
                <div className='absolute bottom-0 left-0 p-2 text-black'>
                  <h2 className={"uppercase font-sans"}>{item.title}</h2>
                  <p className={"font-sans"}>
                    {item.priceRange.maxVariantPrice.amount}{" "}
                    {item.priceRange.maxVariantPrice.currencyCode}
                  </p>
                </div>
              </Link>
            </div>
            {ANIMATIONS.map(({ playbackId, apsectRatio, index }) => {
              if (index === index + 1) {
                return (
                  <Animation
                    playbackId={playbackId}
                    aspectRatio={apsectRatio}
                    key={`${index}-${playbackId}`}
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
