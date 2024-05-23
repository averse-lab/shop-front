"use client";

import { FC, use, useEffect, useRef } from "react";

import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import clsx from "clsx";

import { Locale } from "@lib/i18n/types";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

interface IProps {
  className?: string;
  lang: Locale;
}

export const MoreDetails: FC<IProps> = (props) => {
  const { className, lang } = props;

  const moreDetailsBtnRef = useRef<HTMLDivElement>(null);
  const { setMoreDetailsBtnRef, moreDetailsBtnVisible } = use(HeaderContext);

  useEffect(() => {
    if (!setMoreDetailsBtnRef) {
      return;
    }

    setMoreDetailsBtnRef(moreDetailsBtnRef);
  }, [setMoreDetailsBtnRef]);

  const contextInit = moreDetailsBtnVisible !== undefined;

  return (
    <div
      className={clsx(
        className,
        "hidden lg:grid",
        "max-w-44",
        "px-6 py-4",
        "text-primary-foreground/80",

        "rounded-lg border border-border/10 bg-primary/30 shadow-sm backdrop-blur",
        "transition-opacity duration-500",
      )}
      ref={moreDetailsBtnRef}
      style={{ transition: "opacity 0.5s ease" }}
    >
      {moreDetailsBtnVisible ? (
        <div
          className={clsx(
            "grid-cols-[1fr_1fr] gap-2 lg:grid",
            contextInit && moreDetailsBtnVisible ? "opacity-100" : "opacity-0",
          )}
          style={{ transition: "opacity 0.5s ease" }}
        >
          <RiArrowDownLine className={clsx("")} />
          <div className={clsx("whitespace-nowrap font-medium")}>More details</div>
        </div>
      ) : (
        <div
          className={clsx(
            "grid-cols-[1fr_1fr] gap-2 lg:grid",
            contextInit && !moreDetailsBtnVisible ? "opacity-100" : "opacity-0",
          )}
          style={{ transition: "opacity 0.5s ease" }}
        >
          <RiArrowUpLine className={clsx("")} />
          <div className={clsx("whitespace-nowrap font-medium")}>Shop now</div>
        </div>
      )}
    </div>
  );
};
