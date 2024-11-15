import { FC, MouseEventHandler, useContext } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { Button } from "@components/Button/Button";

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
    <div className={clsx(className, "relative")}>
      <Button
        aria-label={ariaLabel}
        className={clsx(s["cart-btn__btn"], "p-[6px]")}
        color='white'
        element='button'
        mini
        noBackground
        onClick={onClick || (() => {})}
      >
        <ShoppingBagIcon
          className={clsx(
            s["cart-btn__icon"],
            "h-5 w-5",
            "!transition-all !duration-200 !ease-out",
            whiteIcons && "text-white",
          )}
        />
      </Button>
      <div
        className={clsx(
          s["cart-btn__hint"],
          "scale-0 transition-all duration-200 ease-out",
          whiteIcons ? "bg-white text-black" : "bg-black text-white",
          quantity !== undefined && quantity > 0 && "scale-100",
        )}
      >
        <p className={clsx("font-semibold")} style={{ fontSize: "8px" }}>
          {quantity}
        </p>
      </div>
    </div>
  );
};
