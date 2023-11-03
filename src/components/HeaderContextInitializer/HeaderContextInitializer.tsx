"use client";

import { FC, useContext, useEffect } from "react";

import {
  HeaderContext,
  HeaderContextValue,
} from "@contexts/HeaderContext/HeaderContext";

type IProps = {} & Partial<Pick<HeaderContextValue, "hideLogo" | "whiteIcons">>;

export const HeaderContextInitializer: FC<IProps> = (props) => {
  const { hideLogo, whiteIcons } = props;
  const { setHideLogo, setWhiteIcons } = useContext(HeaderContext) || {};

  useEffect(() => {
    if (setHideLogo === undefined || setWhiteIcons === undefined) {
      return;
    }

    setHideLogo(hideLogo || false);

    setWhiteIcons(whiteIcons || false);
  }, [hideLogo, setHideLogo, setWhiteIcons, whiteIcons]);
  return <></>;
};
