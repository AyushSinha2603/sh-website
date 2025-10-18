"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

// Correct links for the navbar
const navLinks = ["Games", "Team", "News"];

// Navbar receives the function to open the modal
const Navbar = ({ onGetInTouchClick }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [visible, setVisible] = useState(false); // State controls visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Effect to handle navbar visibility based on page and scroll
  useEffect(() => {
    if (isHomePage) {
      // On homepage: Initially hidden, reveal on scroll
      setVisible(false); // Start hidden
      const handleScroll = () => {
        // Check scroll position to determine visibility
        window.scrollY > window.innerHeight * 1.7 ? setVisible(true) : setVisible(false);
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position
      // Cleanup listener
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // On other pages: Make navbar visible immediately
      setVisible(true);
    }
  }, [isHomePage, pathname]); // Rerun when pathname changes

  // Animation variants for the navbar container
  const navVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 } },
    hidden: { y: -100, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  // Animation variants for individual nav items (logo, links, button)
  const linkVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -20, opacity: 0 },
  };

  // Function to toggle the mobile menu state
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Main Navbar Element */}
      <motion.nav
        variants={navVariants}
        initial="hidden" // Always start hidden (controlled by animate)
        animate={visible ? "visible" : "hidden"} // Animate based on the 'visible' state
        className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-lg" // z-index lower than modal
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <motion.a href="/" variants={linkVariants} className="text-xl font-bold text-white">
            SleepyHeads
          </motion.a>

          {/* --- DESKTOP MENU LINKS --- */}
          <ul className="hidden md:flex items-center gap-8" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map((link) => (
              <motion.li
                key={link}
                variants={linkVariants}
                onMouseEnter={() => setHoveredLink(link)}
                className="relative text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                 {/* Link for desktop */}
                 <a href={`/${link.toLowerCase()}`}>{link}</a>
                 {/* Animated underline for hover state */}
                 {hoveredLink === link && ( <motion.div layoutId="underline" className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-indigo-500" /> )}
              </motion.li>
            ))}
          </ul>

          {/* --- DESKTOP "GET IN TOUCH" BUTTON --- */}
          <motion.button
            onClick={onGetInTouchClick} // Triggers the modal
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Get in Touch
          </motion.button>

          {/* --- MOBILE HAMBURGER ICON --- */}
          <div className="md:hidden">
            <motion.button onClick={toggleMobileMenu} variants={linkVariants} className="text-2xl text-white focus:outline-none">
              {/* Show X icon if menu is open, otherwise show Menu icon */}
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </motion.button>
          </div>
        </div>

        {/* --- Animated Bottom Border --- */}
        <div className="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, repeatType: "loop", duration: 2, ease: "linear" }} className="h-full w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
        </div>
      </motion.nav>

      {/* --- MOBILE MENU PANEL (Slides in) --- */}
      {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }} // Start off-screen right
            animate={{ x: 0 }} // Animate to fully visible
            exit={{ x: "100%" }} // Animate off-screen right on close
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-30 h-screen w-64 bg-neutral-950 p-6 shadow-lg md:hidden" // Only show on mobile
          >
             {/* Close button inside the mobile menu */}
             <div className="flex justify-end mb-8">
                <button onClick={toggleMobileMenu} className="text-3xl text-white">
                    <FiX />
                </button>
             </div>
             {/* Navigation links inside the mobile menu */}
             <ul className="flex flex-col items-center gap-8 mt-16">
                {navLinks.map((link) => (
                    <li key={link} className="text-2xl font-semibold text-neutral-300 hover:text-white">
                        {/* Link closes menu on click */}
                        <a href={`/${link.toLowerCase()}`} onClick={toggleMobileMenu}>{link}</a>
                    </li>
                ))}
                {/* Mobile "Get in Touch" styled as a button */}
                <li className="w-full mt-4">
                    <button
                        onClick={() => {
                            onGetInTouchClick(); // Open modal
                            toggleMobileMenu(); // Close menu
                        }}
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-indigo-500"
                    >
                        Get in Touch
                    </button>
                </li>
             </ul>
          </motion.div>
      )}
    </>
  );
};

export default Navbar;