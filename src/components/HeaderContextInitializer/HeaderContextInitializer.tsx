"use client";

import { FC, useContext, useEffect } from "react";

import {
  HeaderContext,
  HeaderContextValue,
} from "@contexts/HeaderContext/HeaderContext";

type IProps = {} & Partial<
  Pick<
    HeaderContextValue,
    "hideLogo" | "whiteIcons" | "blackBackground" | "logoType"
  >
>;

export const HeaderContextInitializer: FC<IProps> = (props) => {
  const { hideLogo, whiteIcons, blackBackground, logoType } = props;
  const { setHideLogo, setWhiteIcons, setBlackBackground, setLogoType } =
    useContext(HeaderContext) || {};

  useEffect(() => {
    if (
      setHideLogo === undefined ||
      setWhiteIcons === undefined ||
      setBlackBackground === undefined ||
      setLogoType === undefined
    ) {
      return;
    }

    setHideLogo(hideLogo || false);
    setWhiteIcons(whiteIcons || false);
    setBlackBackground(blackBackground || false);
    setLogoType(logoType || "plain");
  }, [
    hideLogo,
    setHideLogo,
    setBlackBackground,
    setWhiteIcons,
    blackBackground,
    whiteIcons,
    setLogoType,
    logoType,
  ]);

  return <></>;
};
