import "@averse/app/globals.css";

import { FC, PropsWithChildren } from "react";

import Head from "next/head";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Averse",
  description:
    "Averse is a jewelry atelier. Products are imagined in Paris, and made in France, using precious metals, and gems.",
  robots: "noindex",
};

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <meta name='theme-color' content='#000000' />
      </Head>
      {children}
    </>
  );
};

export default RootLayout;
