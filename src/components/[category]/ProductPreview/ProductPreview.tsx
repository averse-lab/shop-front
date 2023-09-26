import { FC } from "react";

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
      className={`${className || ""} ${
        s["product-preview"]
      } relative overflow-hidden flex flex-col justify-end p-4`}
      href={href}
    >
      <Image
        className={`${s["product-preview__image"]} object-cover object-center -z-10`}
        src={imageUrl}
        alt={`photography of ${title}`}
        fill
      />
      <p className='uppercase'>{title}</p>
      <p className='text-sm font-light '>
        {price} {currency}
      </p>
    </Link>
  );
};
