import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Image from "next/image";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import { PROCESS_VIDEO } from "./_internal/ProcessPage.constants";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.process;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: generateAlternates(`/${PAGES.process.url}`, lang),
    twitter: {
      card: "summary",
      title: metadata.title,
      description: metadata.twitterDescription,
      images: {
        url: "/images/open-graph/twitter-cards.webp",
        alt: lang === "en" ? "Averse logo" : "Logo Averse",
        type: "image/webp",
        height: 1024,
        width: 1024,
      },
    },
    openGraph: {
      type: "website",
      title: metadata.title,
      description: metadata.twitterDescription,
      url: `/`,
      images: {
        url: "/images/open-graph/facebook-og.webp",
        alt: "Averse logo",
        type: "image/webp",
        height: 1024,
        width: 1955,
      },
    },
  };
}

type Params = {
  lang: Locale;
};

type IProps = {
  params: Params;
};

const ProcessPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const { process } = await getDictionary(lang);

  return (
    <>
      <HeaderContextInitializer hideLogo whiteIcons />
      <div
        className={clsx("min-h-screen px-6 py-4", "flex flex-col", "bg-black")}
      >
        <div
          className={clsx(
            "m-auto mt-[72px] md:mt-[96px]",
            "lg:max-w-[370px]",
            "flex flex-1 flex-col items-center justify-center",
            "text-left text-white",
          )}
        >
          <VideoPlayer
            className={clsx("mb-6", "max-w-[90%] md:max-w-44")}
            heightRatio={PROCESS_VIDEO.heightRatio}
            playbackId={PROCESS_VIDEO.playbackId}
            widthRatio={PROCESS_VIDEO.widthRatio}
          />
          <h1 className={clsx("mb-6", "uppercase", "text-xl", "text-gray-400")}>
            [{process.title}]
          </h1>
          <Image
            alt={process.title1}
            className='mb-6 w-full max-w-44'
            height={100}
            src={"/images/process/process.jpg"}
            width={100}
          />
          <div>
            <p className={clsx("mb-6 w-full")}>{process.paragraph1}</p>
            <h2 className={clsx("font-bold uppercase")}>{process.title1}</h2>
            <p className={clsx("mb-6 w-full")}>{process.paragraph2}</p>
            <h2 className={clsx("font-bold uppercase")}>{process.title2}</h2>
            <p className={clsx("mb-6 w-full")}>{process.paragraph3}</p>
            <h2 className={clsx("font-bold uppercase")}>{process.title3}</h2>
            <p className={clsx("mb-6 w-full")}>{process.paragraph4}</p>
            <p className={clsx("font-bold uppercase")}>{process.quote}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessPage;
