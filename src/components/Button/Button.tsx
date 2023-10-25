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
  const { children, className, disabled, loading, transparent, element } =
    props;

  const commonClassName = clsx(
    className,
    s["button"],
    transparent && s["button--transparent"],
    "flex items-center justify-center gap-4",
    "text-white font-medium uppercase text-center",
    "py-3 px-6 rounded-sm",
    disabled && "disabled cursor-not-allowed",
  );

  if (element === "button") {
    const { onClick } = props;

    return (
      <button disabled={disabled} className={commonClassName} onClick={onClick}>
        {loading ? <Spinner className='h-6 w-6' /> : children}
      </button>
    );
  } else {
    const { href } = props;

    return (
      <Link className={commonClassName} href={href || "#"}>
        {loading ? <Spinner className='h-6 w-6' /> : children}
      </Link>
    );
  }
};
