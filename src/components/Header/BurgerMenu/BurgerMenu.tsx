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
            "h-6 w-6",
            "transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-[1.75]",
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
          "h-full w-full p-6 md:h-auto md:w-auto",
          "bg-black uppercase  md:rounded md:shadow-md",
        )}
      >
        <button
          className={clsx(
            s["burger-menu__close-btn"],
            "p-2 lg:p-1",
            "self-end",
            "rounded-full bg-neutral-900 text-white transition-all duration-200 ease-out hover:bg-neutral-900/100 lg:bg-neutral-900/0",
          )}
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
