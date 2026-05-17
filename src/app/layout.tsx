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

const SITE_NAME = "Kasturi Pal — Creative Portfolio";
const SITE_DESCRIPTION =
    "The creative portfolio of Kasturi Pal — a fashion design graduate working across fashion communication, design development, branding, editorial design and photography.";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.kasturi.page"),
    title: {
        default: SITE_NAME,
        template: "%s · Kasturi Pal",
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: [
        "Kasturi Pal",
        "fashion designer",
        "fashion design portfolio",
        "fashion communication",
        "design development",
        "branding",
        "editorial design",
    ],
    authors: [{ name: "Kasturi Pal" }],
    creator: "Kasturi Pal",
    openGraph: {
        type: "website",
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
    robots: { index: true, follow: true },
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
