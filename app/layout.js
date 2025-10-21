// app/layout.js
"use client";

import { useState, useEffect } from "react"; // Ensure useState and useEffect are imported
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ContactModal from "./components/ContactModal.jsx";
import GlobalParticleBackground from "./components/GlobalParticleBackground.jsx";
import RefreshHandler from "./components/RefreshHandler.jsx";
import HOC from "./components/HOC";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Removed the useEffect scroll-to-top, as it's handled by RefreshHandler

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0F0F0F] text-neutral-200 antialiased`}>
      <HOC>
        {/* Refresh handler component */}
        <RefreshHandler />
        {/* Global particle background */}
        <GlobalParticleBackground />
        {/* Main content wrapper */}
        <div className="relative z-10">
          {/* Pass the function to open the modal to the Navbar */}
          <Navbar onGetInTouchClick={() => setIsModalOpen(true)} />
          {/* Page content */}
          {children}
          {/* Footer component */}
          <Footer />
        </div>
        {/* Contact modal component, controlled by state */}
        <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </HOC>
        
      </body>
    </html>
  );
}