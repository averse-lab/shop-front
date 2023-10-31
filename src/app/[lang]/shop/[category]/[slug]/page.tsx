import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductInteractive } from "@components/[slug]/ProductInteractive/ProductInteractive";
import { ProductMultipleAdditionalVideos } from "@components/[slug]/ProductMultipleAdditionalVideos/ProductMultipleAdditionalVideos";
import { ProductSingleAdditionalVideo } from "@components/[slug]/ProductSingleAdditionalVideo/ProductSingleAdditionalVideo";
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
      images: {
        url: featuredImage.url,
        alt: featuredImage.altText,
        height: featuredImage.height,
        width: featuredImage.width,
      },
    },
    openGraph: {
      type: "website",
      title: seo.title || `${title} | Averse`,
      description: seo.description || description,
      url: `${lang}/${PAGES.shop.url}/${productType}/${slug}`,
      images: {
        url: featuredImage.url,
        alt: featuredImage.altText,
        height: featuredImage.height,
        width: featuredImage.width,
      },
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
                key={image.url}
                className={clsx("grid auto-rows-fr grid-cols-1")}
              >
                <div
                  className={clsx("relative", "aspect-square overflow-hidden")}
                >
                  <Image
                    alt={image.altText}
                    src={image.url}
                    fill
                    className={clsx("aspect-square object-cover object-center")}
                    priority={idx <= 2}
                    sizes='(min-width: 1024px) 50vw, 100vw'
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
              variants={product.variants}
              minVariantPrice={product.priceRange.minVariantPrice}
              dictionary={dictionary}
              shippingDelays={product.shippingDelays?.value}
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
          <ProductMultipleAdditionalVideos
            firstVideoPlaybackId={product.firstAdditionalVideoID.value}
            firstVideoWidthRatio={Number(
              product.firstAdditionalVideoWidthRatio.value,
            )}
            firstVideoHeightRatio={Number(
              product.firstAdditionalVideoHeightRatio.value,
            )}
            firstVideoDescription={
              product.firstAdditionalVideoDescription.value
            }
            secondVideoPlaybackId={product.secondAdditionalVideoID.value}
            secondVideoWidthRatio={Number(
              product.secondAdditionalVideoWidthRatio.value,
            )}
            secondVideoHeightRatio={Number(
              product.secondAdditionalVideoHeightRatio.value,
            )}
            secondVideoDescription={
              product.secondAdditionalVideoDescription.value
            }
            reversedLayout={
              product.additionalVideosLayout.value ===
              "player to the right / description to the left"
            }
          />
        ) : (
          <ProductSingleAdditionalVideo
            playbackId={product.firstAdditionalVideoID.value}
            widthRatio={Number(product.firstAdditionalVideoWidthRatio.value)}
            heightRatio={Number(product.firstAdditionalVideoHeightRatio.value)}
            description={product.firstAdditionalVideoDescription.value}
            reversedLayout={
              product.additionalVideosLayout.value ===
              "player to the right / description to the left"
            }
          />
        )
      ) : null}
    </>
  );
};

export default ProductPage;
