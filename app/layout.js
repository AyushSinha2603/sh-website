import localFont from 'next/font/local';
import { Rajdhani } from "next/font/google";
import "./globals.css";
import HeaderWithModal from "./components/HeaderWithModal.jsx";
import Footer from "./components/Footer.jsx";
import GlobalParticleBackground from "./components/GlobalParticleBackground.jsx";

import RefreshHandler from "./components/RefreshHandler.jsx";
import HOC from "./components/HOC";

const sleepyHeadFont = localFont({
  src: './fonts/SleepyHead.ttf',
  variable: '--font-sleepyhead',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'SleepyHead Studios',
  description: 'Welcome to SleepyHead Studios',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preload" href="/images/website-banner.png" as="image" fetchPriority="high" />
      </head>
      <body className={`${rajdhani.className} ${sleepyHeadFont.variable} bg-[#0F0F0F] text-neutral-200 antialiased font-semibold`}>
      <HOC>
        <RefreshHandler />
        <GlobalParticleBackground />
        <div className="relative z-10">
          <HeaderWithModal />
          {children}
          <Footer />
        </div>
      </HOC>
      </body>
    </html>
  );
}