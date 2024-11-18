import { FC } from "react";

import { Metadata } from "next";

import { MiscPageTemplate } from "@components/MiscPage/MiscPageTemplate";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { PAGES } from "@lib/routing/constants";
import { generateAlternates } from "@lib/utils";

import { CONTACT_VIDEO } from "./_internal/ContactPage.constants";

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
    <MiscPageTemplate
      textBlocks={[
        {
          type: "paragraph",
          text: contact.paragraph1,
        },
        {
          type: "paragraph",
          text: contact.paragraph2,
        },
      ]}
      title={contact.title}
      video={{
        heightRatio: CONTACT_VIDEO.heightRatio,
        playbackId: CONTACT_VIDEO.playbackId,
        widthRatio: CONTACT_VIDEO.widthRatio,
      }}
    />
  );
};

export default ContactPage;
