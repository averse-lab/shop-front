"use client";

import { FC, PropsWithChildren, RefObject, use, useEffect, useRef } from "react";

import { clsx } from "clsx";

import { StateSetter } from "@lib/types";
import { throttle } from "@lib/utils";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

const getHeaderIconsColorUpdater = (
  logoMiddleX: number | undefined,
  setCartBtnIcnColor: StateSetter<"black" | "white" | undefined>,
  setLogoVisible: StateSetter<boolean | undefined>,
  additionalInformationsRef: RefObject<HTMLDivElement>,
) =>
  throttle(() => {
    if (
      logoMiddleX === undefined ||
      !additionalInformationsRef.current ||
      !window.matchMedia("(min-width: 1024px)").matches
    ) {
      return;
    }

    const additionalInformationsBoundingRect =
      additionalInformationsRef.current.getBoundingClientRect();

    if (additionalInformationsBoundingRect.top < logoMiddleX) {
      setCartBtnIcnColor("white");
      setLogoVisible(false);
    } else {
      setCartBtnIcnColor("black");
      setLogoVisible(true);
    }
  }, 200);

type IProps = {
  className?: string;
  id?: string;
} & PropsWithChildren;

export const AdditionalVideosObserver: FC<IProps> = (props) => {
  const { children, className, id } = props;

  const { logoRef, setLogoVisible, setCartBtnIcnColor } = use(HeaderContext);

  const additionalInformationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef || !logoRef.current || !setCartBtnIcnColor || !setLogoVisible) {
      return;
    }
    const logoBoundingRect = logoRef.current.getBoundingClientRect();
    const logoMiddleX = logoBoundingRect.top + logoBoundingRect.height / 2;

    const headerIconsColorUpdater = getHeaderIconsColorUpdater(
      logoMiddleX,
      setCartBtnIcnColor,
      setLogoVisible,
      additionalInformationsRef,
    );

    document.addEventListener("scroll", headerIconsColorUpdater);

    return () => {
      document.removeEventListener("scroll", headerIconsColorUpdater);
    };
  }, [logoRef, setCartBtnIcnColor, setLogoVisible]);

  return (
    <div className={clsx(className)} id={id} ref={additionalInformationsRef}>
      {children}
    </div>
  );
};
