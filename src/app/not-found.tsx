import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { ABOUT_VIDEO } from "@averse/app/[lang]/about/_internal/AboutPage.constants";

import { BaseLayout } from "@components/BaseLayout/BaseLayout";
import { HeaderContextInitializer } from "@components/HeaderContextInitializer";
import { Button } from "@components/ui/button";
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
        <HeaderContextInitializer
          cartBtnColor='white'
          cartBtnIcnColor='white'
          headerBgColor='transparent'
          logoVisible={false}
          menuBgColor='white'
          menuBtnColor='white'
          menuBtnIcnColor='white'
        />
        <div
          className={clsx(
            "min-h-dvh px-6 py-8 lg:px-12",
            "flex flex-col items-center justify-center gap-8",
            "bg-black",
          )}
        >
          <h1 className={clsx("text-4xl font-bold uppercase text-white")}>
            {dictionary.notFound.notFound}
          </h1>
          <VideoPlayer
            className={clsx("max-w-[80%] md:max-w-[250px]", "aspect-square")}
            placeholder={videoPlaceholder}
            playbackId={ABOUT_VIDEO.playbackId}
          />
          <Button asChild variant='outline'>
            <Link href='/'>{dictionary.notFound.goBackHome}</Link>
          </Button>
        </div>
      </BaseLayout>
    </>
  );
};

export default NotFound;
