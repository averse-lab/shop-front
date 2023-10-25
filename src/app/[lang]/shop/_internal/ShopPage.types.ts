import { Dictionary } from "@lib/i18n/types";

export type CategoryKey = "allProducts" | "rings" | "necklaces";

export interface CategoryValue {
  i18nKey: keyof Dictionary["categories"];
  shopifyId: string;
  url: string;
}
