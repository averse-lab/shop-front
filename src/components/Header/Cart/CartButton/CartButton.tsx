import { FC, MouseEventHandler, useContext } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import s from "./_internal/CartButton.module.scss";

interface IProps {
  className?: string;
  quantity?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
}

export const CartButton: FC<IProps> = (props) => {
  const { className, quantity, onClick, ariaLabel } = props;

  const { whiteIcons } = useContext(HeaderContext) || {};

  return (
    <button
      aria-label={ariaLabel}
      className={clsx(className, "relative")}
      onClick={onClick}
    >
      <ShoppingBagIcon
        className={clsx(
          "h-6 w-6",
          "cursor-pointer transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-[1.75]",
          whiteIcons && "text-white",
        )}
      />

      <div
        className={clsx(
          s["cart-hint__hint"],
          "scale-0 transition-all duration-200 ease-out",
          whiteIcons ? "bg-white text-black" : "bg-black text-white",
          quantity !== undefined && quantity > 0 && "scale-100",
        )}
      >
        <p className={clsx("text-semibold")} style={{ fontSize: "8px" }}>
          {quantity}
        </p>
      </div>
    </button>
  );
};
