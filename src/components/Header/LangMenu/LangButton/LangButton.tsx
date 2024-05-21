"use client";

import { FC, MouseEventHandler, use } from "react";

import { RiEarthLine } from "@remixicon/react";
import clsx from "clsx";

import { Button } from "@components/ui/button";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

interface IProps {
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
}

export const LangButton: FC<IProps> = (props) => {
  const { className, ariaLabel, onClick } = props;

  const { langBtnColor, langBtnIcnColor } = use(HeaderContext);

  const contextInit = langBtnColor && langBtnIcnColor;

  return (
    // <div
    //   className={clsx(
    //     className,
    //     "relative",
    //     "transition-all delay-75",
    //     contextInit ? "scale-100 opacity-100" : "scale-50 opacity-0",
    //   )}
    // >
    <Button
      aria-label={ariaLabel}
      onClick={onClick}
      size='icon'
      variant={langBtnColor === "white" ? "secondary-icon" : "default-icon"}
    >
      <RiEarthLine
        className={clsx(
          "transition-all",
          langBtnIcnColor === "white"
            ? "text-primary-foreground/80"
            : "text-secondary-foreground/80",
        )}
        size={20}
      />
    </Button>
    // </div>
  );
};
