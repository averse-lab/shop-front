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
        "relative ",
        "p-4",
        "flex flex-col justify-end",
        "aspect-square overflow-hidden",
      )}
      href={href}
    >
      <Image
        className={clsx(
          s["product-preview__image"],
          "-z-10",
          "object-cover object-center",
        )}
        src={imageUrl}
        alt={`photography of ${title}`}
        fill
      />
      <p className={clsx(s["product-preview__name"], "uppercase")}>{title}</p>
      <p className={clsx("text-sm font-light text-neutral-600")}>
        {price} {currency}
      </p>
    </Link>
  );
};
