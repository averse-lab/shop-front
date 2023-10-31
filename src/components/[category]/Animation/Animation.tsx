import { FC } from "react";

import { clsx } from "clsx";

import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { getCustomGridPositionStyle } from "./_internal/Animation.utils";

type IProps = {
  playbackId: string;
  index: number;
  gridIndex: number | undefined;
  gridDesktopIndex: number | undefined;
};

export const Animation: FC<IProps> = (props) => {
  const { playbackId, gridIndex, gridDesktopIndex, index } = props;

  return (
    <>
      <style>
        {getCustomGridPositionStyle(index, gridIndex, gridDesktopIndex)}
      </style>
      <VideoPlayer
        className={clsx(
          `animation-${index}`,
          "h-full w-full",
          "outline outline-1 outline-neutral-500",
        )}
        playbackId={playbackId}
        widthRatio={1}
        heightRatio={1}
      />
    </>
  );
};
