import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import {
  ABOUT_VIDEO,
  CRYING_GIRL_VIDEO,
  IRRATIONAL_CUBE_VIDEO,
} from "./_internal/AboutPage.constants";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.about;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: generateAlternates(`/${PAGES.about.url}`, lang),
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

const AboutPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <HeaderContextInitializer hideLogo whiteIcons />
      <div
        className={clsx("min-h-screen px-6 py-4", "flex flex-col", "bg-black")}
      >
        <div
          className={clsx(
            "m-auto mt-[72px] md:mt-[96px]",
            "lg:max-w-[550px]",
            "flex flex-1 flex-col items-center justify-center",
            "text-left text-white",
          )}
        >
          <VideoPlayer
            className={clsx("mb-12", "max-w-[90%] md:max-w-44")}
            heightRatio={ABOUT_VIDEO.heightRatio}
            playbackId={ABOUT_VIDEO.playbackId}
            widthRatio={ABOUT_VIDEO.widthRatio}
          />
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph1}</p>
          <p className={clsx("mb-4 w-full")}>[&emsp;]</p>
          <VideoPlayer
            className={clsx("mb-12 w-full")}
            heightRatio={IRRATIONAL_CUBE_VIDEO.heightRatio}
            playbackId={IRRATIONAL_CUBE_VIDEO.playbackId}
            widthRatio={IRRATIONAL_CUBE_VIDEO.widthRatio}
          />
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph2}</p>
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph3}</p>
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph4}</p>
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph5}</p>
          <p className={clsx("mb-4 w-full")}>[&emsp;]</p>
          <VideoPlayer
            className={clsx("mb-12 w-full")}
            heightRatio={CRYING_GIRL_VIDEO.heightRatio}
            playbackId={CRYING_GIRL_VIDEO.playbackId}
            widthRatio={CRYING_GIRL_VIDEO.widthRatio}
          />
          <p
            className={clsx(
              "mb-4 flex h-[500px] w-full flex-col gap-10 text-[#454545]",
            )}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            <span>{dictionary.about.paragraph7}</span>
            <span>{dictionary.about.quote}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
