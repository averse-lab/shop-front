import { useEffect, useReducer } from "react";

export const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (locked) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
  }, [locked]);
};

export const useForceReRenderer = () => {
  const [_, forceReRender] = useReducer((x) => x + 1, 0);

  return forceReRender;
};
