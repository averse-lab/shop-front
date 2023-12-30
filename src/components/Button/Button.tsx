"use-client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { Spinner } from "@components/icons/Spinner/Spinner";

import { Locale } from "@lib/i18n/types";

import s from "./_internal/Button.module.scss";
import { ButtonColor } from "./_internal/Button.types";

type ICommonProps = {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  transparent?: boolean;
  ariaLabel?: string;
  color: ButtonColor;
  mini?: boolean;
};

type IButtonProps = {
  element: "button";
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type ILinkProps = {
  element: "link";
  href: string;
  hrefLang: Locale;
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
    color,
    mini,
  } = props;

  const commonClassName = clsx(
    className,
    s["button"],
    transparent && s["button--transparent"],
    mini && s["button--mini"],
    mini ? "p-1" : "px-6 py-3",
    "flex items-center justify-center gap-4",
    mini ? "rounded" : "rounded-sm",
    color === "black" ? s["button--black"] : s["button--white"],
    disabled && "disabled cursor-not-allowed",
    transparent && mini ? "shadow" : "shadow-md",
    color === "black" ? "text-white" : "text-black",
    "text-center font-medium uppercase",
  );

  if (element === "button") {
    const { onClick } = props;

    return (
      <button
        aria-label={ariaLabel}
        className={clsx(commonClassName)}
        disabled={disabled}
        onClick={onClick}
      >
        {loading ? (
          <Spinner className={clsx("h-6 w-6")} />
        ) : typeof children === "string" ? (
          <span>{children}</span>
        ) : (
          children
        )}
      </button>
    );
  } else {
    const { href, hrefLang } = props;

    return (
      <Link
        aria-label={ariaLabel}
        className={clsx(commonClassName)}
        href={href || "#"}
        hrefLang={hrefLang}
      >
        {loading ? <Spinner className={clsx("h-6 w-6")} /> : children}
      </Link>
    );
  }
};
