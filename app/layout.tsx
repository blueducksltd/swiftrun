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
  title: "SwiftRun",
  description:
    "SwiftRun is a modern logistics platform built to make sending and receiving packages effortless. With real-time tracking, trusted drivers, and seamless delivery options, we bring speed, care, and reliability to every delivery experience.",
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
