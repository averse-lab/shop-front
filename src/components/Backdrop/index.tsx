import { FC } from "react";

import { cn } from "@lib/shadcn-ui/utils";

type Props = {
  className?: string;
  activate: boolean;
};

export const Backdrop: FC<Props> = ({ className, activate }) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-10",
        "h-dvh w-screen",
        "transition-all ease-in-out",
        activate ? "bg-primary/30" : "pointer-events-none bg-primary/0",
        className,
      )}
      style={{ transitionDuration: "350ms" }}
    />
  );
};
