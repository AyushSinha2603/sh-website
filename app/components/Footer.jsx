"use client";

import { motion } from "framer-motion";
// Updated Imports: Added Linkedin and Itch.io icons
import { FiTwitter, FiYoutube, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaItchIo } from "react-icons/fa";

const Footer = () => {
  // Animation variants remain the same
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const socialIconHover = { y: -3, transition: { type: "spring", stiffness: 300 } };

  return (
    <footer className="bg-neutral-950 text-white py-12 px-6 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          {/* Studio Name */}
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-2">
            SleepyHead Studios
          </motion.h3>
          {/* Tagline */}
          <motion.p variants={itemVariants} className="text-sm text-neutral-500 mb-6">
            From Dreams to Digital Worlds
          </motion.p>

          {/* UPDATED Social Media Icons */}
          <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-8 text-2xl text-neutral-400">
            {/* Itch.io */}
            <motion.a
              href="https://sleepyheadstudios.itch.io/" // Add your Itch.io URL
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialIconHover}
              className="hover:text-indigo-400 transition-colors"
              aria-label="Itch.io"
            >
              <FaItchIo />
            </motion.a>
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/sleepyhead_studios_?igsh=MWczNjQzZ2wwbnI2NA==" // Add your Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialIconHover}
              className="hover:text-indigo-400 transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram />
            </motion.a>
            {/* YouTube */}
            <motion.a
              href="https://youtube.com/@sleepyheadstudios04?si=MMKZ6agNPWLsKUeL" // Your YouTube URL
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialIconHover}
              className="hover:text-indigo-400 transition-colors"
              aria-label="YouTube"
            >
              <FiYoutube />
            </motion.a>
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/company/sleepyhead-studios/" // Add your LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialIconHover}
              className="hover:text-indigo-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </motion.a>
          </motion.div>

          {/* Copyright Information */}
          <motion.div variants={itemVariants} className="border-t border-neutral-800 pt-6 text-xs text-neutral-500">
            <p>&copy; {new Date().getFullYear()} SleepyHead Studios. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;