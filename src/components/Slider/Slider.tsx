"use client";

import {
  Children,
  FC,
  PropsWithChildren,
  cloneElement,
  isValidElement,
} from "react";

import { clsx } from "clsx";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";

import s from "./_internal/Slider.module.scss";

type IProps = {
  className?: string;
  options?: EmblaOptionsType;
} & PropsWithChildren;

export const Slider: FC<IProps> = (props) => {
  const { children, className, options } = props;

  const [ref] = useEmblaCarousel(options);

  return (
    <div className={clsx(className, s["slider"], "embla")} ref={ref}>
      <div className={`${s["slider__container"]} embla__container`}>
        {Children.map(children, (child, idx) => {
          if (isValidElement(child)) {
            const props = {
              className: clsx(
                child.props.className,
                s["slider__slide"],
                "embla__slide",
              ),
              key: idx,
            };
            return cloneElement(child, props);
          }

          return child;
        })}
      </div>
    </div>
  );
};
