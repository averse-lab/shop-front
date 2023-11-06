import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { MultipleAdditionalVideos } from "@components/[slug]/MultipleAdditionalVideos/MultipleAdditionalVideos";
import { ProductInteractive } from "@components/[slug]/ProductInteractive/ProductInteractive";
import { SingleAdditionalVideo } from "@components/[slug]/SingleAdditionalVideo/SingleAdditionalVideo";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";
import { Slider } from "@components/Slider/Slider";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { PAGES } from "@lib/routing/constants";
import { getProduct } from "@lib/shopify";
import { getSupportedLanguageCodeFromLocale } from "@lib/utils";

import s from "./_internal/ProductPage.module.scss";
import {
  isProductWithMultipleAdditionalVideos,
  isProductWithSingleAdditionalVideo,
} from "./_internal/ProductPage.utils";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang, slug } = params;

  const languageCode = getSupportedLanguageCodeFromLocale(lang);
  const product = await getProduct(slug, languageCode);

  if (!product) {
    return {};
  }

  const { featuredImage, title, seo, description, productType } = product;

  return {
    title: seo.title || `${title} | Averse`,
    description: seo.description || description,
    twitter: {
      card: "summary",
      title: seo.title || `${title} | Averse`,
      description: seo.description || description,
      images: featuredImage
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
      images: featuredImage
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

  const product = await getProduct(
    slug,
    getSupportedLanguageCodeFromLocale(lang),
  );
  const dictionary = await getDictionary(lang);

  if (product === undefined) {
    notFound();
  }

  return (
    <>
      <HeaderContextInitializer />
      <div className={clsx("flex flex-col lg:flex-row")}>
        <div className={clsx("lg:basis-1/2")}>
          <Slider
            className={clsx(s["product-page__slider"])}
            options={{
              loop: true,
              breakpoints: {
                "(min-width: 1024px)": {
                  active: false,
                },
              },
            }}
          >
            {product.images.map((image, idx) => (
              <div
                className={clsx("grid auto-rows-fr grid-cols-1")}
                key={image.url}
              >
                <div
                  className={clsx("relative", "aspect-square overflow-hidden")}
                >
                  <Image
                    alt={image.altText}
                    className={clsx("aspect-square object-cover object-center")}
                    fill
                    priority={idx <= 2}
                    sizes='(min-width: 1024px) 50vw, 100vw'
                    src={image.url}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div
          className={clsx(
            "lg:sticky lg:top-0",
            "px-6 py-4 lg:h-screen",
            "lg:flex lg:basis-1/2 lg:flex-col lg:items-center lg:justify-center",
          )}
        >
          <div className={clsx("lg:w-2/3 lg:max-w-[450px]")}>
            <h1 className={clsx("text-lg uppercase")}>{product.title}</h1>
            <ProductInteractive
              dictionary={dictionary}
              minVariantPrice={product.priceRange.minVariantPrice}
              shippingDelays={product.customMetafields.shippingDelays}
              variants={product.variants}
            />
            <div
              className={clsx(s["product-page__description"], "mt-6")}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </div>
      </div>
      {isProductWithSingleAdditionalVideo(product) ? (
        isProductWithMultipleAdditionalVideos(product) ? (
          <MultipleAdditionalVideos
            firstVideoDescription={
              product.customMetafields.firstAdditionalVideoDescription
            }
            firstVideoHeightRatio={
              product.customMetafields.firstAdditionalVideoHeightRatio
            }
            firstVideoPlaybackId={
              product.customMetafields.firstAdditionalVideoID
            }
            firstVideoWidthRatio={
              product.customMetafields.firstAdditionalVideoWidthRatio
            }
            inversedLayout={
              product.customMetafields.additionalVideosLayout === "inversed"
            }
            secondVideoDescription={
              product.customMetafields.secondAdditionalVideoDescription
            }
            secondVideoHeightRatio={
              product.customMetafields.secondAdditionalVideoHeightRatio
            }
            secondVideoPlaybackId={
              product.customMetafields.secondAdditionalVideoID
            }
            secondVideoWidthRatio={
              product.customMetafields.secondAdditionalVideoWidthRatio
            }
          />
        ) : (
          <SingleAdditionalVideo
            description={
              product.customMetafields.firstAdditionalVideoDescription
            }
            heightRatio={
              product.customMetafields.firstAdditionalVideoHeightRatio
            }
            inversedLayout={
              product.customMetafields.additionalVideosLayout === "inversed"
            }
            playbackId={product.customMetafields.firstAdditionalVideoID}
            widthRatio={product.customMetafields.firstAdditionalVideoWidthRatio}
          />
        )
      ) : null}
    </>
  );
};

export default ProductPage;
