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
import { getProduct } from "@lib/shopify";
import { HIDDEN_PRODUCT_TAG } from "@lib/shopify/constants";
import { getSupportedLanguageCodeFromLocale } from "@lib/utils";

import s from "./_internal/ProductPage.module.scss";
import {
  isProductWithSingleAdditionalVideo,
  isProductWithMultipleAdditionalVideos,
} from "./_internal/ProductPage.utils";

type Params = { slug: string; category: string; lang: Locale };

// export async function generateStaticParams() {
//   const products = await getProducts({ lang: "EN" });

//   return I18N_CONFIG.locales.reduce<Params[]>((staticParams, curr) => {
//     products.forEach(({ productType, handle }) => {
//       staticParams.push({ lang: curr, category: productType, slug: handle });
//     });

//     return staticParams;
//   }, []);
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: Locale };
}): Promise<Metadata> {
  const languageCode = getSupportedLanguageCodeFromLocale(params.lang);
  const product = await getProduct(params.slug, languageCode);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

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
            {product.images.map((image) => (
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
                    priority
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
            firstVideodDescription={
              product.firstAdditionalVideoDescription.value
            }
            secondVideoPlaybackId={product.secondAdditionalVideoID.value}
            secondVideoWidthRatio={Number(
              product.secondAdditionalVideoWidthRatio.value,
            )}
            secondVideoHeightRatio={Number(
              product.secondAdditionalVideoHeightRatio.value,
            )}
            secondVideodDescription={
              product.secondAdditionalVideoDescription.value
            }
            inversedLayout={
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
            inversedLayout={
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
