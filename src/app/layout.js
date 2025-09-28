"use client";
import { Caveat, Lexend, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import WhatsAppButton from "./components/CustomUI/Button/Whatsapp";

import AnalyticsLoader from "./lib/AnLoader";
import PopupForm from "./components/Popup/PopupForm";

const fontAlt = Caveat({
  variable: "--font-alt",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const fontPrime = Open_Sans({
  variable: "--font-prime",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [setting, setSetting] = useState("");
  async function loadSettings() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/settings/`,
        {
          method: "GET",
          cache: "force-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      console.log("settings data:", data);
      setSetting(data);
    } catch (err) {
      console.error("Failed to fetch settings", err);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  const GTM_ID = setting?.tracking?.gtmId;
  const number = setting?.whatsapp?.number;

  console.log("GTM_ID", GTM_ID, "number", number);

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
          }}
        />
      </head>

      <body
        className={`${fontPrime.variable} ${fontAlt.variable}`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager NoScript Fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton
          phoneNumber={number || "+919999999999"}
          message={setting?.whatsapp?.message}
          position="right"
          tooltip="Chat on WhatsApp"
        />
        <PopupForm />
        <AnalyticsLoader />
      </body>
    </html>
  );
}
