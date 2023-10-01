"use client";

import { FC, useState } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

import { useLockBodyScroll } from "@lib/hooks";

import s from "./_internal/BurgerMenu.module.scss";
import { NavItem } from "./_internal/BurgerMenu.types";

type IProps = {
  nav: NavItem[];
  lang: string;
};

export type { NavItem } from "./_internal/BurgerMenu.types";

export const BurgerMenu: FC<IProps> = (props) => {
  const { nav, lang } = props;

  const [open, setOpen] = useState(false);

  useLockBodyScroll(open);

  const handleBurgerClick = () => {
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  return (
    <>
      <button className={clsx(s["burger-menu__burger"])}>
        <Bars3Icon className={`w-6 h-6`} onClick={handleBurgerClick} />
      </button>
      <div
        className={`${s["burger-menu__menu"]} ${
          open ? s["burger-menu__menu--open"] : null
        } fixed flex flex-col  z-20 h-full md:h-auto w-full md:w-auto p-6 uppercase bg-black top-0 left-0 md:top-2 md:left-2 md:rounded`}
      >
        <XMarkIcon
          onClick={handleCloseClick}
          className={`${s["burger-menu__close"]} w-6 h-6 cursor-pointer text-white self-end`}
        />
        <div className='flex flex-1 flex-col items-center justify-center gap-6 md:gap-4 md:px-24 md:py-16'>
          {nav.map((navItem) => (
            <Link
              className={`${s["burger-menu__link"]} text-xl md:text-base text-white relative`}
              key={navItem.display}
              href={`/${lang}/${navItem.url}`}
              onClick={handleCloseClick}
            >
              {navItem.display}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
