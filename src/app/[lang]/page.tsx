import React, { FC } from "react";

import { Button } from "@components/Button/Button";

import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { I18N_CONFIG } from "@lib/i18n/config";
import { Locale } from "@lib/i18n/types";

import { HOME_VIDEO, SECTIONS } from "./_internal/HomePage.constants";

import { SectionsKey } from "./_internal/HomePage.types";

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({ lang: locale }));
}

type IProps = {
  params: { lang: Locale };
};

const HomePage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const shopSection = SECTIONS.get(SectionsKey.SHOP)!;

  return (
    <div className='relative h-screen flex flex-col justify-center items-center text-center p-4'>
      <VideoPlayer
        className={`absolute h-full w-full -z-10`}
        playbackId={HOME_VIDEO.playbackId}
        aspectRatio={HOME_VIDEO.aspectRatio}
      />
      <h1 className='text-4xl font-bold text-white  mb-2'>Averse</h1>
      <p className='mb-2'>HAND ENGRAVER AND JEWELLER BASED IN PARIS</p>
      <Button element='link' href={`/${lang}/${shopSection.url}`}>
        Go to shop
      </Button>
    </div>
  );
};

export default HomePage;
