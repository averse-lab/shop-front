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

export const VideoPlayer: FC<IProps> = async (props) => {
  const { className, playbackId, widthRatio, heightRatio } = props;

  return (
    <MuxVideo
      className={clsx(className, "h-full w-full", "object-cover object-center")}
      controls={false}
      playsInline
      streamType='on-demand'
      playbackId={playbackId}
      autoPlay='muted'
      loop
      style={{ aspectRatio: `${widthRatio} / ${heightRatio}` }}
    />
  );
};
