import { FC, MouseEventHandler, useContext } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { HeaderContext } from "@averse/contexts/HeaderContext/HeaderContext";

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
      onClick={onClick}
      className={clsx(className, "relative")}
      aria-label={ariaLabel}
    >
      <ShoppingBagIcon
        className={clsx(
          "h-6 w-6",
          "cursor-pointer transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-[1.75]",
          whiteIcons && "text-white",
        )}
      />
      {quantity !== undefined && quantity > 0 ? (
        <div
          className={clsx(
            s["cart-hint__hint"],
            whiteIcons ? "bg-white text-black" : "bg-black text-white",
          )}
        >
          <p style={{ fontSize: "8px" }} className={clsx("text-semibold")}>
            {quantity}
          </p>
        </div>
      ) : null}
    </button>
  );
};
