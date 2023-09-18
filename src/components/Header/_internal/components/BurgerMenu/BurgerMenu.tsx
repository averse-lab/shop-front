"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import Link from "next/link";
import s from "./_internal/BurgerMenu.module.scss";
import { NavItem } from "./_internal/BurgerMenu.types";

type IProps = {
  nav: NavItem[];
};

export type { NavItem } from "./_internal/BurgerMenu.types";

export const BurgerMenu: FC<IProps> = (props) => {
  const { nav } = props;

  const [open, setOpen] = useState(false);

  const handleBurgerClick = () => {
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Bars3Icon
        className={`${s["burger-menu__burger"]} w-6 h-6 cursor-pointer`}
        onClick={handleBurgerClick}
      />
      <div
        className={`${s["burger-menu__menu"]} ${
          open ? s["burger-menu__menu--open"] : null
        } absolute flex flex-col items-center justify-center h-full md:h-auto w-full md:w-auto uppercase gap-6 md:gap-4 md:px-24 md:py-16 bg-black top-0 left-0 md:top-2 md:left-2 md:rounded-sm`}
      >
        <XMarkIcon
          onClick={handleCloseClick}
          className={`${s["burger-menu__close"]} absolute w-6 h-6 cursor-pointer text-white top-6 md:top-4 right-6 md:right-4`}
        />
        {nav.map((navItem) => (
          <Link
            className={`${s["burger-menu__link"]} text-xl md:text-base text-white relative`}
            key={navItem.display}
            href={`/${navItem.url}`}
          >
            {navItem.display}
          </Link>
        ))}
      </div>
    </>
  );
};

// t : 36
// l : 24
