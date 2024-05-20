import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Link from "next/link";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { Button } from "@components/ui/button";
import { VideoPlayer } from "@components/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getMuxPlaceholder } from "@lib/mux/utils";
import { CATEGORIES, PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import { HOME_VIDEO } from "./_internal/HomePage.constants";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.home;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: generateAlternates("", lang),
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

const HomePage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { enterWebsite, enterWebsiteAriaLabel } = dictionary.home;

  const videoPlaceholder = await getMuxPlaceholder({
    playbackId: HOME_VIDEO.playbackId,
    width: 512,
  });

  return (
    <>
      <HeaderContextInitializer
        cartBtnColor='black'
        cartBtnIcnColor='white'
        headerBgColor='transparent'
        langBtnColor='black'
        langBtnIcnColor='white'
        logoVisible
        menuBgColor='black'
        menuBtnColor='black'
        menuBtnIcnColor='white'
      />
      <div
        className={clsx(
          "relative z-0",
          "h-screen p-4",
          "flex flex-col items-center justify-center",
          "text-center",
        )}
      >
        <VideoPlayer
          className={clsx("absolute -z-10", "h-full w-full")}
          minResolution='1440p'
          placeholder={videoPlaceholder}
          playbackId={HOME_VIDEO.playbackId}
        />
        <Button asChild>
          <Link href={`/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}>
            {enterWebsite}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default HomePage;
