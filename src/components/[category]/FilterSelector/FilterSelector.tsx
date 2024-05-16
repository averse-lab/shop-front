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
        "w-min",
        "px-6 py-4",
        "grid grid-cols-[1fr_min-content_1fr] gap-6",
        "rounded-lg border border-border/10 bg-primary/30 shadow-sm backdrop-blur",
      )}
    >
      {filters.map(({ display, url }, idx) => (
        <Link
          className={clsx(
            "transition-all duration-200 ease-out",
            "whitespace-nowrap first:justify-end last:justify-start lg:hover:scale-[1.025] lg:hover:font-medium lg:hover:text-primary-foreground/80 [&:nth-of-type(2)]:justify-center",
            idx === selectedFilterIndex && "scale-[1.025] font-medium",
            idx === selectedFilterIndex
              ? "text-primary-foreground/80"
              : "text-primary-foreground/60",
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
