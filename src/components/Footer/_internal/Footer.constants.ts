import { PAGES } from "@lib/routing/constants";
import { PageValue } from "@lib/routing/types";

import { FooterNavKey } from "./Footer.types";

export const FOOTER_NAV: Record<FooterNavKey, PageValue> = {
  termsOfService: PAGES.termsOfService,
  privacyPolicy: PAGES.privacyPolicy,
};
