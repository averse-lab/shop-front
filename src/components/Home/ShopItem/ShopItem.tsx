import { FC } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type IProps = {
  title: string;
  imagePath: string;
  linkPath: string;
};

export const ShopItem: FC<IProps> = (props) => {
  const { linkPath, imagePath, title } = props;

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
      <h4 className={clsx("mt-1 text-base font-medium uppercase text-white md:text-sm")}>
        [ {title} ]
      </h4>
    </Link>
  );
};
