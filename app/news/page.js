"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const newsData = [
  // ... (Your news data remains the same)
  { id: 1, title: "Red Orbit Launches on Play Store!", date: "October 10, 2025", description: "We are thrilled to announce that our debut title, Red Orbit, is now officially available for download on the Google Play Store. Thank you to our entire community for the support!" },
  { id: 2, title: "Placed 3rd in BYOG 2025!", date: "September 15, 2025", description: "Our team participated in the annual Build Your Own Game (BYOG) jam and we're proud to have secured a top 3 finish with our puzzle-platformer prototype, 'Chrono Shift'." },
  { id: 3, title: "New Project 'Umbra' Announced", date: "August 01, 2025", description: "Development has officially begun on our next major title, a narrative-driven stealth game codenamed 'Project Umbra'. More details to come soon." },
  { id: 4, title: "Global Game Jam 2025 Participation", date: "January 28, 2025", description: "The whole team had a fantastic time participating in the Global Game Jam, creating a small but charming game called 'The Last Grove' in just 48 hours." },
  { id: 5, title: "Studio Expansion: New Office Space Unveiled", date: "November 20, 2024", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
  { id: 6, title: "Tech Demo 'Helios' Showcased", date: "July 05, 2024", description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." },
  { id: 7, title: "Partnership with Indie Publisher Announced", date: "April 12, 2024", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. We are excited for what the future holds." },
  { id: 8, title: "First Concept Art for 'Red Orbit' Released", date: "February 02, 2024", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. The initial vision for our first title." },
  { id: 9, title: "SleepyHeads Studio Founded", date: "January 01, 2024", description: "Our journey begins! A small team of passionate developers comes together with a shared dream of creating unforgettable games. The adventure starts now." },
];

const NewsItem = ({ item, side }) => {
  // Mobile-first animation (slide from right)
  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    // Desktop animation alternates based on 'side'
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Specific variant for desktop left side
  const desktopLeftVariant = {
     hidden: { opacity: 0, x: -50 }, // Slide from left on desktop
     visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  }

  return (
    // Mobile: Full width, left padding. Desktop: Half width, alternates alignment, no left padding.
    <motion.div
      // Use correct variant based on screen size implicitly via Tailwind,
      // but explicitly manage animation variants for desktop alternation
      variants={side === 'left' ? desktopLeftVariant : itemVariants} // Note: This applies mainly to desktop due to layout classes
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }} // Adjusted amount for better trigger
      // Correct responsive classes for layout
      className={`relative w-full mb-8 md:w-1/2 ${side === 'left' ? 'md:self-start md:pr-8' : 'md:self-end md:pl-8'}`}
    >
      {/* Container for dot + content, handles mobile padding */}
      <div className="relative pl-10 md:pl-0">
        {/* The dot on the timeline */}
        <div className={`absolute top-1 left-0 -translate-x-1/2 md:left-auto md:translate-x-0 ${side === 'left' ? 'md:right-[-0.5rem]' : 'md:left-[-0.5rem]'} w-4 h-4 bg-indigo-500 rounded-full border-4 border-[#0F0F0F]`} />
        
        {/* Content Box */}
        <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700">
          <p className="text-sm text-indigo-400 mb-2">{item.date}</p>
          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-neutral-300 text-sm">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const NewsPage = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end end"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    // Background is transparent
    <div className="bg-transparent min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="text-5xl md:text-7xl font-black text-white uppercase">
            Latest Updates
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} className="text-lg text-neutral-400 mt-4">
            Follow our journey and recent milestones.
          </motion.p>
        </div>
        {/* Main timeline container */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto flex flex-col items-center">
          {/* Vertical line - positioned correctly for both mobile and desktop */}
          <motion.div
            className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-indigo-500 origin-top"
            style={{ scaleY }}
          />
          {/* Items container */}
          <div className="w-full flex flex-col items-center">
            {newsData.map((item, index) => (
              <NewsItem key={item.id} item={item} side={index % 2 === 0 ? 'left' : 'right'}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;