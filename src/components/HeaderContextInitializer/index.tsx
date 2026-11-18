"use client";

import { FC, use, useEffect } from "react";

import {
  HEADER_CONTEXT_INIT,
  HeaderContext,
  HeaderContextValue,
} from "@contexts/HeaderContext/HeaderContext";

type HeaderSettings = Pick<
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
>;

type IProps = HeaderSettings & {
  /** Overrides applied from the `lg` breakpoint up. */
  desktop?: Partial<HeaderSettings>;
};

export const HeaderContextInitializer: FC<IProps> = (props) => {
  const { desktop, ...mobile } = props;
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

  // Primitive key so a new `desktop`/props object identity does not re-run the effect.
  const settingsKey = JSON.stringify({ mobile, desktop });

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

    const { mobile, desktop } = JSON.parse(settingsKey) as {
      mobile: HeaderSettings;
      desktop?: Partial<HeaderSettings>;
    };
    const settings: HeaderSettings = window.matchMedia("(min-width: 1024px)").matches
      ? { ...mobile, ...desktop }
      : mobile;

    setLogoVisible(settings.logoVisible ?? HEADER_CONTEXT_INIT.logoVisible);
    setHeaderBgColor(settings.headerBgColor ?? HEADER_CONTEXT_INIT.headerBgColor);
    setMenuBtnColor(settings.menuBtnColor ?? HEADER_CONTEXT_INIT.menuBtnColor);
    setMenuBtnIcnColor(settings.menuBtnIcnColor ?? HEADER_CONTEXT_INIT.menuBtnIcnColor);
    setMenuBgColor(settings.menuBgColor ?? HEADER_CONTEXT_INIT.menuBgColor);
    setCartBtnColor(settings.cartBtnColor ?? HEADER_CONTEXT_INIT.cartBtnColor);
    setCartBtnIcnColor(settings.cartBtnIcnColor ?? HEADER_CONTEXT_INIT.cartBtnIcnColor);
    setLogoType(settings.logoType ?? HEADER_CONTEXT_INIT.logoType);
    setLogoColor(settings.logoColor ?? HEADER_CONTEXT_INIT.logoColor);
  }, [
    settingsKey,
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
