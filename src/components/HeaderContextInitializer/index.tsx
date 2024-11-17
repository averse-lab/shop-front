"use client";

import { FC, use, useEffect } from "react";

import {
  HEADER_CONTEXT_INIT,
  HeaderContext,
  HeaderContextValue,
} from "@contexts/HeaderContext/HeaderContext";

type IProps = Pick<
  HeaderContextValue,
  | "logoVisible"
  | "headerBgColor"
  | "menuBtnColor"
  | "menuBtnIcnColor"
  | "menuBgColor"
  | "cartBtnColor"
  | "cartBtnIcnColor"
  | "logoType"
  | "logoColor"
> & {
  desktopMenuBtnIcnColor?: HeaderContextValue["menuBtnIcnColor"];
  desktopCartBtnIcnColor?: HeaderContextValue["cartBtnIcnColor"];
};

export const HeaderContextInitializer: FC<IProps> = (props) => {
  const {
    logoVisible,
    headerBgColor,
    menuBtnColor,
    menuBtnIcnColor,
    menuBgColor,
    cartBtnColor,
    cartBtnIcnColor,
    desktopMenuBtnIcnColor,
    desktopCartBtnIcnColor,
    logoType,
    logoColor,
  } = props;
  const {
    setLogoVisible,
    setHeaderBgColor,
    setMenuBgColor,
    setMenuBtnColor,
    setMenuBtnIcnColor,
    setCartBtnColor,
    setCartBtnIcnColor,
    setLogoType,
    setLogoColor,
  } = use(HeaderContext);

  useEffect(() => {
    if (
      !setLogoVisible ||
      !setHeaderBgColor ||
      !setMenuBgColor ||
      !setMenuBtnColor ||
      !setMenuBtnIcnColor ||
      !setCartBtnColor ||
      !setCartBtnIcnColor ||
      !setLogoType ||
      !setLogoColor
    ) {
      return;
    }

    setLogoVisible(logoVisible ?? HEADER_CONTEXT_INIT.logoVisible);
    setHeaderBgColor(headerBgColor ?? HEADER_CONTEXT_INIT.headerBgColor);
    setMenuBtnColor(menuBtnColor ?? HEADER_CONTEXT_INIT.menuBtnColor);
    setCartBtnColor(cartBtnColor ?? HEADER_CONTEXT_INIT.cartBtnColor);
    setMenuBgColor(menuBgColor ?? HEADER_CONTEXT_INIT.menuBgColor);
    setLogoType(logoType ?? HEADER_CONTEXT_INIT.logoType);
    setLogoColor(logoColor ?? HEADER_CONTEXT_INIT.logoColor);

    if (window.matchMedia("(min-width: 1024px)").matches) {
      setMenuBtnIcnColor(
        desktopMenuBtnIcnColor ?? menuBtnIcnColor ?? HEADER_CONTEXT_INIT.menuBtnIcnColor,
      );
      setCartBtnIcnColor(
        desktopCartBtnIcnColor ?? cartBtnIcnColor ?? HEADER_CONTEXT_INIT.cartBtnIcnColor,
      );
    } else {
      setMenuBtnIcnColor(menuBtnIcnColor ?? HEADER_CONTEXT_INIT.menuBtnIcnColor);
      setCartBtnIcnColor(cartBtnIcnColor ?? HEADER_CONTEXT_INIT.cartBtnIcnColor);
    }
  }, [
    cartBtnColor,
    cartBtnIcnColor,
    desktopCartBtnIcnColor,
    desktopMenuBtnIcnColor,
    headerBgColor,
    logoVisible,
    menuBgColor,
    menuBtnColor,
    menuBtnIcnColor,
    logoType,
    logoColor,
    setCartBtnColor,
    setCartBtnIcnColor,
    setHeaderBgColor,
    setLogoVisible,
    setMenuBgColor,
    setMenuBtnColor,
    setMenuBtnIcnColor,
    setLogoType,
    setLogoColor,
  ]);

  return <></>;
};
