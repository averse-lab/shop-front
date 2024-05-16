import { FC, MouseEventHandler, use } from "react";

import { RiShoppingBag3Line } from "@remixicon/react";
import { clsx } from "clsx";

import { Button } from "@components/ui/button";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";
interface IProps {
  className?: string;
  quantity?: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
}

export const CartButton: FC<IProps> = (props) => {
  const { className, quantity, onClick, ariaLabel } = props;

  const { cartBtnColor, cartBtnIcnColor } = use(HeaderContext);

  return cartBtnColor && cartBtnIcnColor ? (
    <div className={clsx(className, "relative", "animate-appear")}>
      <Button
        aria-label={ariaLabel}
        iconColor={cartBtnIcnColor}
        onClick={onClick}
        size='icon'
        variant={cartBtnColor === "white" ? "secondary-icon" : "default-icon"}
      >
        <RiShoppingBag3Line className={clsx("transition-all")} size={20} />
      </Button>
      {/* <div
        className={clsx(
          "absolute bottom-[calc(100%-9px)] left-[calc(100%-9px)]",
          "h-5 w-5",
          "rounded-full",
          "flex items-center justify-center",
          "overflow-hidden border border-border/20  transition-all duration-200 ease-out",
          "bg-white text-secondary-foreground/60",
          // : "bg-primary/20 text-primary-foreground/60",
          quantity !== undefined && quantity > 0 ? "scale-100" : "scale-0",
        )}
      >
        <p className={clsx("font-semibold")} style={{ fontSize: "8px" }}>
          {quantity}
        </p>
      </div> */}
    </div>
  ) : null;
};
