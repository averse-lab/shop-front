import { FC } from "react";

import { RiArrowDownLine } from "@remixicon/react";
import clsx from "clsx";

import { Locale } from "@lib/i18n/types";

interface IProps {
  className?: string;
  lang: Locale;
}

export const MoreDetails: FC<IProps> = (props) => {
  const { className, lang } = props;

  return (
    <div
      className={clsx(
        className,
        "hidden lg:grid",
        "w-min",
        "px-6 py-4",
        "text-primary-foreground/80",
        "grid-cols-[1fr_1fr] gap-2",
        "rounded-lg border border-border/10 bg-primary/30 shadow-sm backdrop-blur",
      )}
    >
      <RiArrowDownLine className={clsx("")} />
      <div className={clsx("whitespace-nowrap font-medium")}>More details</div>
    </div>
  );
};
