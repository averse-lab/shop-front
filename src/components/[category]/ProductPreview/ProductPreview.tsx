import { FC, MutableRefObject, useEffect, useRef, useState } from "react";

import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { InView, IntersectionOptions } from "react-intersection-observer";

import { Locale } from "@lib/i18n/types";

import s from "./_internal/ProductPreview.module.scss";

interface IProps {
  className?: string;
  href: string;
  imageUrl: string;
  title: string;
  price: string;
  currency: string;
  index: number;
  light: boolean;
  lang: Locale;
  onAnimationEnd: (e: AnimationEvent) => void;
  productsInViewAtInit: MutableRefObject<number>;
}

export const ProductPreview: FC<IProps> = (props) => {
  const {
    className,
    href,
    lang,
    imageUrl,
    title,
    price,
    currency,
    index,
    light,
    onAnimationEnd,
    productsInViewAtInit,
  } = props;

  const [inView, setInView] = useState(false);
  const [inViewAtInit, setInViewAtInit] = useState<boolean>();
  const ref = useRef<HTMLAnchorElement>(null);
  const inViewChanges = useRef(0);

  const element = ref.current;

  useEffect(() => {
    if (element === null) {
      return;
    }

    element.addEventListener("animationend", onAnimationEnd);

    return () => {
      element.removeEventListener("animationend", onAnimationEnd);
    };
  }, [element, onAnimationEnd]);

  const handleInViewChange: IntersectionOptions["onChange"] = (inView) => {
    setInView(inView);
    inViewChanges.current += 1;

    if (!inView || inViewChanges.current !== 1) {
      return;
    }

    productsInViewAtInit.current += 1;
    setInViewAtInit(true);
  };

  return (
    <InView
      className={clsx(
        "[&:nth-child(2n)>a]:anim-delay-100",
        inViewAtInit &&
          "[&:nth-child(10)>a]:!anim-delay-900 [&:nth-child(11)>a]:!anim-delay-1000 [&:nth-child(12)>a]:!anim-delay-1100 [&:nth-child(2)>a]:!anim-delay-100 [&:nth-child(3)>a]:!anim-delay-200 [&:nth-child(4)>a]:!anim-delay-300 [&:nth-child(5)>a]:!anim-delay-400 [&:nth-child(6)>a]:!anim-delay-500 [&:nth-child(7)>a]:!anim-delay-600 [&:nth-child(8)>a]:!anim-delay-700 [&:nth-child(9)>a]:!anim-delay-800",
        "lg:[&:nth-child(4n+2)>a]:anim-delay-100 lg:[&:nth-child(4n+3)>a]:anim-delay-200 lg:[&:nth-child(4n+4)>a]:anim-delay-300",
        "",
      )}
      onChange={handleInViewChange}
      threshold={0.25}
      triggerOnce
    >
      <Link
        className={clsx(
          className,
          s["product-preview"],
          "relative ",
          "p-4",
          "flex flex-col justify-end",
          "aspect-square overflow-hidden opacity-0",
          inView && "animate-productPreviewAppearing",
        )}
        href={href}
        hrefLang={lang}
        ref={ref}
      >
        <Image
          alt={`photography of ${title}`}
          className={clsx(
            s["product-preview__image"],
            "-z-10",
            "object-cover object-center",
          )}
          fill
          priority={index < 6}
          sizes='(min-width: 1024px) 25vw, 50vw'
          src={imageUrl}
        />
        <p
          className={clsx(
            s["product-preview__name"],
            "uppercase",
            "text-sm lg:text-base",
            light ? "text-white" : "text-black",
          )}
        >
          {title}
        </p>
        <p
          className={clsx(
            "font-serif text-sm font-light lg:text-base",
            light ? "text-neutral-400" : "text-black",
          )}
        >
          {Number(price).toFixed()} {currency}
        </p>
      </Link>
    </InView>
  );
};
