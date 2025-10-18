// app/components/HeroSection.jsx
"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    // Background is transparent to show global particles
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-transparent">
      {/* Content */}
      <div className="relative z-20 p-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight"
        >
          From Dreams to<br />
          <span
            className="bg-gradient-to-r from-blue-400 to-indigo-700 bg-clip-text text-transparent"
          >
            Digital Worlds
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          An independent studio dedicated to building unforgettable gaming experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-8"
        >
          {/* Link to games page */}
          <a
            href="/games"
            className="bg-rose-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F0F] focus:ring-rose-500"
          >
            Explore Our Games
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </motion.div>

      {/* Bottom fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent z-20" />
    </section>
  );
};

export default HeroSection;