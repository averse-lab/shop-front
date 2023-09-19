import { CSSProperties } from "react";

export type Animation = {
  url: string;
  playbackId: string;
  index: number;
  aspectRatio: CSSProperties["aspectRatio"];
};
