import { PageKey } from "@lib/routing/types";
import { PickStringLiteralUnion } from "@lib/types";

export type MainNavKey = PickStringLiteralUnion<
  PageKey,
  "about" | "home" | "shop"
>;
