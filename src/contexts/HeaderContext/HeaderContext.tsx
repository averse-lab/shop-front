"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

import { StateSetter } from "@lib/types";

type HeaderContextValue = {
  whiteIcons: boolean;
  setWhiteIcons: StateSetter<boolean>;
};

export const HeaderContext = createContext<HeaderContextValue | undefined>(
  undefined,
);

export const HeaderContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [whiteIcons, setWhiteIcons] = useState(false);

  const contextValue: HeaderContextValue = {
    whiteIcons,
    setWhiteIcons,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};
