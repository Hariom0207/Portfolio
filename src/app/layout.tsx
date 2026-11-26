import type { Metadata } from "next";
import { Antonio, Inter } from "next/font/google";
import Script from "next/script";
import Preloader from "@/components/Preloader";
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

// Runs before the page is painted:
// 1. applies the saved theme (or the system setting) so there's no flash;
// 2. shows the intro loader only on the first visit of the browser session ("is-loading"),
//    with a safety timeout so the page can never stay stuck behind it.
const startupScript = `(function(){var r=document.documentElement;
try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)r.classList.add("dark")}catch(e){}
var seen=false;try{seen=!!sessionStorage.getItem("hr-loaded")}catch(e){}
if(seen){r.classList.add("skip-preloader")}else{r.classList.add("is-loading");setTimeout(function(){if(r.classList.contains("is-loading")){r.classList.remove("is-loading");window.dispatchEvent(new Event("preloader:done"))}},6000)}
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body>
        <Script id="startup" strategy="beforeInteractive">
          {startupScript}
        </Script>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
