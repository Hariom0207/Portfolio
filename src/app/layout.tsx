import type { Metadata } from "next";
import { Antonio, Inter } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hariom Ray — React.js & MERN Stack Developer",
  description:
    "Portfolio of Hariom Ray, a React.js and MERN Stack developer from Jhabua, Madhya Pradesh, with 2 years of experience at Black Hat Bucks Tech.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
