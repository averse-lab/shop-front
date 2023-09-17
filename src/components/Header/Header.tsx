import { FC, Suspense } from "react";
import { BurgerMenu } from "./_internal/components";
import Link from "next/link";
import { Logo } from "@averse/components/icons";
import { Cart } from "../cart/Cart";
import OpenCart from "../cart/open-cart";

interface IProps {
  transparent?: boolean;
}

export const Header: FC<IProps> = () => {
  return (
    <header className='grid grid-cols-3 items-center px-6 py-4'>
      <BurgerMenu />
      <Link className='justify-self-center' href='/'>
        <Logo className='h-10 w-10 md:w-16 md:h-16' />
      </Link>
      {/* To refacto / improve component structure  */}
      <Suspense fallback={<OpenCart />}>
        <Cart />
      </Suspense>
    </header>
  );
};
