"use client";

import { FC, useState } from "react";

// import { Button } from "@components/Button/Button";

import { Cart } from "@lib/shopify/types";

import { CartHint } from "../CartHint/CartHint";

interface IProps {
  cart: Cart | undefined;
}

export const CartWrapper: FC<IProps> = (props) => {
  const { cart } = props;

  console.log(cart);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false);

  return (
    <>
      <CartHint className='justify-self-end' quantity={cart?.totalQuantity} />
      {/* <div className='fixed flex flex-col justify-between z-20 bg-white h-full md:h-auto w-full md:w-auto top-0 md:top-2 right-0 md:right-2 md:rounded p-4'>
        <div className='flex flex-col flex-1 overflow-y-scroll'></div>
        <div className='flex flex-col'>
          <Button className='w-full' element='button' onClick={() => {}}>
            Checkout
          </Button>
        </div>
      </div> */}
    </>
  );
};
