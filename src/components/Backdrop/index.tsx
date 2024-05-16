import { FC } from "react";

import clsx from "clsx";

type Props = {
  activate: boolean;
};

export const Backdrop: FC<Props> = (props) => {
  const { activate } = props;

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-10",
        "h-dvh w-screen",
        "transition-all delay-150 duration-300",
        activate ? "bg-primary/75 md:bg-primary/20" : "pointer-events-none bg-primary/0",
      )}
    ></div>
  );
};
