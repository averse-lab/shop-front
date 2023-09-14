import React, { Suspense } from "react";
import Link from "next/link";
import Cart from "@averse/components/cart/Cart";
import OpenCart from "@averse/components/cart/open-cart";
import { Logo } from "@averse/components/global/Logo";
import { MenuButton } from "@averse/components/global/MenuButton";

const Header = () => {
  return (
    <header
      className={`sticky w-full h-24 flex items-center justify-between px-6 bg-white shadow top-0 z-40`}
    >
      <MenuButton />
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className='w-6 h-6 cursor-pointer'>
        <Suspense fallback={<OpenCart />}>
          <Cart />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
