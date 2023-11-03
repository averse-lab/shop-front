"use client";

import { FC } from "react";

import { clsx } from "clsx";
import { useInView } from "react-intersection-observer";

import { RichTextRenderer } from "@components/RichTextRenderer/RichTextRenderer";

type IProps = {
  description: string;
  className?: string;
};

export const AdditionalVideoDescription: FC<IProps> = (props) => {
  const { description, className } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-25% 0%",
  });

  return (
    <RichTextRenderer
      className={clsx(
        className,
        "transition-all duration-200 ease-out",
        inView
          ? "opacity-1 translate-y-0 lg:translate-x-0"
          : "-translate-y-2 opacity-0 lg:-translate-x-2",
      )}
      reference={ref}
      richText={description}
    />
  );
};
