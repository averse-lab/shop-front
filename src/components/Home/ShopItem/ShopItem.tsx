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
    <div className='flex w-full max-w-96 flex-col'>
      <Link href={linkPath}>
        <Image
          alt={title}
          className='mb-3 w-full'
          height={100}
          quality={100}
          sizes='(min-width: 1024px) 370px, (min-width: 768px) 300px, 200px'
          src={imagePath}
          width={100}
        />
        <h4
          className={clsx(
            "text-base font-bold uppercase text-white md:text-sm",
          )}
        >
          [ {title} ]
        </h4>
        <p
          className={clsx(
            "text-base font-light uppercase text-gray-400 md:text-sm lg:underline-offset-8",
          )}
        >
          {description}
        </p>
      </Link>
    </div>
  );
};
