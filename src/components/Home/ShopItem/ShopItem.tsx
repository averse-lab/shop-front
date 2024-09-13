import { FC } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type IProps = {
  title: string;
  description: string;
  imagePath: string;
  linkPath: string;
};

export const ShopItem: FC<IProps> = (props) => {
  const { linkPath, imagePath, title, description } = props;

  return (
    <div className='flex w-full flex-col'>
      <Image
        alt={"shop"}
        className='mb-3 w-full'
        height={100}
        src={imagePath}
        width={100}
      />
      <h4 className={clsx("font-bold uppercase text-white")}>[{title}]</h4>
      <Link
        className={clsx(
          "font-light uppercase text-gray-400 lg:underline-offset-8 lg:hover:scale-[1.025] lg:hover:font-medium",
        )}
        href={linkPath}
      >
        {description}
      </Link>
    </div>
  );
};
