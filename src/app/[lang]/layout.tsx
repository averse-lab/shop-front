import { FC, PropsWithChildren } from "react";

import { BaseLayout } from "@components/BaseLayout/BaseLayout";

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
    <BaseLayout dictionary={dictionary} lang={lang}>
      {children}
    </BaseLayout>
  );
};

export default LangLayout;
