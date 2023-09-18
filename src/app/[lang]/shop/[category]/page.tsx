import Image from "next/image";
import { getProducts } from "@averse/lib/shopify";
import Link from "next/link";
import { Animation } from "@averse/components/product/animation";
import { Metadata } from "next";
import { FC } from "react";
import { CategoriesKey } from "../_internal/types";
import { CATEGORIES } from "../_internal/constants";
import { FilterSelector } from "./_internal/components";
import { ANIMATIONS, FILTERS } from "./_internal/constants";
import { notFound } from "next/navigation";
import { SECTIONS } from "@averse/app/_internal/constants";
import { SectionsKey } from "@averse/app/_internal/types";

export const metadata: Metadata = {
  title: "Averse - Shop",
  description: "Shop for products in the store.",
};

type IProps = {
  params: { category: CategoriesKey };
};

const CategoryPage: FC<IProps> = async (props) => {
  const { category: categoryUrlSegment } = props.params;

  const category = CATEGORIES.get(categoryUrlSegment);
  const shopSection = SECTIONS.get(SectionsKey.SHOP);

  if (category === undefined || shopSection === undefined) {
    return notFound();
  }

  const products = await getProducts({
    query:
      categoryUrlSegment === "all_products"
        ? ""
        : `product_type:${category.url}`,
  });

  const selectedFilterIndex = FILTERS.reduce((acc, curr, idx) => {
    return curr.url === categoryUrlSegment ? idx : acc;
  }, 0);

  return (
    <>
      <FilterSelector
        filters={FILTERS}
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
              <Link href={`/${shopSection.url}/${category.url}/${item.handle}`}>
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
            {ANIMATIONS.map((animation) => {
              if (animation.index === index + 1) {
                return (
                  <Animation
                    animation={animation}
                    key={`${animation.index}-${animation.playbackId}`}
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
