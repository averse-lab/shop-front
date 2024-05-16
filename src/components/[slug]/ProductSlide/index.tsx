import { FC } from "react";

import clsx from "clsx";
import Image from "next/image";

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
    <div className={clsx("relative", "aspect-square border-b border-border/20 last:border-b-0")}>
      <Image
        alt={imgAlt}
        blurDataURL={placeholder}
        className={clsx("h-full w-full object-cover object-center")}
        fill
        placeholder='blur'
        quality={100}
        sizes='(min-width: 1024px) 50vw, 100vw'
        src={imgSrc}
      />
    </div>
  );
};
