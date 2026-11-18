import { FC } from "react";

import clsx from "clsx";

import { ShopifyImage } from "@components/ShopifyImage/ShopifyImage";

import { getPlaceholder } from "@lib/server-utils";

type Props = {
  imgAlt: string;
  imgSrc: string;
};

export const ProductSlide: FC<Props> = async (props) => {
  const { imgAlt, imgSrc } = props;

  const img = await fetch(imgSrc);
  const imgArrayBuffer = await img.arrayBuffer();
  const placeholder = await getPlaceholder({
    arrayBufferSource: imgArrayBuffer,
    width: 32,
  });

  return (
    <div
      className={clsx(
        "relative",
        "aspect-square lg:border-b lg:border-border/20 lg:last:border-b-0",
      )}
    >
      <ShopifyImage
        alt={imgAlt}
        blurDataURL={placeholder}
        className={clsx("h-full w-full object-cover object-center")}
        fill
        placeholder='blur'
        sizes='(min-width: 1024px) 50vw, 100vw'
        src={imgSrc}
      />
    </div>
  );
};
