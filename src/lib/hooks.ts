import { useEffect, useReducer } from "react";

export const useBodyScrollLocker = (locked: boolean) => {
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
