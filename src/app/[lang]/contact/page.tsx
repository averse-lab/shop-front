import { FC } from "react";

import { clsx } from "clsx";
import { Metadata } from "next";

import { CONTACT_VIDEO } from "@averse/app/[lang]/contact/_internal/ContactPage.constants";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer/HeaderContextInitializer";
import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.contact;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: generateAlternates(`/${PAGES.materials.url}`, lang),
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

const ContactPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const { contact } = await getDictionary(lang);

  return (
    <>
      <HeaderContextInitializer hideLogo whiteIcons />
      <div
        className={clsx("min-h-screen px-6 py-4", "flex flex-col", "bg-black")}
      >
        <div
          className={clsx(
            "m-auto mt-[72px] md:mt-[96px]",
            "lg:max-w-[550px]",
            "flex flex-1 flex-col items-center",
            "text-left text-white",
          )}
        >
          <VideoPlayer
            className={clsx("mb-6", "max-w-[90%] md:max-w-44")}
            heightRatio={CONTACT_VIDEO.heightRatio}
            playbackId={CONTACT_VIDEO.playbackId}
            widthRatio={CONTACT_VIDEO.widthRatio}
          />
          <h1
            className={clsx(
              "mb-6",
              "uppercase",
              "text-xl",
              "text-gray-400",
              "font-bold",
            )}
          >
            [{contact.title}]
          </h1>
          <div>
            {/* <h2 className={clsx("font-bold uppercase")}>{contact.title2}</h2> */}
            <p className={clsx("mb-6 w-full")}>{contact.paragraph1}</p>
            <p className={clsx("mb-6 w-full")}>{contact.paragraph2}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
