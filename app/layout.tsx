import type { Metadata } from "next";
import { Onest, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "swiper/css";
import "swiper/css/pagination";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-primary",
});
const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});
export const metadata: Metadata = {
  title: {
    default: "HI",
    template: "%s | SwiftRun",
  },
  description:
    "SwiftRun is a modern logistics platform built to make sending and receiving packages effortless. With real-time tracking, trusted drivers, and seamless delivery options, we bring speed, care, and reliability to every delivery experience.",
  keywords: [
    "delivery",
    "fast delivery",
    "reliable delivery",
    "parcel delivery",
    "package delivery",
    "shipment delivery",
    "track delivery",
    "track packages",
    "track shipments",
    "shipping",
    "fast shipping",
    "reliable shipping",
    "secure shipping",
    "parcel shipping",
    "package shipping",
    "shipment shipping",
    "same day delivery",
    "home delivery",
    "online delivery",
    "international delivery",
    "courier service",
    "express delivery",
    "logistics",
    "logistics service",
    "package tracking",
    "shipment tracking",
    "parcel tracking",
    "real-time tracking",
    "trusted drivers",
    "bike delivery",
    "bicycle delivery",
    "bike courier",
    "bicycle courier",
    "fast bike delivery",
    "quick bicycle delivery",
    "eco-friendly delivery",
    "urban delivery",
    "same day bike delivery",
    "local bike courier",
    "track bike delivery",
    "bike shipment",
    "bike parcel delivery",
    "package delivery by bike",
    "bicycle package delivery",
    "real-time bike tracking",
    "bike shipping",
    "bike transport",
    "bike logistics",
    "SwiftRun",
    "SwiftRun bike delivery",
    "SwiftRun bicycle delivery",
    "SwiftRun bike courier",
    "SwiftRun bicycle courier",
    "SwiftRun express bike delivery",
    "SwiftRun fast bike delivery",
    "SwiftRun eco-friendly delivery",
    "SwiftRun urban delivery",
    "SwiftRun local bike delivery",
    "SwiftRun same day bike delivery",
    "SwiftRun real-time bike tracking",
    "SwiftRun track bike delivery",
    "SwiftRun parcel delivery",
    "SwiftRun package delivery",
    "SwiftRun courier service",
    "SwiftRun delivery app",
    "SwiftRun shipping app",
  ],
  openGraph: {
    title: "SwiftRun – Fast & Reliable Package Delivery",
    description:
      "Experience effortless shipping with SwiftRun. Track packages in real-time, rely on trusted drivers, and enjoy seamless delivery options.",
    url: "/open-graph.png", // replace with your actual URL
    type: "website",

    siteName: "swiftrunapp.com",
    images: [
      {
        url: "/open-graph.png", // your OG image
        width: 1200,
        height: 630,
        alt: "SwiftRun – Logistics Platform Open Graph Image",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "SwiftRun – Fast & Reliable Package Delivery",
    description:
      "Effortless shipping with real-time tracking and trusted drivers. SwiftRun brings speed, care, and reliability to every delivery.",
    images: ["/open-graph.png"],
  },

  robots: {
    index: true, // allow indexing by search engines
    follow: true, // allow following of links on this page
    nocache: true, // allow caching (usually true for static content)
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false, // allow images to be indexed
      "max-snippet": -1, // no limit to text snippet length
      "max-image-preview": "large", // allow large image previews
      "max-video-preview": -1, // no limit on video preview length
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${fontHeading.className} antialiased`}>
        <div className="min-h-screen bg-white">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
