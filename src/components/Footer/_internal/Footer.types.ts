import { PageKey } from "@lib/routing/types";
import { PickStringLiteralUnion } from "@lib/types";

export type FooterNavKey = PickStringLiteralUnion<
  PageKey,
  "termsOfService" | "privacyPolicy"
>;
