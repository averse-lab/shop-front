"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { clsx } from "clsx";

import s from "./_internal/VideoPlayer.module.scss";

interface IProps {
  className?: string;
  playbackId: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, placeholder, style } = props;

  return (
    <MuxPlayer
      autoPlay='muted'
      className={clsx(className, s["player"])}
      loop
      minResolution='1080p'
      placeholder={placeholder}
      playbackId={playbackId}
      playsInline
      streamType='on-demand'
      style={{
        ...style,
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
};
