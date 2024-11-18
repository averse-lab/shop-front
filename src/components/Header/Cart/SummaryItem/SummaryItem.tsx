import { FC } from "react";

import { clsx } from "clsx";

type IProps = {
  metric: string;
  value: string;
  variant?: "shipping" | "total";
};

export const SummaryItem: FC<IProps> = (props) => {
  const { metric, value, variant } = props;

  return (
    <div
      className={clsx(
        "pb-2",
        "flex items-center justify-between",
        "border-b border-white/35",
        "text-white",
        "font-abhaya",
      )}
    >
      <p>{metric}</p>
      <p className={clsx("transition-all", "text-base text-white")}>{value}</p>
    </div>
  );
};
