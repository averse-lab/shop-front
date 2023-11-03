"use client";

import { FC, PropsWithChildren } from "react";

import clsx from "clsx";
import { IntersectionOptions, useInView } from "react-intersection-observer";

type IProps = {
  options?: IntersectionOptions;
  className?: string;
  inViewClassName?: string;
  outOfViewClassName?: string;
} & PropsWithChildren;

export const Observer: FC<IProps> = (props) => {
  const { options, children, className, inViewClassName, outOfViewClassName } =
    props;

  const { ref, inView } = useInView(options);

  return (
    <div
      className={clsx(className, inView ? inViewClassName : outOfViewClassName)}
      ref={ref}
    >
      {children}
    </div>
  );
};
