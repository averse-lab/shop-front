import { FC } from "react";

import { clsx } from "clsx";

import { ABOUT_VIDEO } from "@averse/app/[lang]/about/_internal/AboutPage.constants";

import { BaseLayout } from "@components/BaseLayout/BaseLayout";
import { Button } from "@components/Button/Button";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer";

import { getDictionary } from "@lib/i18n/utils";
import { getMuxPlaceholder } from "@lib/mux/utils";

const NotFound: FC = async () => {
  const dictionary = await getDictionary("en");

  const videoPlaceholder = await getMuxPlaceholder({
    playbackId: ABOUT_VIDEO.playbackId,
    width: 64,
  });

  return (
    <>
      <BaseLayout dictionary={dictionary} lang='en'>
        <HeaderContextInitializer whiteIcons />
        <div
          className={clsx(
            "min-h-screen px-6 py-4",
            "flex flex-col",
            "bg-black",
          )}
        >
          <div
            className={clsx(
              "m-auto mt-[72px] md:mt-[96px]",
              "lg:max-w-[550px]",
              "flex flex-1 flex-col items-center justify-center",
              "text-center text-white",
            )}
          >
            <h1 className={clsx("text-4xl font-bold uppercase", "mb-12")}>
              {dictionary.notFound.notFound}
            </h1>
            <VideoPlayer
              className={clsx(
                "mb-12",
                "max-w-[80%] md:max-w-[250px]",
                "aspect-square",
              )}
              placeholder={videoPlaceholder}
              playbackId={ABOUT_VIDEO.playbackId}
            />
            <Button
              className='border border-white'
              color='black'
              element='link'
              href='/'
              hrefLang={"en"}
            >
              {dictionary.notFound.goBackHome}
            </Button>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default NotFound;
