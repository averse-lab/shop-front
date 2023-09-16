import Link from "next/link";
import { FC } from "react";
import { Filter } from "./_internal/types";

interface IProps {
  filters: Filter[];
  selectedFilterIndex: number;
}

export const FilterSelector: FC<IProps> = (props) => {
  const { filters, selectedFilterIndex } = props;

  return (
    <div className={`p-4 flex  items-center justify-center gap-x-3`}>
      {filters.map(({ display, url }, idx) => (
        <Link
          className={`${idx === selectedFilterIndex ? "font-bold" : ""}`}
          key={url}
          href={url}
        >
          {display}
        </Link>
      ))}
    </div>
  );
};
