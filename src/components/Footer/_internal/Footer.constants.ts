import { PAGES } from "@lib/routing/constants";
import { PageValue } from "@lib/routing/types";

import { FooterNavKey } from "./Footer.types";

export const FOOTER_NAV: Record<FooterNavKey, PageValue> = {
  contact: PAGES.contact,
  legal: PAGES.legal,
};
