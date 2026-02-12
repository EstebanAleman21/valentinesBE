import React from "react"
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Story",
  description: "A love letter written in code.",
};

export const viewport: Viewport = {
  themeColor: "#f9c6d3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
