import "@averse/app/globals.css";

import { FC, PropsWithChildren } from "react";

import { getDictionary } from "@lib/i18n/utils";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
};

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("en");
  const { metadata } = dictionary.home;

  return {
    metadataBase: new URL(process.env.BASE_URL || "https://averse-paris.com"),
    title: metadata.title,
    description: metadata.description,
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
