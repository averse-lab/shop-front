"use client";

import { FC, PropsWithChildren } from "react";

import { setConsent } from "@lib/consent";
import { META_PIXEL_ID } from "@lib/meta-pixel";

/** Forgets the stored choice so the consent banner asks again. */
export const CookieSettingsButton: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  // Without a pixel no cookie needs consent, so there is nothing to manage.
  if (!META_PIXEL_ID) {
    return null;
  }

  return (
    <button onClick={() => setConsent(null)} type='button'>
      {children}
    </button>
  );
};
