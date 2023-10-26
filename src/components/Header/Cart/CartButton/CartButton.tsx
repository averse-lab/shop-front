import { FC, MouseEventHandler } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

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
          "w-6 h-6",
          "cursor-pointer lg:hover:stroke-[1.75] lg:hover:scale-105 transition-all",
        )}
      />
      {quantity !== undefined && quantity > 0 ? (
        <div className={clsx(s["cart-hint__hint"], "bg-black")}>
          <p
            style={{ fontSize: "8px" }}
            className={clsx("text-white text-semibold")}
          >
            {quantity}
          </p>
        </div>
      ) : null}
    </button>
  );
};
