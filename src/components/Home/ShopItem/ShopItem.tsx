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
      <Link href={linkPath}>
        <Image
          alt={title}
          className='mb-3 w-full'
          height={100}
          quality={100}
          sizes='(min-width: 1024px) 100px, 50px'
          src={imagePath}
          width={100}
        />
        <h4
          className={clsx(
            "text-base font-bold uppercase text-white md:text-lg",
          )}
        >
          [{title}]
        </h4>
        <p
          className={clsx(
            "text-sm font-light uppercase text-gray-400 lg:underline-offset-8",
          )}
        >
          {description}
        </p>
      </Link>
    </div>
  );
};
