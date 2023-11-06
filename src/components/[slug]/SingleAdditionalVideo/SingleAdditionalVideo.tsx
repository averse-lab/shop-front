import { FC } from "react";

import { clsx } from "clsx";

import { Observer } from "@components/Observer/Observer";
import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { AdditionalVideosObserver } from "../AdditionalVideosObserver/AdditionalVideosObserver";

type IProps = {
  playbackId: string;
  widthRatio: number;
  heightRatio: number;
  description: string;
  inversedLayout: boolean;
};

export const SingleAdditionalVideo: FC<IProps> = (props) => {
  const { playbackId, widthRatio, heightRatio, description, inversedLayout } =
    props;

  return (
    <AdditionalVideosObserver
      className={clsx(
        "px-6 py-8 lg:min-h-screen lg:px-12",
        "flex flex-col items-center gap-4 lg:justify-center lg:gap-24",
        inversedLayout ? "lg:flex-row-reverse" : "lg:flex-row",
        "bg-black",
        "text-white",
      )}
    >
      <VideoPlayer
        className={clsx(
          "shrink-0",
          "md:w-[50%] md:max-w-[400px] lg:max-w-[650px] 2xl:max-w-[750px]",
        )}
        heightRatio={heightRatio}
        playbackId={playbackId}
        widthRatio={widthRatio}
      />
      <Observer
        className={clsx(
          "lg:max-w-[550px] 2xl:max-w-[750px]",
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
    </AdditionalVideosObserver>
  );
};
