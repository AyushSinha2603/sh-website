"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
// Removed useLenis as it's not needed for modal trigger

const navLinks = ["Games", "Team", "News"];

// Navbar now receives a function to open the modal
const Navbar = ({ onGetInTouchClick }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Scroll effect ONLY runs on the homepage
    if (isHomePage) {
      const handleScroll = () => { window.scrollY > window.innerHeight * 1.7 ? setVisible(true) : setVisible(false); };
      window.addEventListener("scroll", handleScroll);
      // Clean up listener
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // On other pages, make navbar visible immediately
      setVisible(true);
    }
  }, [isHomePage, pathname]); // Rerun when pathname changes

  const navVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 } },
    hidden: { y: -100, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const linkVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -20, opacity: 0 },
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden" // Always start hidden, visibility controlled by animate
        animate={visible ? "visible" : "hidden"} // Use state to control animation
        className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-lg" // z-index lower than modal
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <motion.a href="/" variants={linkVariants} className="text-xl font-bold text-white">
            SleepyHeads
          </motion.a>

          {/* --- DESKTOP MENU --- */}
          <ul className="hidden md:flex items-center gap-8" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map((link) => (
              <motion.li
                key={link}
                variants={linkVariants}
                onMouseEnter={() => setHoveredLink(link)}
                className="relative text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                 <a href={`/${link.toLowerCase()}`}>{link}</a>
                 {hoveredLink === link && ( <motion.div layoutId="underline" className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-indigo-500" /> )}
              </motion.li>
            ))}
          </ul>

          {/* --- GET IN TOUCH BUTTON (triggers modal) --- */}
          <motion.button
            onClick={onGetInTouchClick} // Call the function passed via props
            variants={linkVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Get in Touch
          </motion.button>

          {/* --- HAMBURGER ICON --- */}
          <div className="md:hidden">
            <motion.button onClick={toggleMobileMenu} variants={linkVariants} className="text-2xl text-white">
              {/* Toggle icon based on state */}
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </motion.button>
          </div>
        </div>

        {/* --- Animated Border --- */}
        <div className="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, repeatType: "loop", duration: 2, ease: "linear" }} className="h-full w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
        </div>
      </motion.nav>

      {/* --- MOBILE MENU PANEL --- */}
      {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-30 h-screen w-64 bg-neutral-950 p-6 shadow-lg md:hidden" // Ensure hidden on desktop
          >
             <div className="flex justify-end mb-8">
                <button onClick={toggleMobileMenu} className="text-3xl text-white">
                    <FiX />
                </button>
             </div>
             <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                    <li key={link} className="text-2xl font-semibold text-neutral-300 hover:text-white">
                        {/* Close menu on link click */}
                        <a href={`/${link.toLowerCase()}`} onClick={toggleMobileMenu}>{link}</a>
                    </li>
                ))}
                {/* Add Get in Touch to mobile menu */}
                <li>
                    <button
                        onClick={() => {
                            onGetInTouchClick(); // Open modal
                            toggleMobileMenu(); // Close menu
                        }}
                        className="text-2xl font-semibold text-indigo-400 hover:text-indigo-300"
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