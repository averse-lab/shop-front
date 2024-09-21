import { FC } from "react";

import clsx from "clsx";
import Image from "next/image";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

type Props = {
  title: string;
  video: {
    playbackId: string;
    widthRatio: number;
    heightRatio: number;
  };
  image?: {
    src: string;
    alt: string;
  };
  textBlocks: { type: "title" | "paragraph" | "quote"; text: string }[];
};

export const MiscPageTemplate: FC<Props> = (props) => {
  const { video, title, image, textBlocks } = props;

  return (
    <>
      <HeaderContextInitializer hideLogo whiteIcons />
      <div
        className={clsx("min-h-screen px-6 py-4", "flex flex-col", "bg-black")}
      >
        <div
          className={clsx(
            "m-auto mt-[72px] md:mt-20",
            "flex flex-1 flex-col items-center",
            "text-left text-white",
            "max-w-96",
          )}
        >
          <VideoPlayer
            className={clsx("mb-6", "max-w-36 md:max-w-44")}
            heightRatio={video.heightRatio}
            playbackId={video.playbackId}
            widthRatio={video.widthRatio}
          />
          <h1 className={clsx("mb-6", "uppercase", "text-xl", "text-gray-400")}>
            [ {title} ]
          </h1>
          {image && (
            <Image
              alt={image.alt}
              className='mb-6 w-full'
              height={100}
              quality={100}
              src={image.src}
              width={100}
            />
          )}
          <div className={clsx("text-sm md:text-base")}>
            {textBlocks.map((block, idx) => {
              if (block.type === "title") {
                return (
                  <h2 className={clsx("font-bold uppercase")} key={idx}>
                    {block.text}
                  </h2>
                );
              } else if (block.type === "quote") {
                return (
                  <p className={"font-bold uppercase"} key={idx}>
                    {block.text}
                  </p>
                );
              } else {
                return (
                  <p className={clsx("mb-6 w-full")} key={idx}>
                    {block.text}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};
