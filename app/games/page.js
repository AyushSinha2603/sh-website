"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
// Removed social icons import as it's not needed here

// --- COMBINED GAME DATA (Featured + New) ---
const allGamesData = [
  // First 3 (Featured)
  {
    id: 1,
    title: "Red Orbit",
    genre: "Sci-Fi Resource Management Platformer",
    image: "/images/red_orbit.webp",
    hoverImage: null, // Add hover image path if you have one
    description: "Mine valuable alien minerals, upgrade equipment, and dodge obstacles in thrilling platforming challenges to deliver your payload for profit. 🚀",
    externalUrl: "https://sleepyheadstudios.itch.io/red-orbit-10"
  },
  {
    id: 2,
    title: "OnTime",
    genre: "Apocalyptic Physics Driver",
    image: "/images/ontime.webp",
    hoverImage: null, // Add hover image path if you have one
    description: "Brave the apocalypse as a pizza delivery driver, balancing precious cargo through chaos to earn your keep. 🍕💥",
    externalUrl: "https://sleepyheadstudios.itch.io/ontime"
  },
  {
    id: 3,
    title: "MedAid",
    genre: "Educational Emergency Simulation",
    image: "/images/medaid.webp",
    hoverImage: null, // Add hover image path if you have one
    description: "Respond to critical emergencies, apply life-saving first aid, and beat the clock in this intense simulation. 🚑⏱️",
    externalUrl: "https://sleepyheadstudios.itch.io/medaid"
  },
  // New Games
  {
    id: 4,
    title: "Aurat",
    genre: "Supernatural Horror Mystery", // Generated genre
    image: "/images/aurat.webp", // Placeholder image
    // hoverImage: "https://placehold.co/600x800/6b21a8/ffffff/gif?text=Fear!", // Placeholder hover
    description: "Uncover the truth behind a vengeful spirit haunting a town during its annual festival before more lives vanish.",
    externalUrl: "https://sleepyheadstudios.itch.io/aurat"
  },
  {
    id: 5,
    title: "EcoBuilder",
    genre: "Sustainable Development Sim", // Generated genre
    image: "/images/ecobuilder.webp", // Placeholder image
    // hoverImage: "https://placehold.co/600x800/16a34a/ffffff/gif?text=Build!", // Placeholder hover
    description: "Balance economic growth, environmental care, and social equity in this educational simulation about sustainable choices.",
    externalUrl: "https://sleepyheadstudios.itch.io/ecobuilder"
  },
  {
    id: 6,
    title: "Chrono Warfare",
    genre: "Sci-Fi Time Travel Shooter", // Generated genre
    image: "/images/chrono.webp", // Placeholder image
    // hoverImage: "https://placehold.co/600x800/dc2626/ffffff/gif?text=Fight!", // Placeholder hover
    description: "Travel to the future to destroy the energy reactor controlling apocalyptic robots invading the past.",
    externalUrl: "https://sleepyheadstudios.itch.io/chrono-warfare"
  },
  {
    id: 7, // Updated ID to match carousel
    title: "Depth Lost: Into the Abyss",
    genre: "Underwater Exploration Survival", // Generated genre
    image: "/images/depthlost.webp", // Using your existing image
    hoverImage: null, // Add hover image path if you have one
    description: "Explore deeper into a mysterious abyss, encountering deadly creatures and ancient civilizations while trying to find a way out.",
    externalUrl: "https://sleepyheadstudios.itch.io/depth-lost-into-the-abyss"
  },
];


// --- Game Card Component (Using the same style) ---
const GameCard = ({ game, variants }) => {
  const isExternal = game.externalUrl && game.externalUrl !== "#";
  // Always use motion.a for this page as all links go to Itch.io
  const LinkComponent = motion.a;

  return (
    <motion.div variants={variants}>
      <LinkComponent
        href={game.externalUrl} // Link to external Itch.io page
        target="_blank" // Open in new tab
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-lg relative"
        style={{ transformStyle: "preserve-3d", transformPerspective: "1000px" }}
        whileHover={{ scale: 1.02, rotateX: 7, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div
          className="relative aspect-[3/4] md:aspect-[4/5]"
        >
          {/* Background Hover Image/GIF */}
          <Image
            src={game.hoverImage || game.image} // Use hoverImage if available
            alt={`${game.title} preview`}
            fill
            className="object-cover"
            unoptimized={game.hoverImage?.endsWith('.gif')} // Disable optimization for GIFs
          />
          {/* Foreground Poster Image */}
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


const GamesPage = () => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    // Keep background transparent
    <div className="bg-transparent min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-5xl md:text-7xl font-black text-white uppercase"
          >
            Our Worlds
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className="text-lg text-neutral-400 mt-4"
          >
            Explore the games we've passionately crafted.
          </motion.p>
        </div>

        {/* Games Grid - Now displays all 7 games */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {allGamesData.map((game) => (
            <GameCard key={game.id} game={game} variants={itemVariants} />
          ))}
        </motion.div>

        {/* Removed UpcomingGames/Connect section */}

      </div>
    </div>
  );
};

export default GamesPage;