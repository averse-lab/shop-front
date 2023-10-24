"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { clsx } from "clsx";

interface IProps {
  className?: string;
  playbackId: string;
  widthRatio: number;
  heighRatio: number;
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, widthRatio, heighRatio } = props;

  return (
    <MuxPlayer
      className={clsx(className)}
      thumbnailTime={0}
      streamType='on-demand'
      autoPlay='muted'
      playbackId={playbackId}
      nohotkeys
      loop
      style={{ aspectRatio: `${widthRatio} / ${heighRatio}` }}
    />
  );
};
