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
  const { enterWebsite, enterWebsiteAriaLabel, slogan } = dictionary.home;

  return (
    <>
      <HeaderContextInitializer />
      <section
        className={clsx(
          "relative z-0",
          "h-[90vh]",
          "flex flex-col items-center justify-end",
          "text-center",
          "relative",
        )}
      >
        <VideoPlayer
          className={clsx("absolute -z-10", "h-full w-full")}
          heightRatio={HOME_VIDEO.heightRatio}
          playbackId={HOME_VIDEO.playbackId}
          widthRatio={HOME_VIDEO.widthRatio}
        />
        <div className={clsx("absolute bottom-1/4 flex flex-col items-center")}>
          <FullLogo />
          <h2 className='mb-8 mt-16 text-lg uppercase leading-4 tracking-wider text-white'>
            {slogan}
          </h2>
          <Button
            ariaLabel={enterWebsiteAriaLabel}
            className='uppercase'
            color='black'
            element='link'
            href={`/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}
            hrefLang={lang}
            transparent
          >
            &gt;&gt;{enterWebsite}&lt;&lt;
          </Button>
        </div>
      </section>
      <section
        className={clsx(
          "flex h-full w-full flex-col items-center bg-black px-6 py-10 md:px-36 md:py-12",
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-2 place-items-center gap-4 md:mb-20 md:grid-cols-3 md:gap-5",
          )}
        >
          <ShopItem
            description='discover the collection'
            imagePath='/images/shop/shop.jpg'
            linkPath={`/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}
            title='Shop'
          />
          <ShopItem
            description='and the artist behind'
            imagePath='/images/about/about.jpg'
            linkPath={`/${lang}/${PAGES.about.url}`}
            title='about the project'
          />
          <ShopItem
            description='all you have to know about'
            imagePath='/images/materials/materials.jpg'
            linkPath={`/${lang}/${PAGES.materials.url}`}
            title='materials /// stones'
          />
          <ShopItem
            description='how is it made and where'
            imagePath='/images/process/process.jpg'
            linkPath={`/${lang}/${PAGES.process.url}`}
            title='process'
          />
          <ShopItem
            description='personalized orders are the more exciting ones'
            imagePath='/images/contact/contact.jpg'
            linkPath={`/${lang}/${PAGES.shop.url}`}
            title='contact us'
          />
        </div>
        <div className={clsx("text-right font-light text-gray-500")}>
          {/* <p>
            “IN THE SHARP, CALCULATED PRECISION OF MATHEMATICAL SHAPES LIES THE
            POTENTIAL FOR COLD, GRADUAL DECAY, WHILE WITHIN THE UNCONTROLLED,
            ETERNAL BLOOM OF FLOWERS, EMOTIONS FIND THEIR UNYIELDING, WARM
            ESSENCE.
          </p>
          <p className={clsx("mt-4")}>
            I’LL NEVER CHOOSE BETWEEN THESE TWO MAGNIFICENT UNIVERSES.”
          </p>
					< */}
        </div>
      </section>
    </>
  );
};

export default HomePage;
