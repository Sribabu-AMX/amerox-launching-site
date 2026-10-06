import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["500", "600", "700", "800"], display: "swap" });
// The DEX asks for Gambarino for its serif headlines; it is self-hosted here (Fontshare, free licence).
const gambarino = localFont({ src: "../fonts/Gambarino-Regular.woff2", variable: "--font-gambarino", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Amerox Wallet — Your keys. Your control.",
    template: "%s · Amerox Wallet",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["Amerox", "Amero X", "AMX", "crypto wallet", "self-custody", "Chrome extension", "EVM wallet", "EIP-6963"],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Amerox Wallet — Your keys. Your control.",
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    site: "@AmeroXchain",
    title: "Amerox Wallet — Your keys. Your control.",
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${gambarino.variable}`}>
      <body className="min-h-screen bg-page text-white antialiased">{children}</body>
    </html>
  );
}
