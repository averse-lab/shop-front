"use client";

import { FC } from "react";

import MuxVideo from "@mux/mux-video-react";
import clsx from "clsx";

interface IProps {
  className?: string;
  playbackId: string;
  widthRatio: number;
  heighRatio: number;
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, widthRatio, heighRatio } = props;

  return (
    <MuxVideo
      className={clsx(className, "h-full w-full object-cover object-center")}
      controls={false}
      playsInline
      streamType='on-demand'
      playbackId={playbackId}
      autoPlay='muted'
      loop
      style={{ aspectRatio: `${widthRatio} / ${heighRatio}` }}
    />
  );
};
