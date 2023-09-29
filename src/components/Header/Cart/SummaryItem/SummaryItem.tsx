import { FC } from "react";

import { clsx } from "clsx";

import s from "./_internal/SummaryItem.module.scss";

type IProps = {
  className?: string;
  metric: string;
  value: string;
};

export const SummaryItem: FC<IProps> = (props) => {
  const { metric, value, className } = props;

  return (
    <div
      className={clsx(
        className,
        s["amount-summary"],
        "flex justify-between items-center",
      )}
    >
      <p>{metric}</p>
      <p>{value}</p>
    </div>
  );
};
