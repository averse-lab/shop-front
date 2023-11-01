"use client";

import { FC, useContext, useEffect } from "react";

import { usePathname } from "next/navigation";

import { HeaderContext } from "@averse/contexts/HeaderContext/HeaderContext";

import { PAGES } from "@lib/routing/constants";

export const WhiteIconSetter: FC = () => {
  const { whiteIcons, setWhiteIcons } = useContext(HeaderContext) || {};
  const pathname = usePathname();

  useEffect(() => {
    if (whiteIcons === undefined || setWhiteIcons === undefined) {
      return;
    }

    const aboutRegExp = new RegExp(`\/(fr|en)\/${PAGES.about.url}`);

    if (pathname.match(aboutRegExp)) {
      setWhiteIcons(true);
    } else {
      setWhiteIcons(false);
    }
  }, [pathname, setWhiteIcons, whiteIcons]);
  return null;
};
