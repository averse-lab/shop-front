import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${hanken_grotesk.variable} font-sans`}>
        <MenuContextProvider>
          <LateralMenu />
          <Header />
          {children}
        </MenuContextProvider>
        <Footer />
      </body>
    </html>
  );
}
