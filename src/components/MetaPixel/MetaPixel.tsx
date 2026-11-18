"use client";

import { FC, useEffect } from "react";

import { usePathname } from "next/navigation";

import { useConsent } from "@lib/hooks";
import { revokePixelConsent, trackPixelEvent } from "@lib/meta-pixel";

export const MetaPixel: FC = () => {
  const consent = useConsent();
  const pathname = usePathname();

  useEffect(() => {
    if (consent === "granted") {
      trackPixelEvent("PageView");
    } else {
      revokePixelConsent();
    }
  }, [consent, pathname]);

  return null;
};
