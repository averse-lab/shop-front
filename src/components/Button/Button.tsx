"use-client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { Spinner } from "@components/icons/Spinner/Spinner";

import s from "./_internal/Button.module.scss";

type ICommonProps = {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  transparent?: boolean;
  ariaLabel?: string;
};

type IButtonProps = {
  element: "button";
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type ILinkProps = {
  element: "link";
  href: string;
};

type IProps = (IButtonProps | ILinkProps) & PropsWithChildren & ICommonProps;

export const Button: FC<IProps> = (props) => {
  const {
    children,
    className,
    disabled,
    loading,
    transparent,
    element,
    ariaLabel,
  } = props;

  const commonClassName = clsx(
    className,
    s["button"],
    transparent && s["button--transparent"],
    "py-3 px-6 ",
    "flex items-center justify-center gap-4",
    "rounded-sm",
    disabled && "disabled cursor-not-allowed",
    "text-white font-medium uppercase text-center",
  );

  if (element === "button") {
    const { onClick } = props;

    return (
      <button
        aria-label={ariaLabel}
        disabled={disabled}
        className={clsx(commonClassName)}
        onClick={onClick}
      >
        {loading ? <Spinner className={clsx("h-6 w-6")} /> : children}
      </button>
    );
  } else {
    const { href } = props;

    return (
      <Link
        aria-label={ariaLabel}
        className={clsx(commonClassName)}
        href={href || "#"}
      >
        {loading ? <Spinner className={clsx("h-6 w-6")} /> : children}
      </Link>
    );
  }
};
