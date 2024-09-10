"use client";

import { FC, useContext, useRef, useState } from "react";

import {
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";

import { Button } from "@components/Button/Button";

import { useBodyScrollLocker, useClickOutsideDetector } from "@lib/hooks";
import { Dictionary, Locale } from "@lib/i18n/types";
import { LinkDetail } from "@lib/routing/types";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import { MAIN_NAV } from "./_internal/BurgerMenu.constants";
import s from "./_internal/BurgerMenu.module.scss";

type IProps = {
  className?: string;
  dictionary: Dictionary;
  lang: Locale;
};

export const BurgerMenu: FC<IProps> = (props) => {
  const { className, dictionary, lang } = props;
  const { openBurgerMenuAriaLabel, closeBurgerMenuAriaLabel } =
    dictionary.header;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { whiteIcons } = useContext(HeaderContext) || {};

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useBodyScrollLocker(open);
  useClickOutsideDetector(menuRef.current, closeMenu, open);

  const nav: LinkDetail[] = Object.values(MAIN_NAV).map<LinkDetail>(
    ({ url, i18nKey }) => ({
      href: `/${lang}/${url}`,
      display: dictionary.pages[i18nKey],
    }),
  );

  return (
    <>
      <Button
        aria-label={openBurgerMenuAriaLabel}
        className={clsx(className, s["burger-menu__burger"])}
        color='white'
        element='button'
        mini
        onClick={openMenu}
        transparent
      >
        <Bars3Icon
          className={clsx(
            s["burger-menu__burger-icon"],
            "h-6 w-6",
            "!transition-all !duration-200 !ease-out",
            whiteIcons && "text-white",
          )}
        />
      </Button>
      <div
        className={clsx(
          s["burger-menu__menu"],
          open && s["burger-menu__menu--open"],
          "fixed left-0 top-0 z-20 md:left-2 md:top-2",
          "flex flex-col",
          "h-[100dvh] w-screen p-6 md:h-auto md:w-auto",
          "uppercase md:shadow-md",
          whiteIcons ? "bg-white text-black" : "bg-black text-white",
        )}
        ref={menuRef}
      >
        <button
          aria-label={closeBurgerMenuAriaLabel}
          className={clsx(
            s["burger-menu__close-btn"],
            "p-2 lg:p-1",
            "self-end",
            "transition-all duration-200 ease-out",
            whiteIcons
              ? "bg-neutral-100 text-black"
              : "bg-neutral-900 text-white",
            whiteIcons
              ? "lg:bg-neutral-100/0 lg:hover:bg-neutral-100/100"
              : "lg:bg-neutral-900/0 lg:hover:bg-neutral-900/100",
          )}
          onClick={closeMenu}
        >
          <XMarkIcon
            className={clsx("h-6 w-6", "transition-all duration-200 ease-out")}
          />
        </button>
        <div
          className={clsx(
            "flex flex-1 flex-col items-center justify-center gap-6 md:gap-4",
            "md:px-24 md:py-16",
          )}
        >
          {nav.map((link) => (
            <div
              className={clsx(
                s["burger-menu__link"],
                "relative",
                "transition-all lg:hover:translate-x-1",
              )}
              key={link.display}
            >
              <Link
                className={clsx("relative", "text-xl md:text-base")}
                href={link.href}
                hrefLang={lang}
                onClick={closeMenu}
              >
                {link.display}
              </Link>
              <ArrowUpRightIcon
                className={clsx(
                  s["burger-menu__link-icon"],
                  "hidden lg:block",
                  "absolute bottom-0 top-0 m-auto",
                  "h-4 w-4",
                  "stroke-2",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
