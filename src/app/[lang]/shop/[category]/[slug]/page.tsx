import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductInteractive } from "@components/[slug]/ProductInteractive/ProductInteractive";
import { Slider } from "@components/Slider/Slider";

import { HIDDEN_PRODUCT_TAG } from "@lib/constants";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getProduct } from "@lib/shopify";

import s from "./_internal/ProductPage.module.scss";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: Locale };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

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
  params: { slug: string; lang: Locale };
}

const ProductPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { slug, lang } = params;

  const product = await getProduct(slug);
  const dictionary = await getDictionary(lang);

  if (product === undefined) {
    notFound();
  }

  return (
    <>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:basis-1/2'>
          <Slider
            className={s["product-page__slider"]}
            options={{
              breakpoints: {
                "(min-width: 1024px)": {
                  active: false,
                },
              },
            }}
          >
            {product.images.map((image) => (
              <div key={image.url} className='grid grid-cols-1 auto-rows-fr'>
                <div className={`aspect-square relative overflow-hidden`}>
                  <Image
                    alt={image.altText}
                    src={image.url}
                    fill
                    className='aspect-square object-center object-cover'
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className='px-6 py-4 lg:sticky lg:top-0 lg:h-screen lg:basis-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center'>
          <div className='lg:w-2/3 lg:max-w-[450px]'>
            <h1 className='text-lg uppercase'>{product.title}</h1>
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
      <div className='h-screen w-full bg-neutral-600'></div>
      {/* <div className='grid grid-cols-1 md:grid-cols-2 w-full h-auto md:h-screen'>
        {product && (
          <>
            <div className='overflow-auto md:h-screen'>
              {product?.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  alt={`Product Image ${index + 1}`}
                  style={{ objectFit: "cover" }}
                />
              ))}
            </div>
            <div className='overflow-auto bg-white flex flex-col items-center justify-center text-black md:h-screen overflow-x-hidden overflow-y-hidden'>
              <ProductDescription product={product} />
              <div className='mx-5'>
                <p className={"font-bold text-xs"}>
                  Design in France, made in France
                </p>
                <div className={"border-t-2 border-black mt-3"}>
                  <div className={"flex mt-3"}>
                    <h2
                      className={
                        "font-bold text-xl text-center text-black mt-4 mb-4"
                      }
                    >
                      Materials
                    </h2>
                    <p>{product.material?.value}</p>
                  </div>
                </div>
                <div className={"border-t- border-black mt-3"}>
                  <div className={"flex mt-3"}>
                    <h2
                      className={
                        "font-bold text-xl text-center text-black mt-4 mb-4"
                      }
                    >
                      Concept
                    </h2>
                    <p>{product.material?.value}</p>
                  </div>
                </div>
                <div className={"border-t-2 border-black mt-3"}>
                  <div className={"flex mt-3"}>
                    <h2
                      className={
                        "font-bold text-xl text-center text-black mt-4 mb-4"
                      }
                    >
                      Materials
                    </h2>
                    <p>{product.material?.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div> */}
    </>
  );
};

export default ProductPage;
