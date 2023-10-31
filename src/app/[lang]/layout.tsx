import { FC, PropsWithChildren } from "react";

import { clsx } from "clsx";

import { CartContextProvider } from "@averse/contexts/CartContext/CartContext";

import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";

import { DMSans } from "@lib/fonts";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";

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
          "mb-[220px] lg:mb-[204px]",
          "min-h-screen",
          "flex flex-col",
          "bg-black",
          "font-sans",
        )}
      >
        <CartContextProvider>
          <Header dictionary={dictionary} lang={lang} />
          <main className={clsx("flex grow flex-col", "bg-white")}>
            {children}
          </main>
          <Footer dictionary={dictionary} lang={lang} />
        </CartContextProvider>
      </body>
    </html>
  );
};

export default LangLayout;
