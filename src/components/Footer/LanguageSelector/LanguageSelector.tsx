"use client";

import { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Locale } from "@lib/i18n/types";

type IProps = {
  lang: Locale;
};

export const LanguageSelector: FC<IProps> = (props) => {
  const { lang } = props;
  const pathname = usePathname();

  return (
    <Link
      href={pathname.replace(
        lang === "fr" ? "fr" : "en",
        lang === "fr" ? "en" : "fr",
      )}
      hrefLang={lang === "fr" ? "en" : "fr"}
    >
      {lang === "fr" ? <>&#x1F1EC;&#x1F1E7;</> : <>&#x1F1EB;&#x1F1F7;</>}
    </Link>
  );
};
