import type { Metadata } from "next";
import { Bebas_Neue, Great_Vibes, Manrope } from "next/font/google";
import "./globals.css";
import { AgeGate } from "@/components/age-gate";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyBar } from "@/components/sticky-bar";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vape Barn | Vape Properly",
  description:
    "Sandton's neighbourhood vape shop. Browse the catalogue with prices, order on Mr D, or drop in to the Barn.",
  metadataBase: new URL("https://vapebarn.co.za"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${manrope.variable} ${greatVibes.variable} min-h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-navy">
        <div className="pb-20 md:pb-0">
          <Header />
          {children}
          <Footer />
        </div>
        <StickyBar />
        <AgeGate />
      </body>
    </html>
  );
}
