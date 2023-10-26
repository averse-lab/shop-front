import { FC, PropsWithChildren } from "react";

import { clsx } from "clsx";

import { CartContextProvider } from "@averse/contexts/CartContext/CartContext";

import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";

import { DMSans } from "@lib/fonts";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Averse",
  description: "Averse is a jewelery brand.",
};

type IProps = {
  params: { lang: Locale };
} & PropsWithChildren;

const LangLayout: FC<IProps> = async (props) => {
  const { params, children } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body
        className={clsx(
          DMSans.variable,
          "min-h-screen",
          "flex flex-col",
          "font-sans",
        )}
      >
        <CartContextProvider>
          <Header dictionary={dictionary} lang={lang} />
          <main className={clsx("flex flex-col grow")}>{children}</main>
          <Footer />
        </CartContextProvider>
      </body>
    </html>
  );
};

export default LangLayout;
