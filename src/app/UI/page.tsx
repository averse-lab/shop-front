import { FC } from "react";

import { RiMenuFill } from "@remixicon/react";
import clsx from "clsx";

import { Button } from "@components/ui/button";

const UIPage: FC = () => {
  return (
    <main className={clsx("min-w-screen h-screen", "flex items-center")}>
      <div
        className={clsx(
          "h- h-full basis-1/2 p-8",
          "flex flex-col items-start gap-4",
          "bg-white",
        )}
      >
        <Button variant='default'>BUTTON_PRIMARY</Button>
        <Button variant='secondary'>BUTTON_SECONDARY</Button>
        <Button size='icon' variant='default'>
          <RiMenuFill size={20} />
        </Button>
        <Button size='icon' variant='secondary'>
          <RiMenuFill size={20} />
        </Button>
      </div>
      <div
        className={clsx(
          "h-full basis-1/2 p-8",
          "flex flex-col items-start gap-4",
          "bg-black",
        )}
      >
        <Button variant='default'>BUTTON_PRIMARY</Button>
        <Button variant='secondary'>BUTTON_SECONDARRY</Button>
        <Button size='icon' variant='default'>
          <RiMenuFill size={20} />
        </Button>
        <Button size='icon' variant='secondary'>
          <RiMenuFill size={20} />
        </Button>
      </div>
    </main>
  );
};

export default UIPage;
