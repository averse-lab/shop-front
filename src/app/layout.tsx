import "@averse/app/globals.css";

import { FC, PropsWithChildren } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Averse",
  description: "Averse is a jewelery brand.",
  robots: "noindex",
};

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return children;
};

export default RootLayout;
