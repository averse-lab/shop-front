"use client";

import { CSSProperties, FC } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { clsx } from "clsx";

import s from "./_internal/VideoPlayer.module.scss";

interface IProps {
  className?: string;
  playbackId: string;
  aspectRatio: CSSProperties["aspectRatio"];
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, aspectRatio } = props;

  return (
    <MuxPlayer
      thumbnailTime={0}
      className={clsx(className, s["video-player"])}
      streamType='on-demand'
      autoPlay='muted'
      playbackId={playbackId}
      nohotkeys
      loop
      style={{ aspectRatio }}
    />
  );
};
