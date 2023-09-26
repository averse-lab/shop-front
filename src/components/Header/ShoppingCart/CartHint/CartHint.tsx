import { FC, MouseEventHandler } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import s from "./_internal/CartHint.module.scss";

interface IProps {
  className?: string;
  quantity?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const CartHint: FC<IProps> = (props) => {
  const { className, quantity, onClick } = props;

  return (
    <button onClick={onClick} className={`${className || ""} relative`}>
      <ShoppingBagIcon className='w-6 h-6 cursor-pointer' />
      {quantity !== undefined && quantity > 0 ? (
        <div className={`${s["cart-hint__hint"]} bg-black`}>
          <p style={{ fontSize: "8px" }} className='text-white text-semibold'>
            {quantity}
          </p>
        </div>
      ) : null}
    </button>
  );
};
