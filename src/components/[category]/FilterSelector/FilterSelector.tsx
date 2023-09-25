import { FC } from "react";

import Link from "next/link";

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
      className={`${
        className || null
      } p-4 flex  items-center justify-center gap-x-6`}
    >
      {filters.map(({ display, url }, idx) => (
        <Link
          className={`transition-all duration-200 hover:font-medium ${
            idx === selectedFilterIndex ? "font-medium" : ""
          }`}
          key={url}
          href={url}
        >
          {display}
        </Link>
      ))}
    </div>
  );
};
