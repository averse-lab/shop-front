"use client";

import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { Button } from "@components/ui/button";

import { setConsent } from "@lib/consent";
import { useConsent } from "@lib/hooks";
import { Dictionary, Locale } from "@lib/i18n/types";
import { META_PIXEL_ID } from "@lib/meta-pixel";
import { PAGES } from "@lib/routing/constants";

type IProps = {
  dictionary: Dictionary;
  lang: Locale;
};

export const CookieConsent: FC<IProps> = (props) => {
  const { dictionary, lang } = props;
  const { title, message, privacyPolicy, accept, refuse } = dictionary.cookieConsent;

  const consent = useConsent();

  // Without a pixel no cookie needs consent, so there is nothing to ask.
  if (!META_PIXEL_ID || consent !== null) {
    return null;
  }

  return (
    <section
      aria-labelledby='cookie-consent-title'
      className={clsx(
        "fixed bottom-0 left-0 z-10 md:bottom-2 md:left-2",
        "w-full p-6 md:w-[450px]",
        "flex flex-col gap-6",
        "border-t border-white/35 bg-black md:border",
        "text-white",
        "animate-appear",
      )}
    >
      <div className={clsx("flex flex-col gap-2")}>
        <h2 className={clsx("font-medium uppercase")} id='cookie-consent-title'>
          {title}
        </h2>
        <p className={clsx("font-abhaya text-base")}>
          {message}{" "}
          <Link
            className={clsx("underline underline-offset-2")}
            href={`/${lang}/${PAGES.privacyPolicy.url}`}
            hrefLang={lang}
          >
            {privacyPolicy}
          </Link>
        </p>
      </div>
      {/* Both choices look the same on purpose: refusing must be as easy as accepting. */}
      <div className={clsx("flex gap-4")}>
        <Button
          className={clsx("flex-1 text-white after:border-white")}
          onClick={() => setConsent("denied")}
        >
          {refuse}
        </Button>
        <Button
          className={clsx("flex-1 text-white after:border-white")}
          onClick={() => setConsent("granted")}
        >
          {accept}
        </Button>
      </div>
    </section>
  );
};
