import { Abhaya_Libre, Inter as RsmsInter } from "next/font/google";

const AbhayaLibre = Abhaya_Libre({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-abhaya",
});

const Inter = RsmsInter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export { AbhayaLibre, Inter };
