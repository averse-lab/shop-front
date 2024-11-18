"use client";

import { FC, PropsWithChildren, RefObject, createContext, useState } from "react";

import { StateSetter } from "@lib/types";

export type { ContextValue as HeaderContextValue };

export { init as HEADER_CONTEXT_INIT };

type LogoType = "plain" | "typographic";

type ContextValue = {
  menuBtnColor: "black" | "white" | undefined;
  setMenuBtnColor: StateSetter<"black" | "white" | undefined> | undefined;
  menuBtnIcnColor: "black" | "white" | undefined;
  setMenuBtnIcnColor: StateSetter<"black" | "white" | undefined> | undefined;
  menuBgColor: "black" | "white" | undefined;
  setMenuBgColor: StateSetter<"black" | "white" | undefined> | undefined;
  cartBtnColor: "black" | "white" | undefined;
  setCartBtnColor: StateSetter<"black" | "white" | undefined> | undefined;
  cartBtnIcnColor: "black" | "white" | undefined;
  setCartBtnIcnColor: StateSetter<"black" | "white" | undefined> | undefined;
  logoRef: RefObject<HTMLDivElement> | undefined;
  setLogoRef: StateSetter<RefObject<HTMLDivElement> | undefined> | undefined;
  logoVisible: boolean | undefined;
  setLogoVisible: StateSetter<boolean | undefined> | undefined;
  headerBgColor: "white" | "black" | "transparent" | undefined;
  setHeaderBgColor: StateSetter<"white" | "black" | "transparent" | undefined> | undefined;
  logoType: LogoType | undefined;
  setLogoType: StateSetter<LogoType | undefined> | undefined;
  logoColor: "white" | "black" | undefined;
  setLogoColor: StateSetter<"white" | "black" | undefined> | undefined;
};

const init: ContextValue = {
  menuBtnColor: undefined,
  setMenuBtnColor: undefined,
  menuBtnIcnColor: undefined,
  setMenuBtnIcnColor: undefined,
  menuBgColor: undefined,
  setMenuBgColor: undefined,
  cartBtnColor: undefined,
  setCartBtnColor: undefined,
  cartBtnIcnColor: undefined,
  setCartBtnIcnColor: undefined,
  logoRef: undefined,
  setLogoRef: undefined,
  logoVisible: undefined,
  setLogoVisible: undefined,
  headerBgColor: undefined,
  setHeaderBgColor: undefined,
  logoType: undefined,
  setLogoType: undefined,
  logoColor: undefined,
  setLogoColor: undefined,
};

export const HeaderContext = createContext<ContextValue>(init);

export const HeaderContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [menuBtnColor, setMenuBtnColor] = useState<ContextValue["menuBgColor"]>(init.menuBtnColor);
  const [menuBtnIcnColor, setMenuBtnIcnColor] = useState<ContextValue["menuBgColor"]>(
    init.menuBtnIcnColor,
  );
  const [menuBgColor, setMenuBgColor] = useState<ContextValue["menuBgColor"]>(init.menuBgColor);
  const [cartBtnColor, setCartBtnColor] = useState<ContextValue["menuBgColor"]>(init.cartBtnColor);
  const [cartBtnIcnColor, setCartBtnIcnColor] = useState<ContextValue["menuBgColor"]>(
    init.cartBtnIcnColor,
  );
  const [logoRef, setLogoRef] = useState<ContextValue["logoRef"]>(init.logoRef);
  const [logoVisible, setLogoVisible] = useState<ContextValue["logoVisible"]>(init.logoVisible);
  const [headerBgColor, setHeaderBgColor] = useState<ContextValue["headerBgColor"]>(
    init.headerBgColor,
  );
  const [logoType, setLogoType] = useState<ContextValue["logoType"]>(init.logoType);
  const [logoColor, setLogoColor] = useState<ContextValue["logoColor"]>(init.logoColor);

  const contextValue: ContextValue = {
    menuBtnColor,
    setMenuBtnColor,
    menuBtnIcnColor,
    setMenuBtnIcnColor,
    menuBgColor,
    setMenuBgColor,
    cartBtnColor,
    setCartBtnColor,
    cartBtnIcnColor,
    setCartBtnIcnColor,
    logoRef,
    setLogoRef,
    logoVisible,
    setLogoVisible,
    headerBgColor,
    setHeaderBgColor,
    logoType,
    setLogoType,
    logoColor,
    setLogoColor,
  };

  return <HeaderContext.Provider value={contextValue}>{children}</HeaderContext.Provider>;
};
