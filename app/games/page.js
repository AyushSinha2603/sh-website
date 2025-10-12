"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const gamesData = [
  { id: 1, title: "Project Chimera", genre: "Action RPG", image: "https://placehold.co/600x800/1a1a1a/ffffff/png?text=Chimera", hoverImage: "https://placehold.co/600x800/1a1a1a/4f46e5/gif?text=Gameplay!", description: "A thrilling adventure in a world ravaged by mythical beasts." },
  { id: 2, title: "Void Drifter", genre: "Sci-Fi Roguelike", image: "https://placehold.co/600x800/4f46e5/ffffff/png?text=Void", hoverImage: "https://placehold.co/600x800/4f46e5/ffffff/gif?text=Explore!", description: "Navigate treacherous star systems where every run is unique." },
  { id: 3, title: "Echoes of Valor", genre: "Fantasy Strategy", image: "https://placehold.co/600x800/2a2a2a/ffffff/png?text=Echoes", hoverImage: "https://placehold.co/600x800/2a2a2a/4f46e5/gif?text=Conquer!", description: "Lead your armies to victory in a high-fantasy world." },
  { id: 4, title: "Neon Runner", genre: "Cyberpunk Racer", image: "https://placehold.co/600x800/3a3a3a/ffffff/png?text=Neon", hoverImage: "https://placehold.co/600x800/3a3a3a/4f46e5/gif?text=Race!", description: "Speed through futuristic cityscapes in high-octane races." },
  { id: 5, title: "Starfall Chronicles", genre: "Space Opera", image: "https://placehold.co/600x800/4a4a4a/ffffff/png?text=Starfall", hoverImage: "https://placehold.co/600x800/4a4a4a/4f46e5/gif?text=Discover!", description: "An epic story spanning galaxies and generations." },
  { id: 6, title: "The Last Grove", genre: "Cozy Adventure", image: "https://placehold.co/600x800/5a5a5a/ffffff/png?text=Grove", hoverImage: "https://placehold.co/600x800/5a5a5a/4f46e5/gif?text=Relax!", description: "Restore a magical forest and befriend its inhabitants." },
];

const GameCard = ({ game, variants }) => {
  return (
    <motion.div variants={variants}>
      <Link
        href={`/games/${game.id}`}
        className="group block overflow-hidden rounded-lg relative"
        style={{ transformStyle: "preserve-3d", transformPerspective: "1000px" }}
      >
        <motion.div
          whileHover={{ scale: 1.02, rotateX: 7, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative h-[400px] md:h-[500px]"
        >
          <Image src={game.hoverImage} alt={`${game.title} gameplay`} fill className="object-cover" />
          <Image src={game.image} alt={game.title} fill className="object-cover opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-[65%] transition-transform duration-500 group-hover:translate-y-0">
            <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
            <p className="text-sm text-indigo-300 mb-4">{game.genre}</p>
            <p className="text-neutral-300 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">{game.description}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const UpcomingGamesSection = () => {
    return (
        <div className="py-24">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase">In Development</h2>
                <p className="text-lg text-neutral-400 mt-4">A sneak peek at what's coming next.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-neutral-800/50 rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-indigo-400">Project Umbra</h3>
                    <p className="text-neutral-300 mt-2">A narrative-driven stealth game set in a shadowy, ethereal world.</p>
                    <p className="text-sm text-neutral-500 mt-4 font-semibold uppercase">Coming 2026</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="bg-neutral-800/50 rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-indigo-400">Chrono Shift</h3>
                    <p className="text-neutral-300 mt-2">A time-bending puzzle platformer where every second counts.</p>
                    <p className="text-sm text-neutral-500 mt-4 font-semibold uppercase">Coming 2027</p>
                </motion.div>
            </div>
        </div>
    );
};

const GamesPage = () => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="bg-neutral-900 min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="text-5xl md:text-7xl font-black text-white uppercase">
            Our Worlds
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} className="text-lg text-neutral-400 mt-4">
            Explore the games we've passionately crafted.
          </motion.p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {gamesData.map((game) => (
            <GameCard key={game.id} game={game} variants={itemVariants} />
          ))}
        </motion.div>
        <UpcomingGamesSection />
      </div>
    </div>
  );
};

export default GamesPage;