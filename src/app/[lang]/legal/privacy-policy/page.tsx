import { FC } from "react";

import { clsx } from "clsx";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";
import { getPrivacyPolicy } from "@lib/shopify";
import { getSupportedLanguageCodeFromLocale } from "@lib/utils";

type Params = {
  lang: Locale;
};

type IProps = {
  params: Params;
};

const PrivacyPolicyPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const legal = await getPrivacyPolicy({
    lang: getSupportedLanguageCodeFromLocale(lang),
  });

  const dictionary = await getDictionary(lang);

  return (
    <>
      <div
        className={clsx(
          "fixed left-0 top-0 z-10",
          "h-[72px] w-full md:h-[96px]",
          "border-b border-neutral-200 bg-white",
        )}
      ></div>
      <div
        className={"flex w-full flex-col pt-[72px] md:flex-row md:pt-[96px] "}
      >
        <div
          className={"mb-5 mt-10 flex justify-center md:min-h-screen md:w-1/2"}
        >
          <h1
            className={
              "max-w-xs text-4xl font-bold uppercase text-black underline md:fixed"
            }
          >
            {dictionary.pages.privacyPolicy}
          </h1>
        </div>
        <div className={"flex justify-center md:w-1/2"}>
          <div
            dangerouslySetInnerHTML={{ __html: legal.body }}
            className={"mb-5 flex-grow px-10"}
          />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
