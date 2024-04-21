import { FC } from "react";

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
    <>
      <HeaderContextInitializer whiteBackground />
      <div
        className={"mt-[72px] flex w-full flex-col md:mt-[96px] md:flex-row "}
      >
        <div
          className={"mb-5 mt-10 flex justify-center md:min-h-screen md:w-1/2"}
        >
          <h1
            className={
              "max-w-xs text-4xl font-bold uppercase text-black underline md:fixed"
            }
          >
            {dictionary.pages.legalNotice}
          </h1>
        </div>
        <div className={"flex justify-center md:w-1/2"}>
          <div
            className={"mb-5 flex-grow px-10"}
            dangerouslySetInnerHTML={{ __html: legal.body }}
          />
        </div>
      </div>
    </>
  );
};

export default LegalNoticePage;
