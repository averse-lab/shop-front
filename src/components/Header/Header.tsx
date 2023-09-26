import { FC } from "react";

import Link from "next/link";

import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";

import { Logo } from "@components/icons/Logo/Logo";

import { Dictionary, Locale } from "@lib/i18n/types";

import { NavItem } from "./BurgerMenu/_internal/BurgerMenu.types";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";

interface IProps {
  transparent?: boolean;
  dictionary: Dictionary;
  lang: Locale;
}

export const Header: FC<IProps> = (props) => {
  const { dictionary, lang } = props;

  const nav: NavItem[] = Array.from(SECTIONS, ([_, { url, i18nKey }]) => ({
    url,
    display: dictionary.menu[i18nKey],
  }));

  return (
    <header className='grid grid-cols-3 items-center px-6 py-4'>
      <BurgerMenu nav={nav} lang={lang} />
      <Link className='justify-self-center' href='/'>
        <Logo className='h-10 w-10 md:w-16 md:h-16' />
      </Link>
      <ShoppingCart dictionary={dictionary} lang={lang} />
    </header>
  );
};
