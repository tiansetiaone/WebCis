import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/Footer';
import SessionStorageSync from "./components/SessionStorageSync";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Cisangkan',
  description: 'Company Profile',
  icons: {
    icon: '/favicon.ico', // File favicon.ico di folder public
    shortcut: '/shortcut-icon.png', // Opsional
    apple: '/apple-icon.png', // Opsional untuk perangkat Apple
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png', // Opsional
    },
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {/* Google Tag Manager - recommended by Next.js */}
  <Script id="gtm-init" strategy="afterInteractive">
    {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MWBFCWPF');
    `}
  </Script>
</head>
      <body>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MWBFCWPF"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
          <SessionStorageSync/>
          <Navbar />
          {children}
          <Footer />
   
      </body>
    </html>
  );
}

