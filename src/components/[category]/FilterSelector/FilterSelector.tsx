import { FC } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import s from "./_internal/FilterSelector.module.scss";
import { Filter } from "./_internal/FilterSelector.types";

interface IProps {
  filters: Filter[];
  selectedFilterIndex: number;
  className?: string;
}

export const FilterSelector: FC<IProps> = (props) => {
  const { filters, selectedFilterIndex, className } = props;

  return (
    <div
      className={clsx(
        className,
        s["filters-selector"],
        "bg-white border-b border-neutral-200",
        "gap-6",
        "p-4",
        "shadow",
      )}
    >
      {filters.map(({ display, url }, idx) => (
        <Link
          className={clsx(
            s["filters-selector__link"],
            "whitespace-nowrap",
            idx === selectedFilterIndex && "font-medium scale-[1.025]",
            idx === selectedFilterIndex ? "text-black" : "text-neutral-600",
            "lg:hover:font-medium lg:hover:scale-[1.025] lg:hover:text-black",
            "transition-all duration-200",
          )}
          key={url}
          href={url}
        >
          {display}
        </Link>
      ))}
    </div>
  );
};
