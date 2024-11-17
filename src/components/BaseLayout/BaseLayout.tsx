import { FC, PropsWithChildren } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import Script from "next/script";

import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header";

import { AbhayaLibre, Inter } from "@lib/fonts";
import { Dictionary, Locale } from "@lib/i18n/types";
import { combineProviders } from "@lib/utils";

import { CartContextProvider } from "@contexts/CartContext/CartContext";
import { HeaderContextProvider } from "@contexts/HeaderContext/HeaderContext";

type IProps = {
  lang: Locale;
  dictionary: Dictionary;
} & PropsWithChildren;

export const BaseLayout: FC<IProps> = (props) => {
  const { lang, dictionary, children } = props;
  const AppProvider = combineProviders([CartContextProvider, HeaderContextProvider]);

  return (
    <html lang={lang}>
      {process.env.NODE_ENV === "production" && (
        <Script
          async
          data-website-id='6a54afd6-bd05-486d-a7b1-7b8e196ba978'
          src='https://eu.umami.is/script.js'
          strategy='afterInteractive'
        />
      )}
      <body
        className={clsx(
          AbhayaLibre.variable,
          Inter.variable,
          "mb-[220px] lg:mb-[204px]",
          "min-h-screen",
          "flex flex-col",
          "bg-black shadow-md",
          "font-sans",
        )}
      >
        <SpeedInsights />
        <Analytics />
        <AppProvider>
          <Header dictionary={dictionary} lang={lang} />
          <main className={clsx("flex grow flex-col", "bg-white")}>{children}</main>
          <Footer dictionary={dictionary} lang={lang} />
        </AppProvider>
      </body>
    </html>
  );
};
