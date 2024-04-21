"use client";

import { FC, useContext, useEffect } from "react";

import {
  HeaderContext,
  HeaderContextValue,
} from "@contexts/HeaderContext/HeaderContext";

type IProps = {} & Partial<
  Pick<HeaderContextValue, "hideLogo" | "whiteIcons" | "whiteBackground">
>;

export const HeaderContextInitializer: FC<IProps> = (props) => {
  const { hideLogo, whiteIcons, whiteBackground } = props;
  const { setHideLogo, setWhiteIcons, setWhiteBackground } =
    useContext(HeaderContext) || {};

  useEffect(() => {
    if (
      setHideLogo === undefined ||
      setWhiteIcons === undefined ||
      setWhiteBackground === undefined
    ) {
      return;
    }

    setHideLogo(hideLogo || false);
    setWhiteIcons(whiteIcons || false);
    setWhiteBackground(whiteBackground || false);
  }, [
    hideLogo,
    setHideLogo,

    setWhiteBackground,
    setWhiteIcons,

    whiteBackground,
    whiteIcons,
  ]);
  return <></>;
};
