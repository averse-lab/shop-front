import React, { FC } from "react";
import { getProduct } from "@averse/lib/shopify";
import { ProductDescription } from "@averse/components/product/product-selector";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HIDDEN_PRODUCT_TAG } from "@averse/lib/constants";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: "en" | "fr" };
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
  params: { slug: string };
}

const Page: FC<IProps> = async (props) => {
  const { slug } = props.params;

  const product = await getProduct(slug);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 w-full h-auto md:h-screen'>
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
    </div>
  );
};

export default Page;
