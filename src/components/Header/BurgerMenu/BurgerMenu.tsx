"use client";

import { FC, useContext, useRef, useState } from "react";

import {
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";

import { HeaderContext } from "@averse/contexts/HeaderContext/HeaderContext";

import { useClickOutsideDetector, useBodyScrollLocker } from "@lib/hooks";
import { Dictionary } from "@lib/i18n/types";
import { LinkDetail } from "@lib/routing/types";

import s from "./_internal/BurgerMenu.module.scss";

type IProps = {
  className?: string;
  nav: LinkDetail[];
  dictionary: Dictionary;
};

export const BurgerMenu: FC<IProps> = (props) => {
  const { nav, className, dictionary } = props;
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
  useClickOutsideDetector(menuRef.current, closeMenu, open === true);

  return (
    <>
      <button
        className={clsx(className, s["burger-menu__burger"])}
        aria-label={openBurgerMenuAriaLabel}
      >
        <Bars3Icon
          className={clsx(
            "h-6 w-6",
            "transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-[1.75]",
            whiteIcons && "text-white",
          )}
          onClick={openMenu}
        />
      </button>
      <div
        ref={menuRef}
        className={clsx(
          s["burger-menu__menu"],
          open && s["burger-menu__menu--open"],
          "fixed left-0 top-0 z-20 md:left-2 md:top-2",
          "flex flex-col",
          "h-[100dvh] w-screen p-6 md:h-auto md:w-auto",
          "uppercase  md:rounded md:shadow-md",
          whiteIcons ? "bg-white text-black" : "bg-black text-white",
        )}
      >
        <button
          className={clsx(
            s["burger-menu__close-btn"],
            "p-2 lg:p-1",
            "self-end",
            "rounded-full transition-all duration-200 ease-out",
            whiteIcons
              ? "bg-neutral-100 text-black"
              : "bg-neutral-900 text-white",
            whiteIcons
              ? "lg:bg-neutral-100/0 lg:hover:bg-neutral-100/100"
              : "lg:bg-neutral-900/0 lg:hover:bg-neutral-900/100",
          )}
          aria-label={closeBurgerMenuAriaLabel}
        >
          <XMarkIcon
            onClick={closeMenu}
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
              className={clsx(s["burger-menu__link"], "relative")}
              key={link.display}
            >
              <Link
                className={clsx("relative", "text-xl md:text-base")}
                href={link.href}
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
