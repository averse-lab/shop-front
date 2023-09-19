import muxBlurHash from "@mux/blurhash";
import React, { FC } from "react";
import { Header } from "@averse/components";
import { getDictionary } from "@averse/lib/i18n/utils";
import { Locale } from "@averse/lib/i18n/types";

async function getData() {
  const { sourceWidth, sourceHeight, blurHashBase64 } = await muxBlurHash(
    "xj75R68qvoJq7hJtEkQDTifVY6PZMYzWuzXxuhAwDtw",
  );

  return {
    sourceWidth,
    sourceHeight,
    blurHashBase64,
  };
}

type IProps = {
  params: { lang: Locale };
};

const HomePage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const dictionnary = await getDictionary(lang);

  return (
    <>
      <Header dictionnary={dictionnary} lang={lang} />
      <main>
        <div className='h-screen w-full bg-red-500'></div>
        {/* <VideoPlayer
        className='h-full'
        playbackId={"9NAAiw4fOQs02P00n7nSKuP1GEQfwrRipeVG2pgllB01WI"}
      />
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-30'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
        <h1 className='text-4xl font-bold text-white'>Averse</h1>
        <p>HAND ENGRAVER AND JEWELLER BASED IN PARIS</p>
        <Link href={"/shop"}>
          <button className='mt-4 px-8 py-2 text-lg font-bold text-black bg-white hover:bg-gray-100 rounded'>
            Go to shop
          </button>
        </Link>
      </div> */}
      </main>
    </>
  );
};

export default HomePage;
