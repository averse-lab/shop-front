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
) =>
  throttle(() => {
    if (logoMiddleX === undefined) {
      return;
    }

    if (window.scrollY > logoMiddleX) {
      setMenuBtnIcnColor("white");
      setCartBtnIcnColor("white");
    } else {
      setMenuBtnIcnColor("black");
      setCartBtnIcnColor("black");
    }
  }, 200);

export const ProductGridObserver: FC<IProps> = () => {
  const { logoRef, setMenuBtnIcnColor, setCartBtnIcnColor } = use(HeaderContext);

  useEffect(() => {
    if (!logoRef || !logoRef.current || !setMenuBtnIcnColor || !setCartBtnIcnColor) {
      return;
    }
    const logoBoundingRect = logoRef.current.getBoundingClientRect();
    const logoMiddleX = logoBoundingRect.top + logoBoundingRect.height / 2;

    const headerIconsColorUpdater = getHeaderIconsColorUpdater(
      logoMiddleX,
      setMenuBtnIcnColor,
      setCartBtnIcnColor,
    );

    document.addEventListener("scroll", headerIconsColorUpdater);

    return () => {
      document.removeEventListener("scroll", headerIconsColorUpdater);
    };
  }, [logoRef, setCartBtnIcnColor, setMenuBtnIcnColor]);

  return null;
};
