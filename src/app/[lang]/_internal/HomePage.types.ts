import { Dictionary } from "@lib/i18n/types";

export type SectionKey = "home" | "shop" | "about";

export type SectionValue = {
  i18nKey: keyof Dictionary["menu"];
  url: string;
};
