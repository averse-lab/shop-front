"use client";

import { FC, PropsWithChildren, use } from "react";

import { clsx } from "clsx";
import { useInView } from "react-intersection-observer";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import { OBSERVER_THRESHOLDS } from "./_internal/AdditionalVideosObserver.constants";

type IProps = {
  className?: string;
} & PropsWithChildren;

export const AdditionalVideosObserver: FC<IProps> = (props) => {
  const { children, className } = props;

  const {
    logoRef,
    // setUIColor,
    setLogoVisible,
  } = use(HeaderContext);

  // TO IMPROVE
  const { ref } = useInView({
    threshold: OBSERVER_THRESHOLDS,
    onChange: (inView, entry) => {
      if (
        !inView ||
        // !setUIColor ||
        !setLogoVisible ||
        !logoRef ||
        logoRef.current === null
      ) {
        return;
      }

      const logoBoundingClientRect = logoRef.current.getBoundingClientRect();
      const logoTop = logoBoundingClientRect.top;
      const logoHeight = logoBoundingClientRect.height;

      if (entry.intersectionRect.top < logoTop + logoHeight / 2) {
        // setUIColor("white");
        setLogoVisible(false);
      } else {
        // setUIColor("black");
        setLogoVisible(true);
      }
    },
  });

  return (
    <div className={clsx(className)} ref={ref}>
      {children}
    </div>
  );
};
