import { CSSProperties, FC } from "react";

import { clsx } from "clsx";

import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import s from "./_internal/ProductMultipleAdditionalVideos.module.scss";

type IProps = {
  firstVideoPlaybackId: string;
  firstVideoAspectRatio: CSSProperties["aspectRatio"];
  firstVideodDescription: string;
  secondVideoPlaybackId: string;
  secondVideoAspectRatio: CSSProperties["aspectRatio"];
  secondVideodDescription: string;
  inversedLayout: boolean;
};

export const ProductMultipleAdditionalVideos: FC<IProps> = (props) => {
  const {
    firstVideoPlaybackId,
    firstVideoAspectRatio,
    firstVideodDescription,
    secondVideoPlaybackId,
    secondVideoAspectRatio,
    secondVideodDescription,
    inversedLayout,
  } = props;

  return (
    <div
      className={clsx(
        "lg:min-h-screen",
        "flex flex-col gap-16",
        "lg:gap-0",
        "bg-black text-white",
        "px-6 py-8",
        "lg:px-12",
        "overflow-hidden",
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center gap-4",
          inversedLayout ? "lg:flex-row-reverse" : "lg:flex-row",
        )}
      >
        <VideoPlayer
          className={clsx(
            s[
              `multiple-additional-videos__player--${
                inversedLayout ? "right" : "left"
              }`
            ],
            "shrink-0",
            "md:w-[50%] md:max-w-[400px]",
            "lg:max-w-[650px]",
            "2xl:max-w-[1000px]",
          )}
          playbackId={firstVideoPlaybackId}
          aspectRatio={firstVideoAspectRatio}
        />
        <RichTextRenderer
          className={clsx("lg:w-[550px]", "2xl:w-[750px]", "lg:-mt-[12.5%]")}
          richText={firstVideodDescription}
        />
      </div>
      <div
        className={clsx(
          "flex flex-col items-center gap-4",
          inversedLayout ? "lg:flex-row" : "lg:flex-row-reverse",
          "lg:-mt-[25%]",
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
            "md:w-[50%] md:max-w-[400px]",
            "lg:max-w-[650px]",
            "2xl:max-w-[1000px]",
          )}
          playbackId={secondVideoPlaybackId}
          aspectRatio={secondVideoAspectRatio}
        />
        <RichTextRenderer
          className={clsx("lg:w-[550px]", "2xl:w-[750px]", "lg:mt-[12.5%]")}
          richText={secondVideodDescription}
        />
      </div>
    </div>
  );
};
