"use client";

import { FC } from "react";

import MuxVideo from "@mux/mux-video-react";
import { clsx } from "clsx";

interface IProps {
  className?: string;
  playbackId: string;
  widthRatio: number;
  heightRatio: number;
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, widthRatio, heightRatio } = props;

  return (
    <MuxVideo
      autoPlay='muted'
      className={clsx(className, "h-full w-full", "object-cover object-center")}
      controls={false}
      loop
      playbackId={playbackId}
      playsInline
      streamType='on-demand'
      style={{ aspectRatio: `${widthRatio} / ${heightRatio}` }}
    />
  );
};
