"use client";

import { Cart } from "@averse/lib/shopify/types";
import { FC, useState } from "react";
import { CartHint } from "../CartHint";
import { Button } from "@averse/components";

interface IProps {
  cart: Cart | undefined;
}

export const CartWrapper: FC<IProps> = (props) => {
  const { cart } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <CartHint className='justify-self-end' quantity={cart?.totalQuantity} />
      <div className='fixed flex flex-col items-center z-20 bg-white md:top-2 md:left-2 md:rounded'>
        <Button element='button' onClick={() => {}}></Button>
      </div>
    </>
  );
};
