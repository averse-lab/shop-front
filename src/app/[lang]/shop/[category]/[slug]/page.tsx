import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductInteractive } from "@components/[slug]/ProductInteractive";
import { ProductSlide } from "@components/[slug]/ProductSlide";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { Slider } from "@components/Slider";
import { VideoPlayer } from "@components/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getMuxPlaceholder } from "@lib/mux/utils";
import { PAGES } from "@lib/routing/constants";
import { getProduct } from "@lib/shopify";
import { generateAlternates, getSupportedLanguageCodeFromLocale } from "@lib/utils";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang, slug } = params;

  const languageCode = getSupportedLanguageCodeFromLocale(lang);
  const product = await getProduct(slug, languageCode);

  if (!product) {
    return {};
  }

  const { productImage, featuredImage, title, seo, description, productType } = product;

  return {
    title: seo.title || `${title} | Averse`,
    description: seo.description || description,
    alternates: generateAlternates(`/${PAGES.shop.url}/${productType}/${slug}`, lang),
    twitter: {
      card: "summary",
      title: seo.title || `${title} | Averse`,
      description: seo.description || description,
      images: productImage
        ? {
            url: productImage.reference.image.url,
            alt: productImage.reference.image.altText,
            height: productImage.reference.image.height,
            width: productImage.reference.image.width,
          }
        : featuredImage
          ? {
              url: featuredImage.url,
              alt: featuredImage.altText,
              height: featuredImage.height,
              width: featuredImage.width,
            }
          : undefined,
    },
    openGraph: {
      type: "website",
      title: seo.title || `${title} | Averse`,
      description: seo.description || description,
      url: `${lang}/${PAGES.shop.url}/${productType}/${slug}`,
      images: productImage
        ? {
            url: productImage.reference.image.url,
            alt: productImage.reference.image.altText,
            height: productImage.reference.image.height,
            width: productImage.reference.image.width,
          }
        : featuredImage
          ? {
              url: featuredImage.url,
              alt: featuredImage.altText,
              height: featuredImage.height,
              width: featuredImage.width,
            }
          : undefined,
    },
  };
}

type Params = { slug: string; category: string; lang: Locale };

interface IProps {
  params: Params;
}

const ProductPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { slug, lang } = params;

  const languageCode = getSupportedLanguageCodeFromLocale(lang);
  const product = await getProduct(slug, languageCode);

  const dictionary = await getDictionary(lang);

  if (!product) {
    notFound();
  }

  const macroPlaybackId = product.customMetafields.macroVideoId;
  const placeholder = macroPlaybackId
    ? await getMuxPlaceholder({ playbackId: macroPlaybackId, width: 64 })
    : null;

  return (
    <>
      <HeaderContextInitializer
        cartBtnColor='black'
        cartBtnIcnColor='white'
        desktopCartBtnIcnColor='black'
        headerBgColor='transparent'
        logoColor='black'
        logoType='plain'
        logoVisible
        menuBgColor='white'
        menuBtnColor='white'
        menuBtnIcnColor='black'
      />
      <div className={clsx("lg:container lg:mb-8 lg:mt-24", "flex flex-col lg:flex-row")}>
        <Slider
          className={clsx(
            "lg:basis-1/2",
            "md:items-right lg:[&>div>div]:flex-col",
            "lg:[&>div>div]:gap-8",
          )}
          options={{
            loop: true,
            breakpoints: {
              "(min-width: 1024px)": {
                active: false,
              },
            },
          }}
        >
          {placeholder && macroPlaybackId && (
            <VideoPlayer
              className={clsx("aspect-square lg:border-b lg:border-border/20")}
              minResolution='1080p'
              placeholder={placeholder}
              playbackId={macroPlaybackId}
            />
          )}

          {product.images.map((image) => (
            <ProductSlide imgAlt={image.altText} imgSrc={image.url} key={image.url} />
          ))}
        </Slider>
        <div
          className={clsx(
            "lg:sticky lg:top-0",
            "px-6 py-4 lg:h-screen",
            "flex lg:basis-1/2 lg:flex-col lg:items-center lg:justify-center",
          )}
        >
          <div className={clsx("w-full lg:w-[450px]")}>
            <h1 className={clsx("text-base uppercase", "mb-2")}>{product.title}</h1>
            <ProductInteractive
              dictionary={dictionary}
              lang={lang}
              minVariantPrice={product.priceRange.minVariantPrice}
              shippingDelays={product.customMetafields.shippingDelays}
              variants={product.variants}
            />
            <div
              className={clsx("mt-8", "[&_p:not(:last-child)]:mb-2", "font-abhaya text-base")}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <Link
              className='font-abhaya text-base hover:underline'
              href={`/${lang}/${PAGES.shop.url}/${product.productType}`}
            >
              {dictionary.product.backToShop}
            </Link>
            {/* 
            <p className={clsx("hidden items-center justify-center gap-4 md:flex", "h-full")}>
              <span className={clsx("font-medium uppercase")}>
                {dictionary.product.moreDetails} 
              </span>
              <RiArrowDownLine className={clsx("animate-bounce")} size={20} />
            </p> */}
          </div>
        </div>
      </div>
      {/* {isProductWithSingleAdditionalVideo(product) && (
        <AdditionalVideosObserver
          className={clsx(
            "px-6 py-8 lg:min-h-dvh lg:px-12",
            "flex flex-col items-center gap-8 lg:justify-center lg:gap-24",
            product.customMetafields.additionalVideosLayout === "inversed"
              ? "md:flex-row-reverse"
              : "md:flex-row",
            "bg-black",
            "text-primary-foreground",
          )}
          id='more-details-section'
        >
          <SingleAdditionalVideo
            description={product.customMetafields.additionalDescription}
            playbackId={product.customMetafields.additionalDescriptionVideoId}
          />
        </AdditionalVideosObserver>
      )} */}
    </>
  );
};

export default ProductPage;
