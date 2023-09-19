import { Dictionnary } from "@averse/lib/i18n/types";
import { CSSProperties } from "react";

export enum SectionsKey {
  HOME = "home",
  SHOP = "shop",
  ABOUT = "about",
}

export interface SectionValue {
  i18nKey: keyof Dictionnary["menu"];
  url: string;
}

export interface MuxVideoSource {
  playbackId: string;
  aspectRatio: CSSProperties["aspectRatio"];
}
