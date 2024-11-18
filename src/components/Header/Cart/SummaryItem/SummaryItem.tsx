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
        "border-b border-primary/35",
        "text-secondary-foreground",
        "font-abhaya",
      )}
    >
      <p>{metric}</p>
      <p
        className={clsx(
          "transition-all",
          variant === "shipping"
            ? "text-base text-secondary-foreground/55"
            : variant === "total"
              ? "text-secondary-foreground"
              : "text-secondary-foreground/55",
        )}
      >
        {value}
      </p>
    </div>
  );
};
