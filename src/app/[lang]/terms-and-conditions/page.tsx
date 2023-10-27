import { FC } from "react";

import { clsx } from "clsx";

import { Locale } from "@lib/i18n/types";
import { getDictionary } from "@lib/i18n/utils";

type Params = {
  lang: Locale;
};

type IProps = {
  params: Params;
};

const TermsAndConditionsPage: FC<IProps> = async (props) => {
  const { params } = props;
  const { lang } = params;

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
      <div className={clsx("mt-[72px] md:mt-[96px]", "px-6 py-4")}>
        <h1 className={clsx("mb-6", "text-2xl font-bold")}>
          {dictionary.pages.termsAndConditions}
        </h1>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
