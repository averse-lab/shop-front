import { useEffect, useReducer, useSyncExternalStore } from "react";

import Lenis from "lenis";

import { Consent, getConsent, subscribeToConsent } from "@lib/consent";

export const useBodyScrollLocker = (locked: boolean) => {
  useEffect(() => {
    // Panels are only full-screen below `md`, so only lock scrolling there.
    document.body.classList.toggle("max-md:overflow-hidden", locked);

    return () => document.body.classList.remove("max-md:overflow-hidden");
  }, [locked]);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    const raf: FrameRequestCallback = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);
};

export const useForceReRenderer = () => {
  const [_, forceReRender] = useReducer((x) => x + 1, 0);

  return forceReRender;
};

export const useClickOutsideDetector = (
  target: Element | null,
  onClickOutside: Function,
  isActive: boolean,
) => {
  useEffect(() => {
    if (!isActive || target === null) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.target === null) {
        return;
      }

      if (event.target instanceof Node && !target.contains(event.target)) {
        onClickOutside();
        document.removeEventListener("click", handleDocumentClick);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isActive, onClickOutside, target]);
};

const getServerConsent = () => undefined;

/** `undefined` while rendering on the server and hydrating, when the choice cannot be read. */
export const useConsent = (): Consent | null | undefined =>
  useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);
