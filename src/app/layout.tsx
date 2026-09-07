import type { Metadata } from "next";
import { Bebas_Neue, Great_Vibes, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { AgeGate } from "@/components/age-gate";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
    "Vape Barn is opening its doors online. Disposables, e-liquids, devices and accessories. Proper flavour, proper service.",
  metadataBase: new URL("https://vapebarn.co.za"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${manrope.variable} ${greatVibes.variable} min-h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-navy">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <AgeGate />
        </CartProvider>
      </body>
    </html>
  );
}
