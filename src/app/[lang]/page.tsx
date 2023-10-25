import { FC } from "react";

import { Button } from "@components/Button/Button";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { I18N_CONFIG } from "@lib/i18n/config";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";

import { HOME_VIDEO, SECTIONS } from "./_internal/HomePage.constants";
import { CATEGORIES } from "./shop/_internal/ShopPage.constants";

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({ lang: locale }));
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

  return (
    <div className='relative h-screen flex flex-col justify-center items-center text-center p-4'>
      <VideoPlayer
        className={`absolute h-full w-full -z-10`}
        playbackId={HOME_VIDEO.playbackId}
        widthRatio={HOME_VIDEO.widthRatio}
        heighRatio={HOME_VIDEO.heightRatio}
      />
      <Button
        element='link'
        href={`/${lang}/${SECTIONS.shop.url}/${CATEGORIES.allProducts.url}`}
        transparent
      >
        {dictionary.home.enterWebsite}
      </Button>
    </div>
  );
};

export default HomePage;
