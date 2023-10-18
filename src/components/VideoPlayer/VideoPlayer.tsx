"use client";

import { FC, useEffect, useRef } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { clsx } from "clsx";

import s from "./_internal/VideoPlayer.module.scss";

import type MuxPlayerElement from "@mux/mux-player";

interface IProps {
  className?: string;
  playbackId: string;
  widthRatio: number;
  heighRatio: number;
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, widthRatio, heighRatio } = props;

  const playerRef = useRef<MuxPlayerElement>(null);

  useEffect(() => {
    if (playerRef.current === null) {
      return;
    }

    if (playerRef.current.style.aspectRatio === "") {
      playerRef.current.style.aspectRatio = `${widthRatio} / ${heighRatio}`;
    }
  }, [heighRatio, widthRatio]);

  return (
    <MuxPlayer
      ref={playerRef}
      thumbnailTime={0}
      className={clsx(className, s["player"])}
      streamType='on-demand'
      autoPlay='muted'
      playbackId={playbackId}
      nohotkeys
      loop
      style={{ aspectRatio: `${widthRatio} / ${heighRatio}` }}
    />
  );
};
