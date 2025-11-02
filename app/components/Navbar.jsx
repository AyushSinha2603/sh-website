"use client";

import { motion, AnD, AnimatePresence } from "framer-motion"; // D: Added AnimatePresence
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import StyleDigits from "./StyleDigits.jsx"; // D: Import StyleDigits

const navLinks = ["Games", "Team", "News"];

const Navbar = ({ onGetInTouchClick }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        // Hero section is 4000px + 100vh tall
        // About section reaches full opacity at 95% of hero scroll
        // Calculate: (4000 + window.innerHeight) * 0.95
        // D: Using the value from the code
        const heroSectionHeight = 1900 + window.innerHeight; 
        const aboutFullyVisibleAt = heroSectionHeight * 0.95;
        
        window.scrollY > aboutFullyVisibleAt ? setVisible(true) : setVisible(false);
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setVisible(true);
    }
  }, [isHomePage, pathname]);

  const navVariants = { visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 } }, hidden: { y: -100, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }, };
  const linkVariants = { visible: { y: 0, opacity: 1 }, hidden: { y: -20, opacity: 0 }, };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-lg"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">

          <motion.a href="/" variants={linkVariants} className="block">
            <Image
              src="/images/logo.png"
              alt="SleepyHeads Logo"
              width={160}
              height={40}
              className="h-10 md:h-14 w-auto"
              priority
            />
          </motion.a>

          {/* Group links and CTA to the right on desktop */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-8" onMouseLeave={() => setHoveredLink(null)}>
              {navLinks.map((link) => (
                 // UPDATED: Changed from text-sm to text-base
                <motion.li key={link} variants={linkVariants} onMouseEnter={() => setHoveredLink(link)} className="relative text-base font-medium text-neutral-300 transition-colors hover:text-white">
                   <a href={`/${link.toLowerCase()}`}><StyleDigits>{link}</StyleDigits></a>
                   {hoveredLink === link && ( <motion.div layoutId="underline" className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-indigo-500" /> )}
                </motion.li>
              ))}
              
              {/* --- "GET IN TOUCH" AS NAV LINK --- */}
              <motion.li 
                variants={linkVariants} 
                onMouseEnter={() => setHoveredLink("Get in Touch")} 
                className="relative text-base font-medium text-neutral-300 transition-colors hover:text-white"
              >
                <button onClick={onGetInTouchClick} className="focus:outline-none">
                  <StyleDigits>Contact Us</StyleDigits>
                </button>
                {hoveredLink === "Get in Touch" && ( <motion.div layoutId="underline" className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-indigo-500" /> )}
              </motion.li>
            </ul>
            
            {/* --- "JOIN DISCORD" AS PRIMARY CTA --- */}
            <motion.a
              href="https://discord.gg/cH7hBFS2"
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              <StyleDigits>Join Discord</StyleDigits>
            </motion.a>

            {/* "Get in Touch" button removed from here */}
          </div>

          {/* --- MOBILE HAMBURGER ICON --- */}
          <div className="md:hidden">
            <motion.button onClick={toggleMobileMenu} variants={linkVariants} className="text-2xl text-white focus:outline-none">
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </motion.button>
          </div>
        </div>

        {/* --- Animated Bottom Border --- */}
        <div className="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, repeatType: "loop", duration: 2, ease: "linear" }} className="h-full w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
        </div>
      </motion.nav>

      {/* --- MOBILE MENU PANEL --- */}
      {/* D: Added AnimatePresence for exit animation */}
      <AnimatePresence> 
        {mobileMenuOpen && (
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="fixed top-0 right-0 z-30 h-screen w-64 bg-neutral-950 p-6 shadow-lg md:hidden">
               <div className="flex justify-end mb-8"> <button onClick={toggleMobileMenu} className="text-3xl text-white"><FiX /></button> </div>
               <ul className="flex flex-col items-center gap-8 mt-16">
                  {navLinks.map((link) => ( <li key={link} className="text-2xl font-semibold text-neutral-300 hover:text-white"> <a href={`/${link.toLowerCase()}`} onClick={toggleMobileMenu}><StyleDigits>{link}</StyleDigits></a> </li> ))}
                  
                  {/* --- "GET IN TOUCH" AS NAV LINK (MOBILE) --- */}
                  <li className="text-2xl font-semibold text-neutral-300 hover:text-white">
                    <button onClick={() => { onGetInTouchClick(); toggleMobileMenu(); }} className="focus:outline-none">
                      <StyleDigits>Contact Us</StyleDigits>
                    </button>
                  </li>

                  {/* --- "JOIN DISCORD" AS PRIMARY CTA (MOBILE) --- */}
                  <li className="w-full mt-4"> 
                    <a
                      href="https://discord.gg/cH7hBFS2"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMobileMenu}
                      className="block w-full rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-indigo-500 text-center"
                    >
                      <StyleDigits>Join Discord</StyleDigits>
                    </a>
                  </li>

                  {/* "Get in Touch" button removed from here */}
               </ul>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;