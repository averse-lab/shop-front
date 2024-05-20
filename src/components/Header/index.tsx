"use client";

import { FC, use } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { Cart } from "@components/Header/Cart/Cart";
import { LangMenu } from "@components/Header/LangMenu/LangMenu";
import { Logo } from "@components/icons/Logo/Logo";

import { useSmoothScroll } from "@lib/hooks";
import { Dictionary, Locale } from "@lib/i18n/types";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import { BurgerMenu } from "./BurgerMenu/BurgerMenu";

interface IProps {
  dictionary: Dictionary;
  lang: Locale;
}

export const Header: FC<IProps> = (props) => {
  const { dictionary, lang } = props;
  const { averseHomeAriaLabel } = dictionary.header;

  const { headerBgColor } = use(HeaderContext);
  useSmoothScroll();

  return (
    <header
      className={clsx(
        "fixed z-20",
        "w-full px-6 py-4",
        "grid grid-cols-3 items-center",
        headerBgColor === "white" ? "border-b border-neutral-200 bg-white" : "bg-transparent",
      )}
    >
      <BurgerMenu className={clsx("justify-self-start")} dictionary={dictionary} lang={lang} />
      <Link
        aria-label={averseHomeAriaLabel}
        className={clsx("justify-self-center")}
        href={`/${lang}`}
        hrefLang={lang}
      >
        <Logo className={clsx("h-10 w-10 md:h-16 md:w-16")} />
      </Link>
      <div className={clsx("flex flex-row items-center justify-end gap-2 md:gap-4")}>
        <LangMenu className={clsx("justify-self-end")} dictionary={dictionary} lang={lang} />
        <Cart className={clsx("justify-self-end")} dictionary={dictionary} lang={lang} />
      </div>
    </header>
  );
};
