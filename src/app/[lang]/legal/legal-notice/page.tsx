import { FC } from "react";

import clsx from "clsx";

import { HeaderContextInitializer } from "@components/HeaderContextInitializer";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getPage } from "@lib/shopify";
import { getSupportedLanguageCodeFromLocale } from "@lib/utils";

type Params = {
  lang: Locale;
};

type IProps = {
  params: Params;
};

const LegalNoticePage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const legal = await getPage({
    lang: getSupportedLanguageCodeFromLocale(lang),
    handle: "legal-notice",
  });
  const dictionary = await getDictionary(lang);

  return (
    <div className='bg-white'>
      <HeaderContextInitializer
        cartBtnColor='white'
        cartBtnIcnColor='black'
        headerBgColor='white'
        logoColor='black'
        logoType='typographic'
        logoVisible
        menuBgColor='black'
        menuBtnColor='white'
        menuBtnIcnColor='black'
      />
      <div className={clsx("mt-[72px] md:mt-[96px]", "px-6 py-8 lg:px-12", "flex flex-col gap-4")}>
        <h1 className={clsx("text-4xl font-bold uppercase")}>{dictionary.pages.legalNotice}</h1>
        <div dangerouslySetInnerHTML={{ __html: legal.body }} />
      </div>
    </div>
  );
};

export default LegalNoticePage;
