import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Filter } from "@components/[category]/FilterSelector/_internal/FilterSelector.types";
import { FilterSelector } from "@components/[category]/FilterSelector/FilterSelector";
import { ProductPreview } from "@components/[category]/ProductPreview/ProductPreview";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";
import { Observer } from "@components/Observer/Observer";

import { I18N_CONFIG } from "@lib/i18n/config";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { CATEGORIES, PAGES } from "@lib/routing/constants";
import { getProducts } from "@lib/shopify";
import { getSupportedLanguageCodeFromLocale } from "@lib/utils";

import {
  getCategoryFromCategoryUrlSegment,
  getMetadataDescription,
  getMetadataTitle,
  getMetadataTwitterDescription,
} from "./_internal/CategoryPage.utils";

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

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang, category } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.shop;

  return {
    title: getMetadataTitle(category, metadata),
    description: getMetadataDescription(category, metadata),
    twitter: {
      card: "summary",
      title: getMetadataTitle(category, metadata),
      description: getMetadataTwitterDescription(category, metadata),
      images: {
        url: "/images/open-graph/twitter-cards.webp",
        alt: lang === "en" ? "Averse logo" : "Logo Averse",
        type: "image/webp",
        height: 1024,
        width: 1024,
      },
    },
    openGraph: {
      type: "website",
      title: getMetadataTitle(category, metadata),
      description: getMetadataTwitterDescription(category, metadata),
      url: `/${lang}/${PAGES.shop.url}/${category}`,
      images: {
        url: "/images/open-graph/facebook-og.webp",
        alt: "Averse logo",
        type: "image/webp",
        height: 1024,
        width: 1955,
      },
    },
  };
}

type Params = {
  category: string;
  lang: Locale;
};

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
    cache: "no-store",
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
      <HeaderContextInitializer whiteBackground />
      <FilterSelector
        className={clsx("fixed left-0 top-[72px] z-10 md:top-[96px]", "w-full")}
        filters={filters}
        selectedFilterIndex={selectedFilterIndex}
      />
      <div className={clsx("mt-[128px] md:mt-[152px]", "flex flex-col")}>
        <div
          className={clsx(
            "z-0",
            "grid auto-rows-[1fr] grid-cols-2 gap-px lg:grid-cols-4",
          )}
        >
          {products.map((product, idx) => (
            <Observer
              className={clsx(
                "lg:[&:nth-child(3n+4)>a]:delay-400 outline outline-1 outline-neutral-500 lg:[&:nth-child(3n+2)>a]:delay-200 lg:[&:nth-child(3n+3)>a]:delay-300 [&>a]:even:delay-100",
              )}
              inViewClassName={clsx("[&>a]:opacity-100")}
              key={product.id}
              options={{ triggerOnce: true, threshold: 0.5 }}
              outOfViewClassName={clsx("[&>a]:opacity-0")}
            >
              <ProductPreview
                className={clsx("transition-all duration-200 ease-out")}
                currency={product.priceRange.maxVariantPrice.currencyCode}
                href={`/${lang}/${PAGES.shop.url}/${product.productType}/${product.handle}`}
                imageUrl={
                  product.images.length > 0 ? product.images[0].url : ""
                }
                index={idx}
                light={product.customMetafields.darkFeaturedImage || false}
                price={product.priceRange.minVariantPrice.amount}
                title={product.title}
              />
            </Observer>
          ))}
          {/*{getAnimationsFromCategoryUrlSegment(categoryUrlSegment).map(*/}
          {/*  (animation, idx) => {*/}
          {/*    return (*/}
          {/*      <Observer*/}
          {/*        className={clsx(*/}
          {/*          `animation-${idx}`,*/}
          {/*          "transition-all duration-200 ease-out",*/}
          {/*          `lg:[&:nth-child(3n+4)]:delay-400 even:delay-100 lg:[&:nth-child(3n+2)]:delay-200 lg:[&:nth-child(3n+3)]:delay-300`,*/}
          {/*        )}*/}
          {/*        inViewClassName={clsx("opacity-100")}*/}
          {/*        key={v4()}*/}
          {/*        options={{ triggerOnce: true, threshold: 0.5 }}*/}
          {/*        outOfViewClassName={clsx("opacity-0")}*/}
          {/*      >*/}
          {/*        <Animation*/}
          {/*          gridDesktopIndex={animation.gridDesktopIndex}*/}
          {/*          gridIndex={animation.gridIndex}*/}
          {/*          index={idx}*/}
          {/*          playbackId={animation.playbackId}*/}
          {/*        />*/}
          {/*      </Observer>*/}
          {/*    );*/}
          {/*  },*/}
          {/*)}*/}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
