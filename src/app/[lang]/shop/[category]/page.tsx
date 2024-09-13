import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductsGrid } from "@components/[category]/ProductsGrid/ProductsGrid";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { CATEGORIES, PAGES } from "@lib/routing/constants";
import { getProducts } from "@lib/shopify";
import {
  generateAlternates,
  getSupportedLanguageCodeFromLocale,
} from "@lib/utils";

import {
  getCategoryFromCategoryUrlSegment,
  getMetadataDescription,
  getMetadataTitle,
  getMetadataTwitterDescription,
} from "./_internal/CategoryPage.utils";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang, category } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.shop;

  return {
    title: getMetadataTitle(category, metadata),
    description: getMetadataDescription(category, metadata),
    alternates: generateAlternates(`/${PAGES.shop.url}/${category}`, lang),
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
    sortKey: "PRICE",
  });

  return (
    <>
      <HeaderContextInitializer blackBackground={true} whiteIcons={true} />
      <ProductsGrid
        categoryUrlSegment={categoryUrlSegment}
        className={clsx("relative z-0", "mt-[72px] md:mb-[62px] md:mt-[215px]")}
        dictionary={dictionary}
        lang={lang}
        products={products}
      />
    </>
  );
};

export default CategoryPage;

// ANIMATIONS IMPLEM

{
  /*{getAnimationsFromCategoryUrlSegment(categoryUrlSegment).map(*/
}
{
  /*  (animation, idx) => {*/
}
{
  /*    return (*/
}
{
  /*      <Observer*/
}
{
  /*        className={clsx(*/
}
{
  /*          `animation-${idx}`,*/
}
{
  /*          "transition-all duration-200 ease-out",*/
}
{
  /*          `lg:[&:nth-child(3n+4)]:delay-400 even:delay-100 lg:[&:nth-child(3n+2)]:delay-200 lg:[&:nth-child(3n+3)]:delay-300`,*/
}
{
  /*        )}*/
}
{
  /*        inViewClassName={clsx("opacity-100")}*/
}
{
  /*        key={v4()}*/
}
{
  /*        options={{ triggerOnce: true, threshold: 0.5 }}*/
}
{
  /*        outOfViewClassName={clsx("opacity-0")}*/
}
{
  /*      >*/
}
{
  /*        <Animation*/
}
{
  /*          gridDesktopIndex={animation.gridDesktopIndex}*/
}
{
  /*          gridIndex={animation.gridIndex}*/
}
{
  /*          index={idx}*/
}
{
  /*          playbackId={animation.playbackId}*/
}
{
  /*        />*/
}
{
  /*      </Observer>*/
}
{
  /*    );*/
}
{
  /*  },*/
}
{
  /*)}*/
}
