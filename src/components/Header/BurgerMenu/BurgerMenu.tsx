"use client";

import { FC, useRef, useState } from "react";

import {
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";

import { useClickOutsideDetector, useBodyScrollLocker } from "@lib/hooks";

import s from "./_internal/BurgerMenu.module.scss";
import { NavItem } from "./_internal/BurgerMenu.types";

type IProps = {
  className?: string;
  nav: NavItem[];
  lang: string;
};

export type { NavItem } from "./_internal/BurgerMenu.types";

export const BurgerMenu: FC<IProps> = (props) => {
  const { nav, lang, className } = props;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <button className={clsx(className, s["burger-menu__burger"])}>
        <Bars3Icon
          className={clsx(
            "w-6 h-6",
            "lg:hover:stroke-[1.75] lg:hover:scale-105 transition-all",
          )}
          onClick={openMenu}
        />
      </button>
      <div
        ref={menuRef}
        className={clsx(
          s["burger-menu__menu"],
          open && s["burger-menu__menu--open"],
          "fixed z-20 top-0 left-0 md:top-2 md:left-2",
          "flex flex-col",
          "h-full md:h-auto w-full md:w-auto p-6",
          "uppercase bg-black  md:rounded md:shadow-md",
        )}
      >
        <XMarkIcon
          onClick={closeMenu}
          className={clsx(
            "self-end",
            "w-6 h-6",
            "cursor-pointer text-white lg:hover:stroke-2 lg:hover:scale-105 transition-all",
          )}
        />
        <div
          className={clsx(
            "flex flex-1 flex-col items-center justify-center gap-6 md:gap-4",
            "md:px-24 md:py-16",
          )}
        >
          {nav.map((navItem) => (
            <div
              className={clsx(s["burger-menu__link"], "relative", "text-white")}
              key={navItem.display}
            >
              <Link
                className={clsx("relative", "text-xl md:text-base")}
                href={`/${lang}/${navItem.url}`}
                onClick={closeMenu}
              >
                {navItem.display}
              </Link>
              <ArrowUpRightIcon
                className={clsx(
                  s["burger-menu__link-icon"],
                  "hidden lg:block",
                  "absolute top-0 bottom-0 m-auto",
                  "w-4 h-4",
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
