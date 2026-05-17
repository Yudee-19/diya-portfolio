import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const westonia = localFont({
  src: "../assets/fonts/westonia/Westonia.ttf",
  variable: "--font-westonia",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "Fashion Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${greatVibes.variable} ${openSans.variable} ${westonia.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
