// app/layout.js
"use client";

// REMOVED: useEffect import
import { useState } from "react"; // Keep useState for modal
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ContactModal from "./components/ContactModal.jsx";
import GlobalParticleBackground from "./components/GlobalParticleBackground.jsx";
import RefreshHandler from "./components/RefreshHandler.jsx"; // Import the new component

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // REMOVED: The simple useEffect for scroll to top

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0F0F0F] text-neutral-200 antialiased`}>
        <RefreshHandler /> {/* Add the handler component here */}
        <GlobalParticleBackground />
        <div className="relative z-10">
          <Navbar onGetInTouchClick={() => setIsModalOpen(true)} />
          {children}
          <Footer />
        </div>
        <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </body>
    </html>
  );
}