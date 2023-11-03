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
        "p-4",
        "gap-6",
        "border-b border-neutral-200 bg-white shadow",
      )}
    >
      {filters.map(({ display, url }, idx) => (
        <Link
          className={clsx(
            s["filters-selector__link"],
            "transition-all duration-200 ease-out",
            "whitespace-nowrap lg:hover:scale-[1.025] lg:hover:font-medium lg:hover:text-black",
            idx === selectedFilterIndex && "scale-[1.025] font-medium",
            idx === selectedFilterIndex ? "text-black" : "text-neutral-600",
          )}
          href={url}
          key={url}
        >
          {display}
        </Link>
      ))}
    </div>
  );
};
