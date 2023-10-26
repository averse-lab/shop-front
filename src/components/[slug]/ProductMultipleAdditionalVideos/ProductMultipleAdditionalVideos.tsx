import { FC } from "react";

import { clsx } from "clsx";

import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import s from "./_internal/ProductMultipleAdditionalVideos.module.scss";

type IProps = {
  firstVideoPlaybackId: string;
  firstVideoWidthRatio: number;
  firstVideoHeightRatio: number;
  firstVideodDescription: string;
  secondVideoPlaybackId: string;
  secondVideoWidthRatio: number;
  secondVideoHeightRatio: number;
  secondVideodDescription: string;
  inversedLayout: boolean;
};

export const ProductMultipleAdditionalVideos: FC<IProps> = (props) => {
  const {
    firstVideoPlaybackId,
    firstVideoWidthRatio,
    firstVideoHeightRatio,
    firstVideodDescription,
    secondVideoPlaybackId,
    secondVideoWidthRatio,
    secondVideoHeightRatio,
    secondVideodDescription,
    inversedLayout,
  } = props;

  return (
    <div
      className={clsx(
        "lg:min-h-screen px-6 py-8 lg:px-12",
        "flex flex-col gap-16 lg:gap-0",
        "bg-black overflow-hidden",
        "text-white",
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center gap-4",
          inversedLayout
            ? [
                s["multiple-additional-videos__wrapper--inversed"],
                "lg:flex-row-reverse",
              ]
            : [s["multiple-additional-videos__wrapper"], "lg:flex-row"],
        )}
      >
        <VideoPlayer
          className={clsx(
            s[
              `multiple-additional-videos__player--${
                inversedLayout ? "right" : "left"
              }`
            ],
            "md:w-[50%] md:max-w-[400px] lg:max-w-[650px] 2xl:max-w-[1000px]",
            "shrink-0",
          )}
          playbackId={firstVideoPlaybackId}
          widthRatio={firstVideoWidthRatio}
          heighRatio={firstVideoHeightRatio}
        />
        <RichTextRenderer
          className={clsx("lg:w-[550px] 2xl:w-[750px] lg:-mt-[12.5%]")}
          richText={firstVideodDescription}
        />
      </div>
      <div
        className={clsx(
          "lg:-mt-[25%]",
          "flex flex-col items-center gap-4",
          inversedLayout
            ? [
                s["multiple-additional-videos__wrapper--inversed"],
                "lg:flex-row",
              ]
            : [s["multiple-additional-videos__wrapper"], "lg:flex-row-reverse"],
        )}
      >
        <VideoPlayer
          className={clsx(
            s[
              `multiple-additional-videos__player--${
                inversedLayout ? "left" : "right"
              }`
            ],
            "shrink-0",
            "md:w-[50%] md:max-w-[400px lg:max-w-[650px] 2xl:max-w-[1000px]",
          )}
          playbackId={secondVideoPlaybackId}
          widthRatio={secondVideoWidthRatio}
          heighRatio={secondVideoHeightRatio}
        />
        <RichTextRenderer
          className={clsx("lg:w-[550px] 2xl:w-[750px] lg:mt-[12.5%]")}
          richText={secondVideodDescription}
        />
      </div>
    </div>
  );
};
