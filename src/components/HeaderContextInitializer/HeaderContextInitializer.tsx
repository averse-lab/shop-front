"use client";

import { FC, useContext, useEffect } from "react";

import {
  HeaderContext,
  HeaderContextValue,
} from "@contexts/HeaderContext/HeaderContext";

type IProps = {} & Partial<
  Pick<HeaderContextValue, "hideLogo" | "whiteIcons" | "blackBackground">
>;

export const HeaderContextInitializer: FC<IProps> = (props) => {
  const { hideLogo, whiteIcons, blackBackground } = props;
  const { setHideLogo, setWhiteIcons, setBlackBackground } =
    useContext(HeaderContext) || {};

  useEffect(() => {
    if (
      setHideLogo === undefined ||
      setWhiteIcons === undefined ||
      setBlackBackground === undefined
    ) {
      return;
    }

    setHideLogo(hideLogo || false);
    setWhiteIcons(whiteIcons || false);
    setBlackBackground(blackBackground || false);
  }, [
    hideLogo,
    setHideLogo,
    setBlackBackground,
    setWhiteIcons,
    blackBackground,
    whiteIcons,
  ]);

  return <></>;
};
