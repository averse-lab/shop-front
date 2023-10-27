import { PAGES } from "@lib/routing/constants";
import { PageValue } from "@lib/routing/types";

import { FooterNavKey } from "./Footer.types";

export const FOOTER_NAV: Record<FooterNavKey, PageValue> = {
  legalNotices: PAGES.legalNotices,
  termsAndConditions: PAGES.termsAndConditions,
};
