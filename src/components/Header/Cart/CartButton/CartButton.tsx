import { FC, MouseEventHandler } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import s from "./_internal/CartButton.module.scss";

interface IProps {
  className?: string;
  quantity?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const CartButton: FC<IProps> = (props) => {
  const { className, quantity, onClick } = props;

  return (
    <button onClick={onClick} className={clsx(className, "relative")}>
      <ShoppingBagIcon
        className={clsx(
          "h-6 w-6",
          "cursor-pointer transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-[1.75]",
        )}
      />
      {quantity !== undefined && quantity > 0 ? (
        <div className={clsx(s["cart-hint__hint"], "bg-black")}>
          <p
            style={{ fontSize: "8px" }}
            className={clsx("text-semibold text-white")}
          >
            {quantity}
          </p>
        </div>
      ) : null}
    </button>
  );
};
