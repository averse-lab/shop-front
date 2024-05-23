"use client";

import { FC, PropsWithChildren, RefObject, use, useEffect, useRef } from "react";

import { clsx } from "clsx";

import { StateSetter } from "@lib/types";
import { throttle } from "@lib/utils";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

const getHeaderIconsColorUpdater = (
  logoMiddleX: number | undefined,
  moreDetailsBtnX: number | undefined,
  setCartBtnIcnColor: StateSetter<"black" | "white" | undefined>,
  setLogoVisible: StateSetter<boolean | undefined>,
  setMoreDetailsBtnVisible: StateSetter<boolean | undefined>,
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

    if (!moreDetailsBtnX) {
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

    if (additionalInformationsBoundingRect.top < moreDetailsBtnX) {
      setMoreDetailsBtnVisible(false);
    } else {
      setMoreDetailsBtnVisible(true);
    }
  }, 200);

type IProps = {
  className?: string;
} & PropsWithChildren;

export const AdditionalVideosObserver: FC<IProps> = (props) => {
  const { children, className } = props;

  const {
    logoRef,
    moreDetailsBtnRef,
    setLogoVisible,
    setMoreDetailsBtnVisible,
    setCartBtnIcnColor,
  } = use(HeaderContext);

  const additionalInformationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !logoRef ||
      !logoRef.current ||
      !moreDetailsBtnRef ||
      !moreDetailsBtnRef.current ||
      !setCartBtnIcnColor ||
      !setLogoVisible ||
      !setMoreDetailsBtnVisible
    ) {
      return;
    }

    const logoBoundingRect = logoRef.current.getBoundingClientRect();
    const logoMiddleX = logoBoundingRect.top + logoBoundingRect.height / 2;

    const moreDetailsBtnBoundingRect = moreDetailsBtnRef.current.getBoundingClientRect();
    const moreDetailsBtnX = moreDetailsBtnBoundingRect.top + moreDetailsBtnBoundingRect.height / 2;

    const headerIconsColorUpdater = getHeaderIconsColorUpdater(
      logoMiddleX,
      moreDetailsBtnX,
      setCartBtnIcnColor,
      setLogoVisible,
      setMoreDetailsBtnVisible,
      additionalInformationsRef,
    );

    document.addEventListener("scroll", headerIconsColorUpdater);

    return () => {
      document.removeEventListener("scroll", headerIconsColorUpdater);
    };
  }, [logoRef, moreDetailsBtnRef, setCartBtnIcnColor, setLogoVisible, setMoreDetailsBtnVisible]);

  return (
    <div className={clsx(className)} ref={additionalInformationsRef}>
      {children}
    </div>
  );
};
