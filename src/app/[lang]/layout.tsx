import { FC, PropsWithChildren } from "react";

import { clsx } from "clsx";

import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";

import { DMSans } from "@lib/fonts";
import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { combineProviders } from "@lib/utils";

import { CartContextProvider } from "@contexts/CartContext/CartContext";
import { HeaderContextProvider } from "@contexts/HeaderContext/HeaderContext";

type IProps = {
  params: { lang: Locale };
} & PropsWithChildren;

const LangLayout: FC<IProps> = async (props) => {
  const { params, children } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  const AppProvider = combineProviders([
    CartContextProvider,
    HeaderContextProvider,
  ]);

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
        <AppProvider>
          <Header dictionary={dictionary} lang={lang} />
          <main className={clsx("flex grow flex-col", "bg-white")}>
            {children}
          </main>
          <Footer dictionary={dictionary} lang={lang} />
        </AppProvider>
      </body>
    </html>
  );
};

export default LangLayout;
