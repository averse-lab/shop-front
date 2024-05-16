import { FC } from "react";

import { clsx } from "clsx";

import s from "./_internal/SummaryItem.module.scss";

type IProps = {
  metric: string;
  value: string;
  shipping?: boolean;
};

export const SummaryItem: FC<IProps> = (props) => {
  const { metric, value, shipping } = props;

  return (
    <div
      className={clsx(
        "pb-2",
        "flex items-center justify-between",
        shipping && "text-sm ",
        "border-b border-border/50",
      )}
    >
      <p>{metric}</p>
      <p className={clsx(shipping && "text-neutral-600")}>{value}</p>
    </div>
  );
};
