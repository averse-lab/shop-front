import { FC } from "react";

import { Metadata } from "next";

import { MiscPageTemplate } from "@components/MiscPage/MiscPageTemplate";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import { MATERIAL_VIDEO } from "./_internal/MaterialsPage.constants";

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { metadata } = dictionary.materials;

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

const MaterialsPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const { materials } = await getDictionary(lang);

  return (
    <MiscPageTemplate
      image={{
        src: "/images/materials/materials.png",
        alt: materials.title,
      }}
      textBlocks={[
        {
          type: "title",
          text: materials.title1,
        },
        {
          type: "paragraph",
          text: materials.paragraph1,
        },
        {
          type: "paragraph",
          text: materials.paragraph2,
        },
        {
          type: "title",
          text: materials.title2,
        },
        {
          type: "paragraph",
          text: materials.paragraph3,
        },
      ]}
      title={materials.title}
      video={{
        playbackId: MATERIAL_VIDEO.playbackId,
        widthRatio: MATERIAL_VIDEO.widthRatio,
        heightRatio: MATERIAL_VIDEO.heightRatio,
      }}
    />
  );
};

export default MaterialsPage;
