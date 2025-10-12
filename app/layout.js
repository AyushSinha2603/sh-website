// app/layout.js

"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SmoothScroller from "./components/SmoothScroller.jsx";
import CustomCursor from "./components/CustomCursor.jsx"; // 1. Import the new component

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900 text-neutral-200`}>
        <CustomCursor /> {/* 2. Place the cursor here */}
        <SmoothScroller>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}