"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const cards = [
    // ... (Your card data)
    { url: "/images/game-one.webp", title: "Game One", id: 1, externalUrl: "#" },
    { url: "https://placehold.co/600x400/111111/FFFFFF/png?text=Game+Two", title: "Game Two", id: 2, externalUrl: "#" },
    { url: "https://placehold.co/600x400/222222/FFFFFF/png?text=Game+Three", title: "Game Three", id: 3, externalUrl: "#" },
    { url: "/images/depthlost.webp", title: "Game Four", id: 4, externalUrl: "https://sleepyheadstudios.itch.io/depth-lost-into-the-abyss" },
    { url: "https://placehold.co/600x400/444444/FFFFFF/png?text=Game+Five", title: "Game Five", id: 5, externalUrl: "#" },
    { url: "https://placehold.co/600x400/555555/FFFFFF/png?text=Game+Six", title: "Game Six", id: 6, externalUrl: "#" },
    { url: "https://placehold.co/600x400/666666/FFFFFF/png?text=Game+Seven", title: "Game Seven", id: 7, externalUrl: "#" },
];

const Card = ({ card }) => {
  return (
    <a href={card.externalUrl} target="_blank" rel="noopener noreferrer" key={card.id} className="shrink-0">
      <div style={{ transformPerspective: "800px", transformStyle: "preserve-3d" }} className="group relative h-[400px] w-[300px] md:h-[450px] md:w-[450px] overflow-hidden bg-neutral-200 rounded-lg">
        <motion.div whileHover={{ scale: 1.05, rotateX: 10, rotateY: -5, boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.3)" }} transition={{ type: "spring", stiffness: 350, damping: 20 }} className="relative w-full h-full">
          <div style={{ backgroundImage: `url(${card.url})`, backgroundSize: "cover", backgroundPosition: "center" }} className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
        </motion.div>
      </div>
    </a>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Disable scroll listening on mobile if needed, though CSS will override layout
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]); // Adjusted start to 0%

  return (
    // Section now has responsive height: Tall for desktop scroll, normal height for mobile
    <section ref={targetRef} className="relative h-[300vh] md:h-[300vh] bg-transparent py-16 md:py-0">
      {/* Container is sticky ONLY on medium screens and up */}
      <div className="md:sticky top-0 flex h-auto md:h-screen items-center overflow-hidden">
        {/*
          MOBILE: `overflow-x-auto` enables horizontal scroll, `no-scrollbar` class hides it.
          DESKTOP: `overflow-x-visible` disables horizontal scroll, uses motion.div for animation.
        */}
        <div className="container mx-auto px-6 md:px-0"> {/* Add container for mobile padding */}
          <motion.div
            style={{ x }} // This style is primarily for desktop now
            className="flex gap-4 p-4 md:p-0 overflow-x-auto md:overflow-x-visible no-scrollbar md:no-scrollbar-md" // Added no-scrollbar classes
          >
            {cards.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;