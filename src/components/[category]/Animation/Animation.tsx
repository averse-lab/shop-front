import { FC } from "react";

import { clsx } from "clsx";

import { VideoPlayer } from "@components/VideoPlayer";

import { getMuxPlaceholder } from "@lib/mux/utils";

import { getCustomGridPositionStyle } from "./_internal/Animation.utils";

type IProps = {
  playbackId: string;
  index: number;
  gridIndex: number | undefined;
  gridDesktopIndex: number | undefined;
};

export const Animation: FC<IProps> = async (props) => {
  const { playbackId, gridIndex, gridDesktopIndex, index } = props;

  const videoPlaceholder = await getMuxPlaceholder({
    playbackId,
    width: 64,
  });

  return (
    <>
      <style>
        {getCustomGridPositionStyle(index, gridIndex, gridDesktopIndex)}
      </style>
      <VideoPlayer
        className={clsx(
          "h-full w-full",
          "aspect-square outline outline-1 outline-neutral-500",
        )}
        placeholder={videoPlaceholder}
        playbackId={playbackId}
      />
    </>
  );
};
