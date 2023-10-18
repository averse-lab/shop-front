import { Dispatch, SetStateAction } from "react";

export interface MuxVideoSource {
  playbackId: string;
  widthRatio: number;
  heightRatio: number;
}

export type StateSetter<T> = Dispatch<SetStateAction<T>>;
