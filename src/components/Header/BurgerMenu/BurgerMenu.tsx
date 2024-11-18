"use client";

import { FC, use, useRef, useState } from "react";

import { RiArrowRightUpLine, RiMenuLine } from "@remixicon/react";
import { clsx } from "clsx";
import Link from "next/link";

import { Backdrop } from "@components/Backdrop";
import { Button } from "@components/ui/button";

import { useClickOutsideDetector } from "@lib/hooks";
import { Dictionary, Locale } from "@lib/i18n/types";
import { LinkDetail } from "@lib/routing/types";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import { MAIN_NAV } from "./_internal/BurgerMenu.constants";

type IProps = {
  className?: string;
  dictionary: Dictionary;
  lang: Locale;
};

export const BurgerMenu: FC<IProps> = (props) => {
  const { className, dictionary, lang } = props;
  const { openBurgerMenuAriaLabel, closeBurgerMenuAriaLabel } = dictionary.header;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { menuBtnColor, menuBtnIcnColor, menuBgColor } = use(HeaderContext);

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useClickOutsideDetector(menuRef.current, closeMenu, open);

  const contextInit = menuBgColor && menuBtnColor && menuBtnIcnColor;

  const nav: LinkDetail[] = Object.values(MAIN_NAV).map<LinkDetail>(({ url, i18nKey }) => ({
    href: `/${lang}/${url}`,
    display: dictionary.pages[i18nKey],
  }));

  return (
    <>
      <Backdrop activate={open} />
      <Button
        aria-label={openBurgerMenuAriaLabel}
        className={clsx(
          className,
          "transition-all delay-75 lg:[&:hover+div]:-translate-x-[calc(100%-8px)]",
          open && "lg:[&:hover+div]:!translate-x-2",
          contextInit ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
        onClick={openMenu}
        size='icon'
        variant='flat'
      >
        <RiMenuLine
          className={clsx(
            "transition-all delay-0",
            menuBtnIcnColor === "white"
              ? "text-primary-foreground/80"
              : "text-secondary-foreground/80",
          )}
          size={20}
        />
      </Button>
      <div
        className={clsx(
          "fixed left-0 top-0 z-20 md:top-2",
          "h-dvh w-screen p-6 md:h-auto md:w-auto",
          "flex flex-col",
          "uppercase text-primary-foreground backdrop-blur transition-all duration-500 ease-in-out",
          open ? "translate-x-2 opacity-100" : "-translate-x-full opacity-0",
          menuBgColor === "white" ? "bg-secondary" : "bg-primary",
        )}
        ref={menuRef}
      >
        <Button
          aria-label={closeBurgerMenuAriaLabel}
          className={clsx("absolute right-6 top-6")}
          onClick={closeMenu}
          size='icon'
          variant='flat'
        >
          <svg
            className={clsx("h-6 w-6", "transition-all duration-200 ease-out")}
            fill='none'
            height='21'
            width='22'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='m2.414 1.586 18 18M1.586 19.586l18-18' stroke='#0F0F0F' strokeWidth='4' />
          </svg>
        </Button>
        <div
          className={clsx(
            "flex flex-1 flex-col items-center justify-center gap-6 md:gap-4",
            "md:px-24 md:py-16",
          )}
        >
          {nav.map((link) => (
            <div
              className={clsx("relative", "transition-all lg:hover:translate-x-1")}
              key={link.display}
            >
              <Link
                className={clsx(
                  "relative",
                  "font-serif text-xl md:text-base",
                  "text-black",
                  "lg:[&:hover+svg]:translate-x-0 lg:[&:hover+svg]:opacity-100",
                )}
                href={link.href}
                hrefLang={lang}
                onClick={closeMenu}
              >
                {link.display}
              </Link>
              <RiArrowRightUpLine
                className={clsx(
                  "hidden lg:block",
                  "absolute bottom-0 left-[calc(100%+10px)] top-0 m-auto",
                  "-translate-x-1 text-black opacity-0 transition-all",
                )}
                size={20}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
