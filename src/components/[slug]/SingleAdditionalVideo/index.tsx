import { FC } from "react";

import { clsx } from "clsx";

import { Observer } from "@components/Observer/Observer";
import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer";

import { getMuxPlaceholder } from "@lib/mux/utils";

type IProps = {
  playbackId: string;
  description: string;
};

export const SingleAdditionalVideo: FC<IProps> = async (props) => {
  const { playbackId, description } = props;

  const videoPlaceholder = await getMuxPlaceholder({
    playbackId,
    width: 64,
  });

  return (
    <>
      <VideoPlayer
        className={clsx(
          "shrink-0",
          "md:w-1/2 md:max-w-[400px] lg:max-w-[550px] 2xl:max-w-[750px]",
          "aspect-square",
        )}
        minResolution='1080p'
        placeholder={videoPlaceholder}
        playbackId={playbackId}
      />
      <Observer
        className={clsx(
          "md:w-1/2 md:max-w-[400px] lg:max-w-[550px] 2xl:max-w-[750px]",
          "transition-all duration-500 ease-out",
        )}
        inViewClassName='opacity-1 translate-y-0 lg:translate-x-0'
        options={{
          triggerOnce: true,
          threshold: 0.75,
        }}
        outOfViewClassName='-translate-y-2 opacity-0 lg:-translate-x-2'
      >
        <RichTextRenderer richText={description} />
      </Observer>
    </>
  );
};
