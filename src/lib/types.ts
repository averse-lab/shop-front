import { Dispatch, SetStateAction } from "react";

export interface MuxVideoSource {
  playbackId: string;
  widthRatio: number;
  heightRatio: number;
}

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type NonNullablePick<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: NonNullable<T[P]>;
};

export type PickStringLiteralUnion<T, K extends T> = T extends K ? T : never;
