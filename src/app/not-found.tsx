import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { ABOUT_VIDEO } from "@averse/app/[lang]/about/_internal/AboutPage.constants";
import { CATEGORIES } from "@averse/app/[lang]/shop/_internal/ShopPage.constants";

import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { DMSans } from "@lib/fonts";
import { PAGES } from "@lib/routing/constants";

const NotFound: FC = async () => {
  const { playbackId, heightRatio, widthRatio } = ABOUT_VIDEO;

  return (
    <html>
      <body
        className={clsx(
          DMSans.variable,
          "min-h-screen",
          "flex flex-col",
          "font-sans",
        )}
      >
        <main>
          <div className={clsx("min-h-screen px-6 py-4", "bg-black")}>
            <div
              className={clsx(
                "m-auto mt-[72px] md:mt-[96px]",
                "lg:max-w-[550px]",
                "flex flex-col items-center justify-center",
                "text-center text-white",
              )}
            >
              <h1
                className={clsx(
                  "text-4xl font-bold uppercase  underline-offset-8",
                  "mb-12 text-white",
                )}
              >
                PAGE_NOT_FOUND
              </h1>
              <VideoPlayer
                className={clsx("mb-12", "max-w-[80%] md:max-w-[250px]")}
                playbackId={playbackId}
                heightRatio={heightRatio}
                widthRatio={widthRatio}
              />
              <button
                className={clsx(
                  "px-4 py-2",
                  "text-white",
                  "bg-black",
                  "border border-white",
                )}
              >
                <Link href={`/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`}>
                  GO_BACK_HOME
                </Link>
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default NotFound;
