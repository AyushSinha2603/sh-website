"use client";

import { motion } from "framer-motion";
import { FiTwitter, FiYoutube, FiInstagram } from "react-icons/fi";

const Footer = () => {
  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Elements appear one after another
        delayChildren: 0.3,   // Small delay before starting
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Subtle hover animation for social icons
  const socialIconHover = {
    y: -3, // Move up slightly
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    // Footer container with padding
    <footer className="bg-neutral-950 text-white py-12 px-6 relative overflow-hidden">
      <div className="container mx-auto text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when scrolled into view
          viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% visible
        >
          {/* Studio Name */}
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-2">
            SleepyHeads
          </motion.h3>

          {/* Optional Tagline */}
          <motion.p variants={itemVariants} className="text-sm text-neutral-500 mb-6">
            From Dreams to Digital Worlds
          </motion.p>

          {/* Social Media Icons */}
          <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-8 text-2xl text-neutral-400">
            <motion.a href="#" whileHover={socialIconHover} className="hover:text-indigo-400 transition-colors"><FiTwitter /></motion.a>
            <motion.a href="#" whileHover={socialIconHover} className="hover:text-indigo-400 transition-colors"><FiYoutube /></motion.a>
            <motion.a href="#" whileHover={socialIconHover} className="hover:text-indigo-400 transition-colors"><FiInstagram /></motion.a>
          </motion.div>

          {/* Copyright Information */}
          <motion.div variants={itemVariants} className="border-t border-neutral-800 pt-6 text-xs text-neutral-500">
            <p>&copy; {new Date().getFullYear()} SleepyHeads Studios. All rights reserved.</p>
          </motion.div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;