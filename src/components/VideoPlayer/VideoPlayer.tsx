"use client";

import MuxPlayer from "@mux/mux-player-react";
import { CSSProperties, FC } from "react";
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
      className={`${className || null} ${s["video-player"]}`}
      streamType='on-demand'
      autoPlay='muted'
      playbackId={playbackId}
      nohotkeys
      loop
      style={{ aspectRatio }}
    />
  );
};
