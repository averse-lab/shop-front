"use client";

import {
  FC,
  PropsWithChildren,
  RefObject,
  createContext,
  useState,
} from "react";

import { StateSetter } from "@lib/types";

export type HeaderContextValue = {
  whiteIcons: boolean | undefined;
  setWhiteIcons: StateSetter<boolean | undefined>;
  logoRef: RefObject<HTMLDivElement> | undefined;
  setLogoRef: StateSetter<RefObject<HTMLDivElement> | undefined>;
  hideLogo: boolean | undefined;
  setHideLogo: StateSetter<boolean | undefined>;
  blackBackground: boolean | undefined;
  setBlackBackground: StateSetter<boolean | undefined>;
};

export const HeaderContext = createContext<HeaderContextValue | undefined>(
  undefined,
);

export const HeaderContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [whiteIcons, setWhiteIcons] = useState<boolean>();
  const [logoRef, setLogoRef] = useState<RefObject<HTMLDivElement>>();
  const [hideLogo, setHideLogo] = useState<boolean>();
  const [blackBackground, setBlackBackground] = useState<boolean>();

  const contextValue: HeaderContextValue = {
    whiteIcons,
    setWhiteIcons,
    logoRef,
    setLogoRef,
    hideLogo,
    setHideLogo,
    blackBackground,
    setBlackBackground,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};
