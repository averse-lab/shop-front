import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getMuxPlaceholder } from "@lib/mux/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import { ABOUT_VIDEO, CRYING_GIRL_VIDEO } from "./_internal/AboutPage.constants";

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
  const cryingGirlVideoPlaceholder = await getMuxPlaceholder({
    playbackId: CRYING_GIRL_VIDEO.playbackId,
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
      <div className={clsx("min-h-screen px-6 py-4", "flex flex-col", "bg-black")}>
        <div
          className={clsx(
            "m-auto mt-[72px] md:mt-[96px]",
            "lg:max-w-[450px]",
            "flex flex-1 flex-col items-center justify-center",
            "text-left text-white",
            "max-w-96",
            "font-extralight",
          )}
        >
          <VideoPlayer
            className={clsx("mb-12 w-48", `aspect-[4/3]`)}
            minResolution='720p'
            placeholder={aboutVideoPlaceholder}
            playbackId={ABOUT_VIDEO.playbackId}
          />
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph1}</p>
          <p className={clsx("mb-4 w-full")}>[&emsp;]</p>
          <VideoPlayer
            className={clsx("mb-12 w-full", `aspect-[347/450]`)}
            minResolution='720p'
            placeholder={cryingGirlVideoPlaceholder}
            playbackId={CRYING_GIRL_VIDEO.playbackId}
          />
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph2}</p>
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph3}</p>
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph4}</p>
          <p className={clsx("mb-4 w-full")}>{dictionary.about.paragraph5}</p>
          <p className={clsx("mb-4 w-full")}>[&emsp;]</p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
