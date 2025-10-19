"use client";

import { motion } from "framer-motion";
import Link from "next/link"; // Ensure Link is imported
import Image from "next/image";

// --- Data for the 3 featured games ---
const featuredGamesData = [
  {
    id: 1,
    title: "Red Orbit", // Updated Title
    genre: "Sci-Fi Resource Management Platformer", // Updated Genre
    image: "/images/red_orbit.webp", 
    // hoverImage: "https://placehold.co/600x800/F43F5E/ffffff/gif?text=Gameplay!", // Placeholder - Replace
    description: "Mine valuable alien minerals, upgrade your equipment, and dodge obstacles in thrilling platforming challenges to deliver your payload for profit. 🚀",
    externalUrl: "https://sleepyheadstudios.itch.io/red-orbit-10"
  },
  {
    id: 2,
    title: "OnTime", // Updated Title
    genre: "Apocalyptic Physics Driver", // Updated Genre
    image: "/images/ontime.webp", // Placeholder - Replace
    // hoverImage: "https://placehold.co/600x800/4f46e5/ffffff/gif?text=Solve!", // Placeholder - Replace
    description: "MBrave the apocalypse as a pizza delivery driver, balancing precious cargo through chaos to earn your keep. 🍕💥",
    externalUrl: "https://sleepyheadstudios.itch.io/ontime"
  },
  {
    id: 3,
    title: "MedAid", // Updated Title
    genre: "Educational Emergency Simulation", // Updated Genre
    image: "/images/medaid.webp", // Placeholder - Replace
    // hoverImage: "https://placehold.co/600x800/10B981/ffffff/gif?text=Heal!", // Placeholder - Replace
    description: "Respond to critical emergencies, apply life-saving first aid, and beat the clock in this intense simulation. 🚑⏱️",
    externalUrl: "https://sleepyheadstudios.itch.io/medaid"
  },
];

// --- Reusable Game Card Component ---
const FeaturedGameCard = ({ game, variants }) => {
  const isExternal = game.externalUrl && game.externalUrl !== "#";
  // Use motion.a for external links, motion(Link) for internal
  const LinkComponent = isExternal ? motion.a : motion(Link);

  return (
    <motion.div variants={variants}>
      <LinkComponent
        href={isExternal ? game.externalUrl : `/games/${game.id}`} // Use correct href based on type
        target={isExternal ? "_blank" : "_self"} // Open external in new tab
        rel={isExternal ? "noopener noreferrer" : ""}
        className="group block overflow-hidden rounded-lg relative"
        style={{ transformStyle: "preserve-3d", transformPerspective: "1000px" }}
        // Pass Framer Motion props directly to motion component
        whileHover={{ scale: 1.02, rotateX: 7, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div // Keep div for aspect ratio and structure
          className="relative aspect-[3/4] md:aspect-[4/5]"
        >
          {/* Background Hover Image/GIF */}
          <Image
            src={game.hoverImage || game.image} // Fallback to main image if no hoverImage
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
            {/* Description only revealed fully on hover */}
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
    <section id="games" className="bg-transparent py-20"> {/* Standardized Padding */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" // Grid layout
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
            transition={{ duration: 0.8, delay: 0.5 }} // Delay after cards animate
            className="text-center mt-16"
         >
            {/* This Link requires the import */}
            <Link href="/games" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">
                View All Games
            </Link>
         </motion.div>

      </div>
    </section>
  );
};

export default FeaturedGamesSection;