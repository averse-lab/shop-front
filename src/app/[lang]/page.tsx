import muxBlurHash from "@mux/blurhash";
import React, { FC } from "react";
import { Button, Header, VideoPlayer } from "@averse/components";
import { getDictionary } from "@averse/lib/i18n/utils";
import { Locale } from "@averse/lib/i18n/types";
import { I18N_CONFIG } from "@averse/lib/i18n/config";
import s from "./_internal/HomePage.module.scss";
import { HOME_VIDEO } from "./_internal/HomePage.constants";
import { SectionsKey } from "../_internal/types";
import { SECTIONS } from "../_internal/constants";

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({ lang: locale }));
}

type IProps = {
  params: { lang: Locale };
};

const HomePage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  const shopSection = SECTIONS.get(SectionsKey.SHOP)!;

  return (
    <>
      <Header dictionary={dictionary} lang={lang} />
      <main>
        <div
          className={`${s["banner"]} relative flex flex-col justify-center items-center p-4 text-center`}
        >
          <VideoPlayer
            className={`absolute h-full w-full z-0`}
            playbackId={HOME_VIDEO.playbackId}
            aspectRatio={HOME_VIDEO.aspectRatio}
          />
          <h1 className='text-4xl font-bold text-white z-10 mb-2'>Averse</h1>
          <p className='z-10 mb-2'>HAND ENGRAVER AND JEWELLER BASED IN PARIS</p>
          <Button
            className='z-10'
            element='link'
            href={`/${lang}/${shopSection.url}`}
          >
            Go to shop
          </Button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
