"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Add scroll height for sticky effect
const SCROLL_HEIGHT = 1500; // Adjust this to control how long it stays sticky

// --- Data for the 3 featured games ---
const featuredGamesData = [
  {
    id: 1,
    title: "Red Orbit",
    genre: "Sci-Fi Resource Management Platformer",
    image: "/images/red_orbit.webp", 
    description: "Mine valuable alien minerals, upgrade your equipment, and dodge obstacles in thrilling platforming challenges to deliver your payload for profit. 🚀",
    externalUrl: "https://sleepyheadstudios.itch.io/red-orbit-10"
  },
  {
    id: 2,
    title: "OnTime",
    genre: "Apocalyptic Physics Driver",
    image: "/images/ontime.webp",
    description: "Brave the apocalypse as a pizza delivery driver, balancing precious cargo through chaos to earn your keep. 🍕💥",
    externalUrl: "https://sleepyheadstudios.itch.io/ontime"
  },
  {
    id: 3,
    title: "MedAid",
    genre: "Educational Emergency Simulation",
    image: "/images/medaid.webp",
    description: "Respond to critical emergencies, apply life-saving first aid, and beat the clock in this intense simulation. 🚑⏱️",
    externalUrl: "https://sleepyheadstudios.itch.io/medaid"
  },
];

// --- Reusable Game Card Component ---
const FeaturedGameCard = ({ game, variants }) => {
  const isExternal = game.externalUrl && game.externalUrl !== "#";
  const LinkComponent = isExternal ? motion.a : motion(Link);

  return (
    <motion.div variants={variants}>
      <LinkComponent
        href={isExternal ? game.externalUrl : `/games/${game.id}`}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        className="group block overflow-hidden rounded-lg relative"
        style={{ transformStyle: "preserve-3d", transformPerspective: "1000px" }}
        whileHover={{ scale: 1.02, rotateX: 7, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div className="relative aspect-[3/4] md:aspect-[4/5]">
          {/* Background Hover Image/GIF */}
          <Image
            src={game.hoverImage || game.image}
            alt={`${game.title} preview`}
            fill
            className="object-cover"
          />
          {/* Foreground Poster Image - Fades out on hover */}
          <Image
            src={game.image}
            alt={game.title}
            fill
            className="object-cover opacity-100 transition-opacity duration-500 group-hover:opacity-0"
          />
          {/* Info Panel */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent translate-y-[70%] md:translate-y-[65%] transition-transform duration-500 group-hover:translate-y-0">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{game.title}</h3>
            <p className="text-xs md:text-sm text-indigo-300 mb-2 md:mb-4">{game.genre}</p>
            <p className="text-neutral-300 text-xs md:text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {game.description}
            </p>
          </div>
        </div>
      </LinkComponent>
    </motion.div>
  );
};

// --- Main Section Component ---
const FeaturedGamesSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Content is immediately visible (no fade in from 0)
  // Just keep it at full opacity throughout
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 0]);

  // Animation variants for staggering cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section 
      ref={targetRef}
      id="games" 
      style={{ height: `calc(${SCROLL_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-transparent"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center">
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="w-full py-20"
        >
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase">Featured Games</h2>
              <p className="text-lg text-neutral-400 mt-4">A glimpse into our crafted worlds.</p>
            </motion.div>

            {/* 3-Column Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
            >
              {featuredGamesData.map((game) => (
                <FeaturedGameCard key={game.id} game={game} variants={itemVariants} />
              ))}
            </motion.div>

            {/* Optional "View All Games" Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-16"
            >
              <Link href="/games" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">
                View All Games
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGamesSection;