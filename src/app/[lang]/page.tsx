import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";

import { Button } from "@components/Button/Button";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";
import { FullLogo } from "@components/Home/FullLogo/FullLogo";
import { ShopItem } from "@components/Home/ShopItem/ShopItem";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
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

  return (
    <>
      <HeaderContextInitializer
        blackBackground
        logoType='typographic'
        whiteIcons
      />
      <section
        className={clsx(
          "relative z-0",
          "h-[90vh]",
          "flex flex-col items-center justify-end",
          "text-center",
          "relative",
          "bg-black",
        )}
      >
        <VideoPlayer
          className={clsx("absolute -z-10", "h-full  w-full md:px-52 md:pt-24")}
          heightRatio={HOME_VIDEO.heightRatio}
          playbackId={HOME_VIDEO.playbackId}
          widthRatio={HOME_VIDEO.widthRatio}
        />
        <div
          className={clsx(
            "absolute bottom-1/4 flex w-1/4 max-w-80 flex-col items-center",
          )}
        >
          <FullLogo className='mb-10 w-full' />
          <Button
            ariaLabel={enterWebsiteAriaLabel}
            className='w-full uppercase'
            color='black'
            element='link'
            href={`/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}
            hrefLang={lang}
            transparent
          >
            [{enterWebsite}]
          </Button>
        </div>
      </section>
      <section
        className={clsx(
          "flex h-full w-full grow flex-col items-center bg-black",
        )}
      >
        <div
          className={clsx(
            "my-2.5 grid w-full auto-rows-[1fr] grid-cols-2 items-start gap-x-2.5 gap-y-1 px-7 md:px-52 lg:grid-cols-3",
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
            imagePath='/images/materials/materials.jpg'
            linkPath={`/${lang}/${PAGES.materials.url}`}
            title='materials /// stones'
          />
          <ShopItem
            imagePath='/images/process/process.jpg'
            linkPath={`/${lang}/${PAGES.process.url}`}
            title='process'
          />
          <ShopItem
            imagePath='/images/contact/contact.jpg'
            linkPath={`/${lang}/${PAGES.contact.url}`}
            title='contact us'
          />
        </div>
        {/* <div
          className={clsx(
            "col-span-2 pt-10 text-right font-light text-gray-500 md:col-start-3 md:row-start-3 md:pt-12",
          )}
        >
          <p>{quote.paragraph1}</p>
          <p className={clsx("mt-4")}>{quote.paragraph2}</p>
        </div> */}
      </section>
    </>
  );
};

export default HomePage;
