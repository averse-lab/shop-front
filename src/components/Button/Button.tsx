"use-client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";

import Link from "next/link";

type ICommonProps = {
  className?: string;
  disabled?: boolean;
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
  const { children, className: propsClassName, disabled } = props;

  const className = `${
    disabled ? "bg-neutral-500" : "bg-black"
  } text-white text-lg font-medium uppercase text-center py-3 px-6 rounded ${
    propsClassName || null
  }`;

  if (props.element === "button") {
    const { onClick } = props;

    return (
      <button disabled={disabled} className={className} onClick={onClick}>
        {children}
      </button>
    );
  } else {
    const { href } = props;

    return (
      <Link className={className} href={href || "#"}>
        {children}
      </Link>
    );
  }
};
