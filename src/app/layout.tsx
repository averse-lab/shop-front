import "@averse/app/globals.scss";

import { FC, PropsWithChildren } from "react";

import { getDictionary } from "@lib/i18n/utils";
import { generateAlternates } from "@lib/utils";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
};

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("en");
  const { metadata } = dictionary.home;

  return {
    metadataBase: new URL(process.env.BASE_URL || "https://averseparis.com"),
    title: metadata.title,
    description: metadata.description,
    alternates: generateAlternates("", "en"),
    twitter: {
      card: "summary",
      title: metadata.title,
      description: metadata.twitterDescription,
      images: {
        url: "/images/open-graph/twitter-cards.webp",
        alt: "Averse logo",
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

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return children;
};

export default RootLayout;
