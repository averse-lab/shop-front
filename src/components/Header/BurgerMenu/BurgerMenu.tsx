"use client";

import { FC, use, useRef, useState } from "react";

import { ArrowTopRightIcon, Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
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
          "transition-all",
          contextInit ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
        onClick={openMenu}
        size='icon'
        variant='flat'
      >
        <HamburgerMenuIcon
          className={clsx(
            "size-6",
            "transition-all",
            menuBtnIcnColor === "white" ? "text-white" : "text-black",
          )}
        />
      </Button>
      <div
        className={clsx(
          "fixed left-0 top-0 z-20",
          "h-dvh w-screen md:w-auto",
          "flex flex-col",
          "transition-all ease-in-out",
          "uppercase text-primary-foreground",
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-90",
          menuBgColor === "white" ? "bg-secondary" : "bg-primary",
        )}
        ref={menuRef}
        style={{ transitionDuration: "350ms" }}
      >
        <Button
          aria-label={closeBurgerMenuAriaLabel}
          className={clsx("absolute right-4 top-4")}
          onClick={closeMenu}
          size='icon'
          variant='flat'
        >
          <Cross2Icon
            className={clsx(
              "size-6",
              "transition-all",
              menuBgColor === "black" ? "text-white" : "text-black",
            )}
          />
        </Button>
        <div
          className={clsx(
            "flex flex-1 flex-col items-center justify-center gap-6 md:gap-3",
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
                  "font-abhaya text-2xl",
                  menuBgColor === "white" ? "text-secondary-foreground" : "text-primary-foreground",
                  "lg:[&:hover+svg]:translate-x-0 lg:[&:hover+svg]:opacity-100",
                )}
                href={link.href}
                hrefLang={lang}
                onClick={closeMenu}
              >
                {link.display}
              </Link>
              <ArrowTopRightIcon
                className={clsx(
                  "hidden lg:block",
                  "size-6",
                  "absolute bottom-0 left-[calc(100%+6px)] top-0 m-auto",
                  "-translate-x-1 opacity-0 transition-all",
                  menuBgColor === "white" ? "text-secondary-foreground" : "text-primary-foreground",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
