import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";
import Link from "next/link";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { FullLogo } from "@components/Home/FullLogo/FullLogo";
import { ShopItem } from "@components/Home/ShopItem/ShopItem";
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
  const { enterWebsite, enterWebsiteAriaLabel, quote } = dictionary.home;

  const videoPlaceholder = await getMuxPlaceholder({
    playbackId: HOME_VIDEO.playbackId,
    width: 512,
  });

  return (
    <div className='bg-black md:mt-[96px]'>
      <HeaderContextInitializer
        cartBtnColor='white'
        cartBtnIcnColor='white'
        headerBgColor='black'
        logoColor='white'
        logoType='typographic'
        logoVisible
        menuBgColor='black'
        menuBtnColor='white'
        menuBtnIcnColor='white'
      />
      <section
        className={clsx(
          "relative z-0",
          "flex flex-col items-center justify-end",
          "text-center",
          "relative",
          "bg-black",
          "aspect-video",
          "md:container",
        )}
      >
        {/* <div className={clsx("absolute -z-10 h-full w-full md:container")}> */}
        <VideoPlayer
          className={clsx("h-full w-full")}
          minResolution='1440p'
          placeholder={videoPlaceholder}
          playbackId={HOME_VIDEO.playbackId}
        />
        {/* </div> */}
        <div
          className={clsx("absolute bottom-1/4 flex w-1/2 max-w-80 flex-col items-center md:w-1/4")}
        >
          <FullLogo className='mb-10 w-full' />
          <Button asChild className='w-full'>
            <Link href={`/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}>
              [ {enterWebsite} ]
            </Link>
          </Button>
        </div>
      </section>
      <section className={clsx("flex h-full w-full grow flex-col items-center bg-black")}>
        <div
          className={clsx(
            "my-3 grid w-full auto-rows-[1fr] grid-cols-2 items-start gap-x-3 gap-y-1 px-7 md:container lg:grid-cols-3",
          )}
        >
          <ShopItem
            imagePath='/images/shop/shop.jpg'
            linkPath={`/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}
            title='Shop'
          />
          <ShopItem
            imagePath='/images/about/about.jpg'
            linkPath={`/${lang}/${PAGES.about.url}`}
            title='about the project'
          />
          <ShopItem
            imagePath='/images/materials/materials.png'
            linkPath={`/${lang}/${PAGES.materials.url}`}
            title='materials /// stones'
          />
          <ShopItem
            imagePath='/images/process/process.png'
            linkPath={`/${lang}/${PAGES.process.url}`}
            title='process'
          />
          <ShopItem
            imagePath='/images/contact/contact.jpg'
            linkPath={`/${lang}/${PAGES.contact.url}`}
            title='contact us'
          />
        </div>
        <div
          className={clsx(
            "mt-52 flex max-w-[80%] flex-col items-end text-right font-light text-gray-500 md:container md:col-start-3 md:row-start-3 md:mb-3",
          )}
        >
          <p>{quote.paragraph1}</p>
          <p className={clsx("mt-4")}>{quote.paragraph2}</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
