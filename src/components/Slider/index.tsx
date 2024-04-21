"use client";

import {
  Children,
  FC,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";

import { clsx } from "clsx";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type IProps = {
  className?: string;
  options?: EmblaOptionsType;
} & PropsWithChildren;

export const Slider: FC<IProps> = (props) => {
  const { children, className, options } = props;

  const [ref, emblaApi] = useEmblaCarousel(options);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setActiveSlideIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const slidesCount = Children.count(children);

  return (
    <div className={clsx(className, "flex flex-col")}>
      <div className={clsx("embla", "overflow-hidden")} ref={ref}>
        <div className={clsx("embla__container", "flex")}>
          {Children.map(children, (child, idx) => {
            if (isValidElement(child)) {
              const props = {
                className: clsx(
                  child.props.className,
                  "embla__slide",
                  "flex-[0_0_100%]",
                  "min-w-0",
                ),
                key: idx,
              };

              return cloneElement(child, props);
            }

            return child;
          })}
        </div>
      </div>
      <div
        className={clsx(
          "lg:hidden",
          "h-[2px]",
          "-translate-x-full bg-black transition-all duration-200 ease-out",
        )}
        style={{
          width: `${(1 / slidesCount) * 100}%`,
          transform: `translateX(${(activeSlideIndex / slidesCount) * 100}vw)`,
        }}
      ></div>
    </div>
  );
};
