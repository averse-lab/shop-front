import "@averse/app/globals.css";

import { FC, PropsWithChildren } from "react";

import { Footer } from "@components/Footer/Footer";

import { hankenGrotesk } from "@lib/fonts";
import { Locale } from "@lib/i18n/types";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Averse",
  description: "Averse is a jewelery brand.",
};

type IProps = {
  params: { lang: Locale };
} & PropsWithChildren;

const RootLayout: FC<IProps> = ({ children, params }) => {
  return (
    <html lang={params.lang}>
      <body
        className={`${hankenGrotesk.variable} font-sans min-h-screen flex flex-col`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
