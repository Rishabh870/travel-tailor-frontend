import { Caveat, Lexend, Open_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import WhatsAppButton from './components/CustomUI/Button/Whatsapp';

import AnalyticsLoader from './lib/AnLoader';
import PopupForm from './components/Popup/PopupForm';

const fontAlt = Caveat({
  variable: '--font-alt',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const fontPrime = Open_Sans({
  variable: '--font-prime',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const GTM_ID = process.env.NEXT_PUBLIC_GTAG_ID;

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

export const metadata = {
  title: 'Home | Travel Tailor',
  description:
    'Travel Tailor is a travel booking website that helps travelers find the best deals on Tours and help them plan their trips.',
  keywords:
    'travel consultant, custom trip planner, customised itinerary, travel advisor, travel agent and travel consultant',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/images/logoAlt.png',
    apple: '/images/logoAlt.png',
  },

  openGraph: {
    title: 'Home | Travel Tailor',
    description:
      'Travel Tailor is a travel booking website that helps travelers find the best deals on Tours and help them plan their trips.',
    url: 'https://traveltailor.in/',
    siteName: 'Travel Tailor',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        {/* Google Tag Manager Script */}
        <Script
          id='gtm-script'
          strategy='afterInteractive'
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
        suppressHydrationWarning>
        {/* Google Tag Manager NoScript Fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>

        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton
          phoneNumber='+919165070409'
          position='right'
          tooltip='Chat on WhatsApp'
        />
        <PopupForm />
        <AnalyticsLoader />
      </body>
    </html>
  );
}
