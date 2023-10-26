import { FC } from "react";

import Link from "next/link";

export const Footer: FC = () => {
  return (
    <footer className={"bg-black px-7 pb-10 pt-10 text-white"}>
      {/*   2 colums with 3 rows */}
      <h1 className={"text-xl"}>Averse</h1>
      <div className='grid grid-cols-1 gap-4'>
        <ul
          className={"flex flex-col gap-2 text-sm underline underline-offset-2"}
        >
          <li>
            <Link href='#'>Home</Link>
          </li>
          <li>
            <Link href='about'>About</Link>
          </li>
        </ul>
      </div>
      {/*    Full width div with a text on right side */}
      <div className={"mt-5 flex flex-row justify-between"}>
        <p className={"text-sm"}>© 2021 Averse</p>
        <p className={"text-sm"}>
          Website by{" "}
          <a
            href='
        https://www.linkedin.com/in/alexandru-georgescu-1b0b0b1a4/'
          >
            T.Walterspieler
          </a>
        </p>
      </div>
    </footer>
  );
};
