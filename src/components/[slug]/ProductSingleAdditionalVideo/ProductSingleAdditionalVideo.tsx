import { FC } from "react";

import { clsx } from "clsx";

import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

type IProps = {
  playbackId: string;
  widthRatio: number;
  heightRatio: number;
  description: string;
  reversedLayout: boolean;
};

export const ProductSingleAdditionalVideo: FC<IProps> = (props) => {
  const { playbackId, widthRatio, heightRatio, description, reversedLayout } =
    props;

  return (
    <div
      className={clsx(
        "px-6 py-8 lg:min-h-screen lg:px-12",
        "flex flex-col items-center gap-4 lg:justify-center lg:gap-24",
        reversedLayout ? "lg:flex-row-reverse" : "lg:flex-row",
        "bg-black",
        "text-white",
      )}
    >
      <VideoPlayer
        className={clsx(
          "shrink-0",
          "md:w-[50%] md:max-w-[400px] lg:max-w-[650px] 2xl:max-w-[750px]",
        )}
        playbackId={playbackId}
        widthRatio={widthRatio}
        heightRatio={heightRatio}
      />
      <RichTextRenderer
        className={clsx("lg:max-w-[550px] 2xl:max-w-[750px]")}
        richText={description}
      />
    </div>
  );
};
