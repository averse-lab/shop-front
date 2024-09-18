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
    <Link className={clsx("flex flex-col")} href={linkPath}>
      <div className={clsx("relative aspect-square overflow-hidden")}>
        <Image
          alt={title}
          className={clsx("object-cover object-center")}
          fill
          quality={100}
          sizes='(min-width: 1024px) 370px, (min-width: 768px) 300px, 200px'
          src={imagePath}
        />
      </div>
      <h4
        className={clsx(
          "mt-4 text-base font-bold uppercase text-white md:text-sm",
        )}
      >
        [ {title} ]
      </h4>
      <p
        className={clsx(
          "mt-1 text-base font-light uppercase text-gray-400 md:text-sm lg:underline-offset-8",
        )}
      >
        {description}
      </p>
    </Link>
  );
};
