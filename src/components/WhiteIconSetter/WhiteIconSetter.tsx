"use client";

import { FC, useContext, useEffect } from "react";

import { usePathname } from "next/navigation";

import { PAGES } from "@lib/routing/constants";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

export const WhiteIconSetter: FC = () => {
  const { setWhiteIcons } = useContext(HeaderContext) || {};
  const pathname = usePathname();

  useEffect(() => {
    if (setWhiteIcons === undefined) {
      return;
    }

    const aboutRegExp = new RegExp(`\/(fr|en)\/${PAGES.about.url}`);

    if (pathname.match(aboutRegExp)) {
      setWhiteIcons(true);
    } else {
      setWhiteIcons(false);
    }
  }, [pathname, setWhiteIcons]);
  return null;
};
