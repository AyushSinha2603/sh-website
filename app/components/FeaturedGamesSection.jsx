"use client";

import Link from "next/link";
import Image from "next/image";

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

// --- Game Item Component (alternating layout) ---
const GameItem = ({ game, isReversed }) => {
  const isExternal = game.externalUrl && game.externalUrl !== "#";

  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center mb-16`}>
      {/* Image Side */}
      <div className="w-full md:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={game.image}
            alt={game.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="text-3xl md:text-4xl font-bold text-white">{game.title}</h3>
        <p className="text-sm text-indigo-400 uppercase tracking-wide">{game.genre}</p>
        <p className="text-neutral-300 text-base leading-relaxed">
          {game.description}
        </p>
        <div>
          {isExternal ? (
            <a
              href={game.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Play Now
            </a>
          ) : (
            <Link
              href={`/games/${game.id}`}
              className="inline-block bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Learn More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
const FeaturedGamesSection = () => {
  return (
    <section id="games" className="w-full bg-transparent py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase">Featured Games</h2>
          <p className="text-2xl text-neutral-400 mt-4">A glimpse into our crafted worlds.</p>
        </div>

        {/* Games List - Alternating Layout */}
        <div className="max-w-6xl mx-auto">
          {featuredGamesData.map((game, index) => (
            <GameItem key={game.id} game={game} isReversed={index % 2 !== 0} />
          ))}
        </div>

        {/* View All Games Button */}
        <div className="text-center mt-16">
          <Link href="/games" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors">
            View All Games
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGamesSection;