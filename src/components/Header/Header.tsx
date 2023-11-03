"use client";

import { FC, useContext } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { Logo } from "@components/icons/Logo/Logo";

import { Dictionary, Locale } from "@lib/i18n/types";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { Cart } from "./Cart/Cart";

interface IProps {
  dictionary: Dictionary;
  lang: Locale;
}

export const Header: FC<IProps> = (props) => {
  const { dictionary, lang } = props;
  const { averseHomeAriaLabel } = dictionary.header;

  const { whiteBackground } = useContext(HeaderContext) || {};

  return (
    <header
      className={clsx(
        "fixed z-20",
        "w-full px-6 py-4",
        "grid grid-cols-3 items-center",
        whiteBackground
          ? "border-b border-neutral-200 bg-white"
          : "bg-transparent",
      )}
    >
      <BurgerMenu
        className={clsx("justify-self-start")}
        dictionary={dictionary}
        lang={lang}
      />
      <Link
        aria-label={averseHomeAriaLabel}
        className={clsx("justify-self-center")}
        href='/'
      >
        <Logo className={clsx("h-10 w-10 md:h-16 md:w-16")} />
      </Link>
      <Cart
        className={clsx("justify-self-end")}
        dictionary={dictionary}
        lang={lang}
      />
    </header>
  );
};

<div
  className={clsx(
    "fixed left-0 top-0 z-10",
    "h-[72px] w-full md:h-[96px]",
    "border-b border-neutral-200 bg-white",
  )}
></div>;
