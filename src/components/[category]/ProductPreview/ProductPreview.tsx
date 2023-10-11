import { FC } from "react";

import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import s from "./_internal/ProductPreview.module.scss";

interface IProps {
  className?: string;
  href: string;
  imageUrl: string;
  title: string;
  price: string;
  currency: string;
}

export const ProductPreview: FC<IProps> = (props) => {
  const { className, href, imageUrl, title, price, currency } = props;

  return (
    <Link
      className={clsx(
        className,
        s["product-preview"],
        "relative overflow-hidden",
        "flex flex-col justify-end",
        "p-4",
        "aspect-square",
      )}
      href={href}
    >
      <Image
        className={clsx(
          s["product-preview__image"],
          "object-cover object-center -z-10",
        )}
        src={imageUrl}
        alt={`photography of ${title}`}
        fill
      />
      <p className={clsx(s["product-preview__name"], "uppercase")}>{title}</p>
      <p className='text-sm font-light text-neutral-600'>
        {price} {currency}
      </p>
    </Link>
  );
};
