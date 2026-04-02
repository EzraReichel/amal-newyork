import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant, Inter, Great_Vibes, Montserrat, Playfair_Display, Poppins, Libre_Baskerville, DM_Serif_Display, Lora } from "next/font/google";
import "../styles/globals.css";

const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant-garamond", weight: ["300","400","500","600"], style: ["normal","italic"] });
const cormorant = Cormorant({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300","400","500"], style: ["normal","italic"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300","400","500"] });
const greatVibes = Great_Vibes({ subsets: ["latin"], variable: "--font-script", weight: ["400"] });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["300","400","500"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400","500","600","700"], style: ["normal","italic"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300","400","500"] });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], variable: "--font-libre-baskerville", weight: ["400","700"], style: ["normal","italic"] });
const dmSerifDisplay = DM_Serif_Display({ subsets: ["latin"], variable: "--font-dm-serif", weight: ["400"], style: ["normal","italic"] });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", weight: ["400","500","600"], style: ["normal","italic"] });

export const metadata: Metadata = {
  title: "AMAL — New York",
  description: "Luxury leather goods. Crafted in Italy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = process.env.NEXT_PUBLIC_THEME ?? "a";
  const fontClasses = [
    cormorantGaramond.variable, cormorant.variable, inter.variable, greatVibes.variable,
    montserrat.variable, playfairDisplay.variable, poppins.variable,
    libreBaskerville.variable, dmSerifDisplay.variable, lora.variable,
  ].join(" ");
  return (
    <html lang="en" className={fontClasses} data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
