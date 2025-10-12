// app/components/HeroSection.jsx

"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SECTION_HEIGHT = 1500;

// Internal component for the main background image
const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

// Internal component for the smaller parallax images
const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

// Internal component to hold the parallax images
const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670" alt="Space launch" start={-200} end={200} className="w-1/3" />
      <ParallaxImg src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670" alt="Space launch" start={200} end={-250} className="mx-auto w-2/3" />
      <ParallaxImg src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370" alt="Orbiting satellite" start={-200} end={200} className="ml-auto w-1/3" />
      <ParallaxImg src="https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670" alt="Orbiting satellite" start={0} end={-500} className="ml-24 w-5/12" />
    </div>
  );
};

// This is the main component we will export.
// NOTE: It does NOT accept a `scrollYProgress` prop.
const HeroSection = () => {
  return (
    <div className="bg-zinc-950">
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full"
      >
        <CenterImage />
        <ParallaxImages />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
    </div>
  );
};

export default HeroSection;