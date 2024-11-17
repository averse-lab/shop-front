import { FC } from "react";

import clsx from "clsx";
import Image from "next/image";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer";

import { getMuxPlaceholder } from "@lib/mux/utils";

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

export const MiscPageTemplate: FC<Props> = async (props) => {
  const { video, title, image, textBlocks } = props;

  const videoPlaceholder = await getMuxPlaceholder({
    playbackId: video.playbackId,
    width: 64,
  });

  return (
    <>
      <HeaderContextInitializer
        cartBtnColor='white'
        cartBtnIcnColor='white'
        headerBgColor='transparent'
        logoColor='white'
        logoType='plain'
        logoVisible={false}
        menuBgColor='white'
        menuBtnColor='white'
        menuBtnIcnColor='white'
      />
      <div className={clsx("min-h-screen px-6 py-4", "flex flex-col", "bg-black")}>
        <div
          className={clsx(
            "m-auto mt-[72px] md:mt-[96px]",
            "lg:max-w-[550px]",
            "flex flex-1 flex-col items-center justify-center",
            "text-left text-white",
            "max-w-96",
          )}
        >
          <VideoPlayer
            className={clsx("mb-12 w-full max-w-48", `aspect-[4/3]`)}
            minResolution='720p'
            placeholder={videoPlaceholder}
            playbackId={video.playbackId}
          />
          <h1 className={clsx("mb-6 md:mb-20", "uppercase", "text-xl", "text-gray-400")}>
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
                  <h2 className={clsx("font-normal uppercase")} key={idx}>
                    {block.text}
                  </h2>
                );
              } else if (block.type === "quote") {
                return (
                  <p className={"font-extralight uppercase"} key={idx}>
                    {block.text}
                  </p>
                );
              } else {
                return (
                  <p className={clsx("mb-6 w-full font-extralight")} key={idx}>
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
