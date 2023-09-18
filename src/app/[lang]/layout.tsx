import "@averse/app/globals.css";
import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import Footer from "@averse/components/global/Footer";
import { Hanken_Grotesk } from "next/font/google";
import { I18N_CONFIG } from "@averse/lib/i18n/config";

const hanken_grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hk",
});

export const metadata: Metadata = {
  title: "Averse",
  description: "Averse is a jewelery brand.",
};

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({ lang: locale }));
}

type IProps = {
  params: { lang: string };
} & PropsWithChildren;

const RootLayout: FC<IProps> = ({ children, params }) => {
  return (
    <html lang={params.lang}>
      <body className={`${hanken_grotesk.variable} font-sans`}>
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
