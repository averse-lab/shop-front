import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductInteractive } from "@components/[slug]/ProductInteractive";
import { ProductSlide } from "@components/[slug]/ProductSlide";
import { SingleAdditionalVideo } from "@components/[slug]/SingleAdditionalVideo";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { Slider } from "@components/Slider";
import { VideoPlayer } from "@components/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getMuxPlaceholder } from "@lib/mux/utils";
import { PAGES } from "@lib/routing/constants";
import { getProduct } from "@lib/shopify";
import { generateAlternates, getSupportedLanguageCodeFromLocale } from "@lib/utils";

import { isProductWithSingleAdditionalVideo } from "./_internal/ProductPage.utils";

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

  console.log(product);

  const macroPlaybackId = product.customMetafields.macroVideoId;
  const placeholder = macroPlaybackId
    ? await getMuxPlaceholder({ playbackId: macroPlaybackId, width: 64 })
    : null;

  return (
    <>
      <HeaderContextInitializer
        cartBtnColor='white'
        cartBtnIcnColor='black'
        headerBgColor='transparent'
        logoVisible
        menuBgColor='white'
        menuBtnColor='white'
        menuBtnIcnColor='white'
      />
      <div className={clsx("flex flex-col lg:flex-row")}>
        <Slider
          className={clsx("lg:basis-1/2", "lg:[&>div>div]:flex-col", "bg-black")}
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
              className={clsx("border-border/20 aspect-square border-b")}
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
            <h1 className={clsx("text-lg uppercase", "mb-6")}>{product.title}</h1>
            <ProductInteractive
              dictionary={dictionary}
              minVariantPrice={product.priceRange.minVariantPrice}
              shippingDelays={product.customMetafields.shippingDelays}
              variants={product.variants}
            />
            <div
              className={clsx("mt-6", "[&_p:not(:last-child)]:mb-2")}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
      </div>
      {isProductWithSingleAdditionalVideo(product) && (
        <SingleAdditionalVideo
          description={product.customMetafields.additionalDescription}
          inversedLayout={product.customMetafields.additionalVideosLayout === "inversed"}
          playbackId={product.customMetafields.additionalDescriptionVideoId}
        />
      )}
    </>
  );
};

export default ProductPage;
