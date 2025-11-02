// app/layout.js

"use client";

import localFont from 'next/font/local';

import { useState, useEffect } from "react";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ContactModal from "./components/ContactModal.jsx";
import GlobalParticleBackground from "./components/GlobalParticleBackground.jsx";
// import FixThreeInHeadings from "./components/FixThreeInHeadings.jsx"; // <-- REMOVED: This was causing the bug
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
});

export default function RootLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // --- THIS IS THE FIX ---
    // Added suppressHydrationWarning to ignore browser extension attributes
    <html lang="en" suppressHydrationWarning={true}>
      {/* This is safe and will not hide other hydration bugs in your app.
        It only stops React from checking attributes on the <html> tag itself.
      */}
      <body className={`${rajdhani.className} ${sleepyHeadFont.variable} bg-[#0F0F0F] text-neutral-200 antialiased font-semibold`}>
      <HOC>
        <RefreshHandler />
        {/* <FixThreeInHeadings /> */} {/* <-- REMOVED: This was causing the bug */}
        <GlobalParticleBackground />
        <div className="relative z-10">
          <Navbar onGetInTouchClick={() => setIsModalOpen(true)} />
          {children}
          <Footer />
        </div>
        <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </HOC>
      </body>
    </html>
  );
}