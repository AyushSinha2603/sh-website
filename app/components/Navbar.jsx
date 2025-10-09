"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = ["Games", "Studio", "Careers", "Blog"];

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  // Variants for the choreographed entry animation
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        staggerChildren: 0.1, // Stagger the animation of child elements
      },
    },
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <motion.a href="/" variants={linkVariants} className="text-xl font-bold text-white">
          GameDev Co.
        </motion.a>

        {/* NAV LINKS */}
        <ul className="hidden md:flex items-center gap-8" onMouseLeave={() => setHoveredLink(null)}>
          {navLinks.map((link) => (
            <motion.li
              key={link}
              variants={linkVariants}
              onMouseEnter={() => setHoveredLink(link)}
              className="relative text-sm font-medium text-neutral-300 transition-colors hover:text-white"
            >
              <a href={`/${link.toLowerCase()}`}>{link}</a>
              {hoveredLink === link && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-indigo-500"
                />
              )}
            </motion.li>
          ))}
        </ul>

        {/* CTA BUTTON */}
        <motion.button
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)" // Indigo glow
          }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Get in Touch
        </motion.button>

      </div>
      
      {/* ANIMATED GRADIENT BORDER */}
      <div className="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "linear",
          }}
          className="h-full w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;