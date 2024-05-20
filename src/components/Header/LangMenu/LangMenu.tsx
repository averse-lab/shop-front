import { FC } from "react";

import clsx from "clsx";

import { LangButton } from "@components/Header/LangMenu/LangButton/LangButton";

import { Dictionary, Locale } from "@lib/i18n/types";

interface IProps {
  lang: Locale;
  className?: string;
  dictionary: Dictionary;
}

export const LangMenu: FC<IProps> = (props) => {
  const { dictionary, lang, className } = props;
  const { openCartAriaLabel, closeBurgerMenuAriaLabel } = dictionary.header;

  return (
    <LangButton
      ariaLabel='Change language'
      className={clsx(className, "[&:hover+div]:translate-x-[calc(100%-8px)]")}
      onClick={() => {}}
    />
  );
};
