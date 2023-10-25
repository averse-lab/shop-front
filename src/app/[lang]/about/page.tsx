import { FC } from "react";

import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";

import { ABOUT_VIDEO } from "./_internal/AboutPage.constants";

type Params = {
  lang: Locale;
};

type IProps = {
  params: Params;
};

const AboutPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const { playbackId, heightRatio, widthRatio } = ABOUT_VIDEO;

  const dictionary = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-black px-6 py-4'>
      <div className='mt-[72px] md:mt-[96px] lg:max-w-[550px] flex flex-col justify-center items-center text-white text-center m-auto'>
        <VideoPlayer
          className='max-w-[80%] md:max-w-[250px] mb-12'
          playbackId={playbackId}
          heighRatio={heightRatio}
          widthRatio={widthRatio}
        />
        <p>{dictionary.about.paragraph1}</p>
        <p className='mb-4'>{dictionary.about.paragraph2}</p>
        <p className='mb-4'>{dictionary.about.paragraph3}</p>
        <p className='mb-12'>{dictionary.about.paragraph4}</p>
        <p className='mb-4'>{dictionary.about.paragraph5}</p>
        <p className='mb-4'>{dictionary.about.paragraph6}</p>
        <p className='mb-12 text-2xl'>[&emsp;]</p>
        <p>{dictionary.about.quote}</p>
      </div>
    </div>
  );
};

export default AboutPage;
