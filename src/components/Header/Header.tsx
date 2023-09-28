import { FC } from "react";

import { clsx } from "clsx";
import { cookies } from "next/headers";
import Link from "next/link";

import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";

import { Logo } from "@components/icons/Logo/Logo";

import { Dictionary, Locale } from "@lib/i18n/types";

import { NavItem } from "./BurgerMenu/_internal/BurgerMenu.types";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { Cart } from "./Cart/Cart";

interface IProps {
  dictionary: Dictionary;
  lang: Locale;
  transparent?: boolean;
}

export const Header: FC<IProps> = (props) => {
  const { dictionary, lang, transparent } = props;

  const nav: NavItem[] = Array.from(SECTIONS, ([_, { url, i18nKey }]) => ({
    url,
    display: dictionary.menu[i18nKey],
  }));

  const cartId = cookies().get("cartId")?.value;

  return (
    <header
      className={clsx(
        `fixed z-10 w-full grid grid-cols-3 items-center px-6 py-4 bg-transparent border-b border-neutral-200`,
        transparent === true ? "bg-transparent" : "bg-white",
      )}
    >
      <BurgerMenu nav={nav} lang={lang} />
      <Link className='justify-self-center' href='/'>
        <Logo className='h-10 w-10 md:w-16 md:h-16' />
      </Link>
      <Cart dictionary={dictionary} lang={lang} cartId={cartId} />
    </header>
  );
};
