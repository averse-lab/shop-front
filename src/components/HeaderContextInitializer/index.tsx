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
>;

export const HeaderContextInitializer: FC<IProps> = (props) => {
  const {
    logoVisible,
    headerBgColor,
    menuBtnColor,
    menuBtnIcnColor,
    menuBgColor,
    cartBtnColor,
    cartBtnIcnColor,
  } = props;
  const {
    setLogoVisible,
    setHeaderBgColor,
    setMenuBgColor,
    setMenuBtnColor,
    setMenuBtnIcnColor,
    setCartBtnColor,
    setCartBtnIcnColor,
  } = use(HeaderContext);

  useEffect(() => {
    if (
      !setLogoVisible ||
      !setHeaderBgColor ||
      !setMenuBgColor ||
      !setMenuBtnColor ||
      !setMenuBtnIcnColor ||
      !setCartBtnColor ||
      !setCartBtnIcnColor
    ) {
      return;
    }

    setLogoVisible(logoVisible ?? HEADER_CONTEXT_INIT.logoVisible);
    setHeaderBgColor(headerBgColor ?? HEADER_CONTEXT_INIT.headerBgColor);
    setMenuBtnColor(menuBtnColor ?? HEADER_CONTEXT_INIT.menuBtnColor);
    setMenuBtnIcnColor(menuBtnIcnColor ?? HEADER_CONTEXT_INIT.menuBtnIcnColor);
    setCartBtnColor(cartBtnColor ?? HEADER_CONTEXT_INIT.cartBtnColor);
    setCartBtnIcnColor(cartBtnIcnColor ?? HEADER_CONTEXT_INIT.cartBtnIcnColor);
    setMenuBgColor(menuBgColor ?? HEADER_CONTEXT_INIT.menuBgColor);
  }, [
    cartBtnColor,
    cartBtnIcnColor,
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
  ]);

  return <></>;
};
