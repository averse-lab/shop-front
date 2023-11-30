import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { Locale } from "@lib/i18n/types";

import s from "./_internal/FilterSelector.module.scss";
import { Filter } from "./_internal/FilterSelector.types";

interface IProps {
  filters: Filter[];
  selectedFilterIndex: number;
  className?: string;
  lang: Locale;
}

export const FilterSelector: FC<IProps> = (props) => {
  const { filters, selectedFilterIndex, className, lang } = props;

  return (
    <div
      className={clsx(
        className,
        s["filters-selector"],
        "w-fit",
        "px-6 py-4",
        "gap-6",
        "rounded-xl shadow-sm",
      )}
    >
      {filters.map(({ display, url }, idx) => (
        <Link
          className={clsx(
            s["filters-selector__link"],
            "transition-all duration-200 ease-out",
            "whitespace-nowrap lg:hover:scale-[1.025] lg:hover:font-medium lg:hover:text-black",
            idx === selectedFilterIndex && "scale-[1.025] font-medium",
            idx === selectedFilterIndex ? "text-black" : "text-neutral-800",
          )}
          href={url}
          hrefLang={lang}
          key={url}
        >
          {display}
        </Link>
      ))}
    </div>
  );
};
