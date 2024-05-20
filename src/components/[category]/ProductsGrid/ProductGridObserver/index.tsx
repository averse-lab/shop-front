"use client";

import { FC, use, useEffect } from "react";

import { StateSetter } from "@lib/types";
import { throttle } from "@lib/utils";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

type IProps = {};

const getHeaderIconsColorUpdater = (
  logoMiddleX: number | undefined,
  setMenuBtnIcnColor: StateSetter<"black" | "white" | undefined>,
  setCartBtnIcnColor: StateSetter<"black" | "white" | undefined>,
  setLangBtnIcnColor: StateSetter<"black" | "white" | undefined>,
) =>
  throttle(() => {
    if (logoMiddleX === undefined) {
      return;
    }

    if (window.scrollY > logoMiddleX) {
      setMenuBtnIcnColor("white");
      setCartBtnIcnColor("white");
      setLangBtnIcnColor("white");
    } else {
      setMenuBtnIcnColor("black");
      setCartBtnIcnColor("black");
      setLangBtnIcnColor("black");
    }
  }, 200);

export const ProductGridObserver: FC<IProps> = () => {
  const { logoRef, setMenuBtnIcnColor, setCartBtnIcnColor, setLangBtnIcnColor } =
    use(HeaderContext);

  useEffect(() => {
    if (
      !logoRef ||
      !logoRef.current ||
      !setMenuBtnIcnColor ||
      !setCartBtnIcnColor ||
      !setLangBtnIcnColor
    ) {
      return;
    }

    const logoBoundingRect = logoRef.current.getBoundingClientRect();
    const logoMiddleX = logoBoundingRect.top + logoBoundingRect.height / 2;

    const headerIconsColorUpdater = getHeaderIconsColorUpdater(
      logoMiddleX,
      setMenuBtnIcnColor,
      setCartBtnIcnColor,
      setLangBtnIcnColor,
    );

    document.addEventListener("scroll", headerIconsColorUpdater);

    return () => {
      document.removeEventListener("scroll", headerIconsColorUpdater);
    };
  }, [logoRef, setCartBtnIcnColor, setLangBtnIcnColor, setMenuBtnIcnColor]);

  return null;
};
