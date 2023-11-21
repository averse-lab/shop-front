import { FC, PropsWithChildren } from "react";

import clsx from "clsx";

import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";

import { DMSans } from "@lib/fonts";
import { Dictionary, Locale } from "@lib/i18n/types";
import { combineProviders } from "@lib/utils";

import { CartContextProvider } from "@contexts/CartContext/CartContext";
import { HeaderContextProvider } from "@contexts/HeaderContext/HeaderContext";

type IProps = {
    lang: Locale
    dictionary: Dictionary
} & PropsWithChildren

export const BaseLayout: FC<IProps> = (props) => {
    const {lang, dictionary, children} = props
    const AppProvider = combineProviders([
        CartContextProvider,
        HeaderContextProvider,
      ]);

    return <html lang={lang}>
    <body
      className={clsx(
        DMSans.variable,
        "mb-[220px] lg:mb-[204px]",
        "min-h-screen",
        "flex flex-col",
        "bg-black shadow-md",
        "font-sans",
      )}
    >
      <AppProvider>
        <Header dictionary={dictionary} lang={lang} />
        <main className={clsx("flex grow flex-col", "bg-white")}>
          {children}
        </main>
        <Footer dictionary={dictionary} lang={lang} />
      </AppProvider>
    </body>
  </html>
}