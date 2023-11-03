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
  whiteIcons: boolean;
  setWhiteIcons: StateSetter<boolean>;
  logoRef: RefObject<HTMLDivElement> | undefined;
  setLogoRef: StateSetter<RefObject<HTMLDivElement> | undefined>;
  hideLogo: boolean;
  setHideLogo: StateSetter<boolean>;
};

export const HeaderContext = createContext<HeaderContextValue | undefined>(
  undefined,
);

export const HeaderContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [whiteIcons, setWhiteIcons] = useState(false);
  const [logoRef, setLogoRef] = useState<RefObject<HTMLDivElement>>();
  const [hideLogo, setHideLogo] = useState(false);

  const contextValue: HeaderContextValue = {
    whiteIcons,
    setWhiteIcons,
    logoRef,
    setLogoRef,
    hideLogo,
    setHideLogo,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};
