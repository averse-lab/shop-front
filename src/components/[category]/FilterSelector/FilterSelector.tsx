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
        "overflow-x-auto",
        "max-w-full",
        "px-4 py-2 md:px-6",
        "justify-between gap-4 md:justify-center md:gap-6",
        "border border-b border-[#D8D8D8]",
      )}
    >
      {filters.map(({ display, shortDisplay, url }, idx) => (
        <Link
          className={clsx(
            "transition-all duration-200 ease-out",
            "whitespace-nowrap text-base lg:hover:scale-[1.025] lg:hover:font-medium lg:hover:text-black",
            "uppercase",
            idx === selectedFilterIndex && "scale-[1.025] font-medium",
            idx === selectedFilterIndex ? "text-black" : "text-neutral-800",
          )}
          href={url}
          hrefLang={lang}
          key={url}
        >
          {shortDisplay ? (
            <>
              <span className='md:hidden'>{shortDisplay}</span>
              <span className='hidden md:inline'>{display}</span>
            </>
          ) : (
            display
          )}
        </Link>
      ))}
    </div>
  );
};
