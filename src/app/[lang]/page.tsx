import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";

import { Button } from "@components/Button/Button";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { I18N_CONFIG } from "@lib/i18n/config";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { CATEGORIES, PAGES } from "@lib/routing/constants";

import { HOME_VIDEO } from "./_internal/HomePage.constants";

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.home;

  return {
    title: metadata.title,
    description: metadata.description,
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

  return (
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
        heightRatio={HOME_VIDEO.heightRatio}
        playbackId={HOME_VIDEO.playbackId}
        widthRatio={HOME_VIDEO.widthRatio}
      />
      <Button
        ariaLabel={enterWebsiteAriaLabel}
        element='link'
        href={`/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}
        transparent
      >
        {enterWebsite}
      </Button>
    </div>
  );
};

export default HomePage;
