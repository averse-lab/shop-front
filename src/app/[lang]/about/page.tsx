import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Image from "next/image";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getMuxPlaceholder } from "@lib/mux/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import { ABOUT_VIDEO, C0007_VIDEO } from "./_internal/AboutPage.constants";

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

  const aboutVideoPlaceholder = await getMuxPlaceholder({
    playbackId: ABOUT_VIDEO.playbackId,
    width: 64,
  });
  const C0007VideoPlaceholder = await getMuxPlaceholder({
    playbackId: C0007_VIDEO.playbackId,
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
        menuBgColor='black'
        menuBtnColor='white'
        menuBtnIcnColor='white'
      />
      <div
        className={clsx(
          "mx-auto mt-[64px] md:mt-[80px]",
          "min-h-screen px-6 py-4 md:max-w-[500px]",
          "flex flex-col items-center justify-center gap-4",
          "bg-black",
          "text-left font-extralight text-white",
        )}
      >
        <VideoPlayer
          className={clsx("mb-12 w-48", `aspect-[4/3]`)}
          minResolution='720p'
          placeholder={aboutVideoPlaceholder}
          playbackId={ABOUT_VIDEO.playbackId}
        />
        <p className={clsx("w-full")}>{dictionary.about.paragraph1}</p>
        <p className={clsx("w-full")}>[ ]</p>
        <VideoPlayer
          className={clsx("h-auto w-full", `aspect-[4/5]`)}
          minResolution='720p'
          placeholder={C0007VideoPlaceholder}
          playbackId={C0007_VIDEO.playbackId}
        />
        <p className={clsx("w-full")}>{dictionary.about.paragraph2}</p>
        <p className={clsx("w-full")}>{dictionary.about.paragraph3}</p>
        <p className={clsx("w-full")}>{dictionary.about.paragraph4}</p>
        <p className={clsx("w-full")}>{dictionary.about.paragraph5}</p>
        <p className={clsx("w-full")}>[ ]</p>
      </div>
    </>
  );
};

export default AboutPage;
