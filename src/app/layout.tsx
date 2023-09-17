import "./globals.css";
import type { Metadata } from "next";
import { FC, PropsWithChildren, ReactNode } from "react";
import Header from "@averse/components/global/Header";
import { LateralMenu } from "@averse/components/global/LateralMenu";
import { MenuContextProvider } from "@averse/context/MenuContext";
import Footer from "@averse/components/global/Footer";
import { Hanken_Grotesk } from "next/font/google";

const hanken_grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hk",
});

export const metadata: Metadata = {
  title: "Averse",
  description: "Averse is a jewelery brand.",
};

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <html lang='en'>
      <body className={`${hanken_grotesk.variable} font-sans`}>
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
