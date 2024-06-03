"use client";

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

  const contextInit = cartBtnColor && cartBtnIcnColor;

  return (
    <div
      className={clsx(
        className,
        "relative",
        "transition-all delay-75",
        contextInit ? "scale-100 opacity-100" : "scale-50 opacity-0",
      )}
    >
      <Button
        aria-label={ariaLabel}
        onClick={onClick}
        size='icon'
        variant={cartBtnColor === "white" ? "secondary-icon" : "default-icon"}
      >
        <RiShoppingBag3Line
          className={clsx(
            "transition-all",
            cartBtnIcnColor === "white"
              ? "text-primary-foreground/80"
              : "text-secondary-foreground/80",
          )}
          size={20}
        />
      </Button>
      <div
        className={clsx(
          "absolute -right-[10px] -top-[10px]",
          "h-5 w-5",
          "rounded-full",
          "flex items-center justify-center",
          "overflow-hidden border backdrop-blur-sm transition-all",
          cartBtnColor === "white"
            ? "border-border/20 bg-secondary/20 "
            : "border-border/10 bg-primary/75",
          cartBtnIcnColor === "white" ? "text-primary-foreground" : "text-secondary-foreground",
          quantity !== undefined && quantity > 0 ? "scale-100" : "scale-0",
        )}
      >
        <p className={clsx("transition-all", "font-bold")} style={{ fontSize: "8px" }}>
          {quantity}
        </p>
      </div>
    </div>
  );
};
