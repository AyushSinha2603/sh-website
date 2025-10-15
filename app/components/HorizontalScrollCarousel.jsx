"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
// REMOVED: We no longer need the Next.js Link component for this
// import Link from "next/link";

const Example = () => {
  return <HorizontalScrollCarousel />;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-42%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 p-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    // CHANGED: Replaced <Link> with a standard <a> tag
    <a
      href={card.externalUrl} // It now points to the external URL
      target="_blank" // This makes the link open in a new tab
      rel="noopener noreferrer" // Important for security with new tabs
      key={card.id}
    >
      <div
        style={{
          transformPerspective: "800px",
          transformStyle: "preserve-3d",
        }}
        className="group relative h-[400px] w-[300px] md:h-[450px] md:w-[450px] overflow-hidden bg-neutral-200 rounded-lg"
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            rotateX: 10,
            rotateY: -5,
            boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.3)",
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 20,
          }}
          className="relative w-full h-full"
        >
          <div
            style={{
              backgroundImage: `url(${card.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
          ></div>
        </motion.div>
      </div>
    </a>
  );
};

export default Example;

// CHANGED: Added the `externalUrl` property to each card object
const cards = [
  { url: "/images/game-one.webp", title: "Game One", id: 1, externalUrl: "#" }, // Replace "#" with your link
  { url: "https://placehold.co/600x400/111111/FFFFFF/png?text=Game+Two", title: "Game Two", id: 2, externalUrl: "#" },
  { url: "https://placehold.co/600x400/222222/FFFFFF/png?text=Game+Three", title: "Game Three", id: 3, externalUrl: "#" },
  { url: "/images/depthlost.webp", title: "Game Four", id: 4, externalUrl: "https://sleepyheadstudios.itch.io/depth-lost-into-the-abyss" },
  { url: "https://placehold.co/600x400/444444/FFFFFF/png?text=Game+Five", title: "Game Five", id: 5, externalUrl: "#" },
  { url: "https://placehold.co/600x400/555555/FFFFFF/png?text=Game+Six", title: "Game Six", id: 6, externalUrl: "#" },
  { url: "https://placehold.co/600x400/666666/FFFFFF/png?text=Game+Seven", title: "Game Seven", id: 7, externalUrl: "#" },
];