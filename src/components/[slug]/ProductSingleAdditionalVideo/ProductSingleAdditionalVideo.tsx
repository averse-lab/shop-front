import { CSSProperties, FC } from "react";

import { clsx } from "clsx";

import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

type IProps = {
  playbackId: string;
  aspectRatio: CSSProperties["aspectRatio"];
  description: string;
  inversedLayout: boolean;
};

export const ProductSingleAdditionalVideo: FC<IProps> = (props) => {
  const { playbackId, aspectRatio, description, inversedLayout } = props;

  return (
    <div
      className={clsx(
        "lg:min-h-screen",
        "flex flex-col items-center gap-4",
        inversedLayout ? "lg:flex-row-reverse" : "lg:flex-row",
        "lg:justify-center lg:gap-24",
        "bg-black text-white",
        "px-6 py-8",
        "lg:px-12",
      )}
    >
      <VideoPlayer
        className={clsx(
          "shrink-0",
          "md:w-[50%] md:max-w-[400px]",
          "lg:max-w-[650px]",
          "2xl:max-w-[750px]",
        )}
        playbackId={playbackId}
        aspectRatio={aspectRatio}
      />
      <RichTextRenderer
        className={clsx("lg:max-w-[550px]", "2xl:max-w-[750px]")}
        richText={description}
      />
    </div>
  );
};
