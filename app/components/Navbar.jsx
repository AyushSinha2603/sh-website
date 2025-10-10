"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import hamburger and close icons

const navLinks = ["Games", "Studio", "Careers", "Blog"];

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.7) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 } },
    hidden: { y: -100, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };
  
  const linkVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -20, opacity: 0 },
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          
          <motion.a href="/" variants={linkVariants} className="text-xl font-bold text-white">
            GameDev Co.
          </motion.a>

          {/* --- DESKTOP MENU --- */}
          <ul className="hidden md:flex items-center gap-8" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map((link) => (
              <motion.li key={link} variants={linkVariants} /* ... (rest is the same) ... */ >
                 <a href={`/${link.toLowerCase()}`}>{link}</a>
                 {hoveredLink === link && ( <motion.div layoutId="underline" className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-indigo-500" /> )}
              </motion.li>
            ))}
          </ul>
          <motion.button variants={linkVariants} /* ... (button code is the same) ... */>
            Get in Touch
          </motion.button>

          {/* --- HAMBURGER ICON --- */}
          {/* This button is only visible on mobile screens (md:hidden) */}
          <div className="md:hidden">
            <motion.button onClick={toggleMobileMenu} variants={linkVariants} className="text-2xl text-white">
                <FiMenu />
            </motion.button>
          </div>

        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
          <motion.div /* ... (gradient border is the same) ... */ />
        </div>
      </motion.nav>

      {/* --- MOBILE MENU PANEL --- */}
      {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-40 h-screen w-full bg-neutral-950 p-6"
          >
             <div className="flex justify-end mb-8">
                <button onClick={toggleMobileMenu} className="text-3xl text-white">
                    <FiX />
                </button>
             </div>
             <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                    <li key={link} className="text-2xl font-semibold text-neutral-300 hover:text-white">
                        <a href={`/${link.toLowerCase()}`}>{link}</a>
                    </li>
                ))}
             </ul>
          </motion.div>
      )}
    </>
  );
};

export default Navbar;