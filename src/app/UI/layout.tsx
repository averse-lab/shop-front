import { FC, PropsWithChildren } from "react";

import clsx from "clsx";

import { DMSans } from "@lib/fonts";
import { Locale } from "@lib/i18n/types";

type IProps = {
  params: { lang: Locale };
} & PropsWithChildren;

const UILayout: FC<IProps> = async (props) => {
  const { children } = props;

  return (
    <html>
      <body className={clsx(DMSans.variable, "font-sans")}>{children}</body>
    </html>
  );
};

export default UILayout;
