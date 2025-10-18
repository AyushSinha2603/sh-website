"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const cards = [
    // ... (Your card data remains the same)
    { url: "/images/game-one.webp", title: "Game One", id: 1, externalUrl: "#" },
    { url: "https://placehold.co/600x400/111111/FFFFFF/png?text=Game+Two", title: "Game Two", id: 2, externalUrl: "#" },
    { url: "https://placehold.co/600x400/222222/FFFFFF/png?text=Game+Three", title: "Game Three", id: 3, externalUrl: "#" },
    { url: "/images/depthlost.webp", title: "Game Four", id: 4, externalUrl: "https://sleepyheadstudios.itch.io/depth-lost-into-the-abyss" },
    { url: "https://placehold.co/600x400/444444/FFFFFF/png?text=Game+Five", title: "Game Five", id: 5, externalUrl: "#" },
    { url: "https://placehold.co/600x400/555555/FFFFFF/png?text=Game+Six", title: "Game Six", id: 6, externalUrl: "#" },
    { url: "https://placehold.co/600x400/666666/FFFFFF/png?text=Game+Seven", title: "Game Seven", id: 7, externalUrl: "#" },
];

const Card = ({ card }) => {
  // ... (Card component remains the same)
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
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Debounce resize handler for performance
    let resizeTimeout;
    const calculateWidths = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (containerRef.current) {
          setScrollWidth(containerRef.current.scrollWidth);
        }
        setWindowWidth(document.documentElement.clientWidth);
      }, 100); // Wait 100ms after resize stops
    };

    // Need timeout to ensure layout is stable after mount
    const initialTimeout = setTimeout(calculateWidths, 100);
    window.addEventListener('resize', calculateWidths);

    // Cleanup function
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', calculateWidths);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // UPDATED: Added a buffer (e.g., 32px for gap-8) to the offset
  const buffer = 32; // Adjust buffer as needed
  const xOffset = Math.max(0, scrollWidth - windowWidth + buffer); // Add buffer here

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${xOffset}px`]);

  return (
    <section ref={targetRef} className="relative h-auto md:h-[200vh] bg-transparent py-24 md:py-0">
      <div className="md:sticky top-0 flex h-auto md:h-screen items-center overflow-hidden">
        {/* Adjusted padding calculation: Use viewport width for container width */}
        <div className="w-screen px-6 md:px-0">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center text-3xl md:text-5xl font-black uppercase mb-12 text-white md:hidden"
            >
                Featured Games
            </motion.h2>
             {/* Make sure the container holding the cards spans the full width needed */}
             {/* Adding px-4 md:px-8 for start/end visual padding if desired */}
            <motion.div
                ref={containerRef}
                style={{ x }}
                className="flex gap-4 md:gap-8 px-4 md:px-8 py-4 md:py-0 overflow-x-auto md:overflow-x-visible no-scrollbar md:no-scrollbar-md"
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