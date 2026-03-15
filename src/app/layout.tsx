import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Poker Trainer — Free GTO Poker Training",
    template: "%s | Poker Trainer",
  },
  description: "Free, open-source poker training platform. Master GTO preflop ranges, hand recognition, pot odds, postflop strategy, and learn everything about poker from scratch.",
  keywords: [
    "poker trainer", "GTO poker", "poker training", "preflop ranges",
    "poker strategy", "pot odds calculator", "poker course", "learn poker",
    "hand recognition", "postflop strategy", "free poker trainer",
    "poker practice", "poker drill", "poker quiz",
  ],
  authors: [{ name: "Poker Trainer" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Poker Trainer",
    title: "Poker Trainer — Free GTO Poker Training",
    description: "Free, open-source poker training platform. Master GTO ranges, pot odds, hand recognition, and postflop play.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poker Trainer — Free GTO Poker Training",
    description: "Free, open-source poker training platform. Master GTO ranges, pot odds, hand recognition, and postflop play.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Poker Trainer",
    description: "Free, open-source poker training platform with GTO range drills, hand recognition, pot odds, and a complete poker course.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <NavBar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
