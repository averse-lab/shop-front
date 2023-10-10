"use client";

import { CSSProperties, FC } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { clsx } from "clsx";
import styled from "styled-components";

import s from "./_internal/VideoPlayer.module.scss";

interface IProps {
  className?: string;
  playbackId: string;
  aspectRatio: CSSProperties["aspectRatio"];
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, aspectRatio } = props;

  return (
    <StyledMux
      thumbnailTime={0}
      className={clsx(className, s["video-player"])}
      streamType='on-demand'
      autoPlay='muted'
      playbackId={playbackId}
      aspectRatio={aspectRatio}
      nohotkeys
      loop
    />
  );
};

// TODO : find a way to remove styled-components and pass the aspect-ratio to the style MuxPlayer prop

const StyledMux = styled(MuxPlayer)<{
  aspectRatio: CSSProperties["aspectRatio"];
}>`
  aspect-ratio: ${(props) => props.aspectRatio};
`;
