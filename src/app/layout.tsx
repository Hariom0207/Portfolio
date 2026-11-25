import type { Metadata } from "next";
import { Antonio, Inter } from "next/font/google";
import Script from "next/script";
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

// Runs before the page is painted: applies the saved theme (or the system setting) so there's no flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
