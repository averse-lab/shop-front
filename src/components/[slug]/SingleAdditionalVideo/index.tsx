import { FC } from "react";

import { clsx } from "clsx";

import { Observer } from "@components/Observer/Observer";
import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer";

import { getMuxPlaceholder } from "@lib/mux/utils";

type IProps = {
  playbackId: string;
  description: string;
  inversedLayout: boolean;
};

export const SingleAdditionalVideo: FC<IProps> = async (props) => {
  const { playbackId, description, inversedLayout } = props;

  const videoPlaceholder = await getMuxPlaceholder({
    playbackId,
    width: 64,
  });

  return (
    <div
      className={clsx(
        "px-6 py-8 lg:min-h-dvh lg:px-12",
        "flex flex-col items-center gap-8 lg:justify-center lg:gap-24",
        inversedLayout ? "md:flex-row-reverse" : "md:flex-row",
        "bg-black",
        "text-primary-foreground",
      )}
    >
      <VideoPlayer
        className={clsx(
          "shrink-0",
          "md:w-1/2 md:max-w-[400px] lg:max-w-[550px] 2xl:max-w-[750px]",
          "aspect-square",
        )}
        placeholder={videoPlaceholder}
        playbackId={playbackId}
      />
      <Observer
        className={clsx(
          "md:w-1/2 md:max-w-[400px] lg:max-w-[550px] 2xl:max-w-[750px]",
          "transition-all duration-200 ease-out",
        )}
        inViewClassName='opacity-1 translate-y-0 lg:translate-x-0'
        options={{
          triggerOnce: true,
          rootMargin: "-25% 0%",
        }}
        outOfViewClassName='-translate-y-2 opacity-0 lg:-translate-x-2'
      >
        <RichTextRenderer richText={description} />
      </Observer>
    </div>
  );
};
