import { FC } from "react";

import { Metadata } from "next";

import { MiscPageTemplate } from "@components/MiscPage/MiscPageTemplate";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import { PROCESS_ALT_VIDEO, PROCESS_VIDEO } from "./_internal/ProcessPage.constants";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.process;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: generateAlternates(`/${PAGES.process.url}`, lang),
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

const ProcessPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const { process } = await getDictionary(lang);

  return (
    <MiscPageTemplate
      textBlocks={[
        {
          type: "paragraph",
          text: process.paragraph1,
        },
        { type: "title", text: process.title1 },
        {
          type: "paragraph",
          text: process.paragraph2,
        },
        {
          type: "title",
          text: process.title2,
        },
        {
          type: "paragraph",
          text: process.paragraph3,
        },
        {
          type: "title",
          text: process.title3,
        },
        {
          type: "paragraph",
          text: process.paragraph4,
        },
        {
          type: "quote",
          text: process.quote,
        },
      ]}
      title={process.title}
      video={{
        playbackId: PROCESS_VIDEO.playbackId,
        widthRatio: PROCESS_VIDEO.widthRatio,
        heightRatio: PROCESS_VIDEO.heightRatio,
      }}
      altVideo={{
        playbackId: PROCESS_ALT_VIDEO.playbackId,
        widthRatio: PROCESS_ALT_VIDEO.widthRatio,
        heightRatio: PROCESS_ALT_VIDEO.heightRatio,
      }}
    />
  );
};

export default ProcessPage;
