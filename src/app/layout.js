import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/Footer';
import SessionStorageSync from "./components/SessionStorageSync";


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
      <body>
          <SessionStorageSync/>

          <Navbar />
          {children}
          <Footer />
   
      </body>
    </html>
  );
}