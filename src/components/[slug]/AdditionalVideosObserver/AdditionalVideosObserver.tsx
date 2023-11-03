"use client";

import { FC, PropsWithChildren, useContext } from "react";

import { clsx } from "clsx";
import { useInView } from "react-intersection-observer";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import { OBSERVER_THRESHOLDS } from "./_internal/AdditionalVideosObserver.constants";

type IProps = {
  className?: string;
} & PropsWithChildren;

export const AdditionalVideosObserver: FC<IProps> = (props) => {
  const { children, className } = props;

  const { logoRef, setWhiteIcons, setHideLogo } =
    useContext(HeaderContext) || {};

  // TO IMPROVE
  const { ref } = useInView({
    threshold: OBSERVER_THRESHOLDS,
    onChange: (inView, entry) => {
      if (
        !inView ||
        setWhiteIcons === undefined ||
        setHideLogo === undefined ||
        logoRef === undefined ||
        logoRef.current === null
      ) {
        return;
      }

      const logoBoundingClientRect = logoRef.current.getBoundingClientRect();
      const logoTop = logoBoundingClientRect.top;
      const logoHeight = logoBoundingClientRect.height;

      if (entry.intersectionRect.top < logoTop + logoHeight / 2) {
        setWhiteIcons(true);
        setHideLogo(true);
      } else {
        setWhiteIcons(false);
        setHideLogo(false);
      }
    },
  });

  return (
    <div className={clsx(className)} ref={ref}>
      {children}
    </div>
  );
};
