import { HTMLAttributeAnchorTarget } from "react";

import { Dictionary } from "@lib/i18n/types";

export type PageKey =
  | "home"
  | "shop"
  | "about"
  | "termsOfSale"
  | "privacyPolicy"
  | "legalNotice"
	| "maintenance";

export type PageValue = {
  i18nKey: keyof Dictionary["pages"];
  url: string;
};

export type CategoryKey = "allProducts" | "rings" | "necklaces";

export interface CategoryValue {
  i18nKey: keyof Dictionary["categories"];
  shopifyId: string;
  url: string;
}

export type LinkDetail = {
  display: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
};
