import { HTMLAttributeAnchorTarget } from "react";

import { Dictionary } from "@lib/i18n/types";

export type PageKey = "home" | "shop" | "about" | "legal" | "contact";

export type PageValue = {
  i18nKey: keyof Dictionary["pages"];
  url: string;
};

export type LinkDetail = {
  display: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
};
