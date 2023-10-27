"use client";

import {
  Children,
  FC,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";

import { clsx } from "clsx";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";

import s from "./_internal/Slider.module.scss";

type IProps = {
  className?: string;
  options?: EmblaOptionsType;
} & PropsWithChildren;

export const Slider: FC<IProps> = (props) => {
  const { children, className, options } = props;

  const [ref, emblaApi] = useEmblaCarousel(options);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setActiveSlideIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (emblaApi) emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const slidesCount = Children.count(children);

  return (
    <div className='flex flex-col overflow-hidden'>
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
      <div
        className={clsx(
          "lg:hidden",
          "h-[2px]",
          "-translate-x-full",
          "bg-black transition-all duration-200 ease-out",
        )}
        style={{
          width: `${(1 / slidesCount) * 100}%`,
          transform: `translateX(${(activeSlideIndex / slidesCount) * 100}vw)`,
        }}
      ></div>
    </div>
  );
};
