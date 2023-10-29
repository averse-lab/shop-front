import { FC } from "react";

import muxBlurHash from "@mux/blurhash";
import { clsx } from "clsx";
import { Metadata } from "next";

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

async function getBlurHash(playbackId: string) {
  const { blurHash, blurHashBase64, sourceWidth, sourceHeight } =
    await muxBlurHash(playbackId);

  return { blurHash, blurHashBase64, sourceWidth, sourceHeight };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.about.title} | Averse`,
    description: dictionary.about.paragraph1,
    openGraph: {
      title: `${dictionary.about.title} | Averse`,
      description: dictionary.about.paragraph1,
    },
  };
}

const AboutPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const { playbackId, heightRatio, widthRatio } = ABOUT_VIDEO;

  const blurData = await getBlurHash(playbackId);

  const dictionary = await getDictionary(lang);

  return (
    <div className={clsx("min-h-screen px-6 py-4", "bg-black")}>
      <div
        className={clsx(
          "m-auto mt-[72px] md:mt-[96px]",
          "lg:max-w-[550px]",
          "flex flex-col items-center justify-center",
          "text-center text-white",
        )}
      >
        <VideoPlayer
          className={clsx("mb-12", "max-w-[80%] md:max-w-[250px]")}
          playbackId={playbackId}
          heightRatio={heightRatio}
          widthRatio={widthRatio}
          blurHashBase64={blurData.blurHashBase64}
        />
        <p>{dictionary.about.paragraph1}</p>
        <p className={clsx("mb-4")}>{dictionary.about.paragraph2}</p>
        <p className={clsx("mb-4")}>{dictionary.about.paragraph3}</p>
        <p className={clsx("mb-12")}>{dictionary.about.paragraph4}</p>
        {lang === "en" ? (
          <p className={clsx("mb-4")}>{dictionary.about.paragraph5}</p>
        ) : null}
        <p className={clsx("mb-4")}>{dictionary.about.paragraph6}</p>
        <p className={clsx("mb-12 text-2xl")}>[&emsp;]</p>
        <p>{dictionary.about.quote}</p>
      </div>
    </div>
  );
};

export default AboutPage;
