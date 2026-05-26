import type { Metadata } from "next";
import { Inter, Abel, Roboto } from "next/font/google";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const abel = Abel({ weight: "400", subsets: ["latin"], display: "swap", variable: "--abel" });
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], display: "swap", variable: "--roboto" });

export const metadata: Metadata = {
  title: { default: "Molecule Ventures", template: "%s | Molecule Ventures" },
  description:
    "Molecule Ventures is a SEBI registered Portfolio Management Services company focused on Mid and Small Cap investments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${abel.variable} ${roboto.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}