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
  | "langBtnColor"
  | "langBtnIcnColor"
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
    langBtnColor,
    langBtnIcnColor,
    desktopMenuBtnIcnColor,
    desktopCartBtnIcnColor,
  } = props;
  const {
    setLogoVisible,
    setHeaderBgColor,
    setMenuBgColor,
    setMenuBtnColor,
    setMenuBtnIcnColor,
    setCartBtnColor,
    setCartBtnIcnColor,
    setLangBtnColor,
    setLangBtnIcnColor,
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
      !setLangBtnColor ||
      !setLangBtnIcnColor
    ) {
      return;
    }

    setLogoVisible(logoVisible ?? HEADER_CONTEXT_INIT.logoVisible);
    setHeaderBgColor(headerBgColor ?? HEADER_CONTEXT_INIT.headerBgColor);
    setMenuBtnColor(menuBtnColor ?? HEADER_CONTEXT_INIT.menuBtnColor);
    setCartBtnColor(cartBtnColor ?? HEADER_CONTEXT_INIT.cartBtnColor);
    setMenuBgColor(menuBgColor ?? HEADER_CONTEXT_INIT.menuBgColor);
    setLangBtnColor(langBtnColor ?? HEADER_CONTEXT_INIT.langBtnColor);

    if (window.matchMedia("(min-width: 1024px)").matches) {
      setMenuBtnIcnColor(
        desktopMenuBtnIcnColor ?? menuBtnIcnColor ?? HEADER_CONTEXT_INIT.menuBtnIcnColor,
      );
      setCartBtnIcnColor(
        desktopCartBtnIcnColor ?? cartBtnIcnColor ?? HEADER_CONTEXT_INIT.cartBtnIcnColor,
      );
      setLangBtnIcnColor(langBtnIcnColor ?? HEADER_CONTEXT_INIT.langBtnIcnColor);
    } else {
      setMenuBtnIcnColor(menuBtnIcnColor ?? HEADER_CONTEXT_INIT.menuBtnIcnColor);
      setCartBtnIcnColor(cartBtnIcnColor ?? HEADER_CONTEXT_INIT.cartBtnIcnColor);
      setLangBtnIcnColor(langBtnIcnColor ?? HEADER_CONTEXT_INIT.langBtnIcnColor);
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
    setCartBtnColor,
    setCartBtnIcnColor,
    setHeaderBgColor,
    setLogoVisible,
    setMenuBgColor,
    setMenuBtnColor,
    setMenuBtnIcnColor,
    setLangBtnColor,
    setLangBtnIcnColor,
    langBtnColor,
    langBtnIcnColor,
  ]);

  return <></>;
};
