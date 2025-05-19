import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Merriweather, Poppins } from "next/font/google";

export const fontSans: NextFontWithVariable = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const fontSerif: NextFontWithVariable = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  style: "normal",
});
