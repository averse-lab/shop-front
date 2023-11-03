import { FC } from "react";

import { clsx } from "clsx";

import { Observer } from "@components/Observer/Observer";
import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import s from "./_internal/MultipleAdditionalVideos.module.scss";
import { AdditionalVideosObserver } from "../AdditionalVideosObserver/AdditionalVideosObserver";

type IProps = {
  firstVideoPlaybackId: string;
  firstVideoWidthRatio: number;
  firstVideoHeightRatio: number;
  firstVideoDescription: string;
  secondVideoPlaybackId: string;
  secondVideoWidthRatio: number;
  secondVideoHeightRatio: number;
  secondVideoDescription: string;
  reversedLayout: boolean;
};

export const MultipleAdditionalVideos: FC<IProps> = (props) => {
  const {
    firstVideoPlaybackId,
    firstVideoWidthRatio,
    firstVideoHeightRatio,
    firstVideoDescription,
    secondVideoPlaybackId,
    secondVideoWidthRatio,
    secondVideoHeightRatio,
    secondVideoDescription,
    reversedLayout,
  } = props;

  return (
    <AdditionalVideosObserver
      className={clsx(
        "px-6 py-8 lg:min-h-screen lg:px-12",
        "flex flex-col gap-16 lg:gap-0",
        "overflow-hidden bg-black",
        "text-white",
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center gap-4",
          reversedLayout
            ? [
                s["multiple-additional-videos__wrapper--reversed"],
                "lg:flex-row-reverse",
              ]
            : [s["multiple-additional-videos__wrapper"], "lg:flex-row"],
        )}
      >
        <VideoPlayer
          className={clsx(
            s[
              `multiple-additional-videos__player--${
                reversedLayout ? "right" : "left"
              }`
            ],
            "md:w-[50%] md:max-w-[400px] lg:max-w-[650px] 2xl:max-w-[1000px]",
            "shrink-0",
          )}
          heightRatio={firstVideoHeightRatio}
          playbackId={firstVideoPlaybackId}
          widthRatio={firstVideoWidthRatio}
        />

        <Observer
          className={clsx(
            "lg:-mt-[12.5%] lg:w-[550px] 2xl:w-[750px]",
            "transition-all duration-200 ease-out",
          )}
          inViewClassName={clsx("translate-y-0 opacity-100 lg:translate-x-0")}
          options={{
            triggerOnce: true,
            rootMargin: "-25% 0%",
          }}
          outOfViewClassName={clsx(
            "-translate-y-2 opacity-0 lg:-translate-x-2",
          )}
        >
          <RichTextRenderer richText={firstVideoDescription} />
        </Observer>
      </div>
      <div
        className={clsx(
          "lg:-mt-[25%]",
          "flex flex-col items-center gap-4",
          reversedLayout
            ? [
                s["multiple-additional-videos__wrapper--reversed"],
                "lg:flex-row",
              ]
            : [s["multiple-additional-videos__wrapper"], "lg:flex-row-reverse"],
        )}
      >
        <VideoPlayer
          className={clsx(
            s[
              `multiple-additional-videos__player--${
                reversedLayout ? "left" : "right"
              }`
            ],
            "shrink-0",
            "md:max-w-[400px md:w-[50%] lg:max-w-[650px] 2xl:max-w-[1000px]",
          )}
          heightRatio={secondVideoHeightRatio}
          playbackId={secondVideoPlaybackId}
          widthRatio={secondVideoWidthRatio}
        />

        <Observer
          className={clsx(
            "lg:mt-[12.5%] lg:w-[550px] 2xl:w-[750px]",
            "transition-all duration-200 ease-out",
          )}
          inViewClassName='opacity-1 translate-y-0 lg:translate-x-0'
          options={{
            triggerOnce: true,
            rootMargin: "-25% 0%",
          }}
          outOfViewClassName='-translate-y-2 opacity-0 lg:-translate-x-2'
        >
          <RichTextRenderer richText={secondVideoDescription} />
        </Observer>
      </div>
    </AdditionalVideosObserver>
  );
};
