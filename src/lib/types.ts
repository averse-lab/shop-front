import { CSSProperties, Dispatch, SetStateAction } from "react";

export interface MuxVideoSource {
  playbackId: string;
  aspectRatio: CSSProperties["aspectRatio"];
}

export type StateSetter<T> = Dispatch<SetStateAction<T>>;
