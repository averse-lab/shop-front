import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { MAIN_NAV } from "@averse/app/[lang]/_internal/HomePage.constants";

import { Logo } from "@components/icons/Logo/Logo";

import { Dictionary, Locale } from "@lib/i18n/types";
import { LinkDetail } from "@lib/routing/types";

import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { Cart } from "./Cart/Cart";

interface IProps {
  dictionary: Dictionary;
  lang: Locale;
}

export const Header: FC<IProps> = (props) => {
  const { dictionary, lang } = props;

  const nav: LinkDetail[] = Object.values(MAIN_NAV).map<LinkDetail>(
    ({ url, i18nKey }) => ({
      href: `/${lang}/${url}`,
      display: dictionary.pages[i18nKey],
    }),
  );

  return (
    <header
      className={clsx(
        "fixed z-20",
        "w-full px-6 py-4",
        "grid grid-cols-3 items-center",
        "bg-transparent",
      )}
    >
      <BurgerMenu nav={nav} className={clsx("justify-self-start")} />
      <Link className={clsx("justify-self-center")} href='/'>
        <Logo className={clsx("h-10 w-10 md:h-16 md:w-16")} />
      </Link>
      <Cart
        dictionary={dictionary}
        lang={lang}
        className={clsx("justify-self-end")}
      />
    </header>
  );
};
