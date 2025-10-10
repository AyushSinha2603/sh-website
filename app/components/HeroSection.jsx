"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";

// (The imagesData array and AnimatedImage component remain the same as the last version)
const imagesData = [
  { id: 1, className: "absolute top-[10%] left-[20%] h-48 w-32", start: 0.15, end: 0.25 },
  { id: 2, className: "absolute top-[15%] right-[18%] h-64 w-48", start: 0.20, end: 0.30 },
  { id: 3, className: "absolute bottom-[20%] left-[15%] h-40 w-56", start: 0.25, end: 0.35 },
  { id: 4, className: "absolute bottom-[8%] right-[22%] h-56 w-40", start: 0.30, end: 0.40 },
  { id: 5, className: "absolute top-[45%] left-[45%] h-32 w-32", start: 0.35, end: 0.45 },
  { id: 6, className: "absolute top-[5%] right-[35%] h-40 w-32", start: 0.40, end: 0.50 },
  { id: 7, className: "absolute bottom-[2%] left-[30%] h-48 w-32", start: 0.45, end: 0.55 },
  { id: 8, className: "absolute top-[40%] left-[25%] h-56 w-40", start: 0.50, end: 0.60 },
  { id: 9, className: "absolute bottom-[25%] right-[40%] h-32 w-48", start: 0.55, end: 0.65 },
  { id: 10, className: "absolute top-[10%] right-[50%] h-40 w-28", start: 0.60, end: 0.70 },
  { id: 11, className: "absolute bottom-[45%] left-[40%] h-48 w-32", start: 0.65, end: 0.75 },
  { id: 12, className: "absolute top-[65%] right-[15%] h-40 w-28", start: 0.70, end: 0.80 },
  { id: 13, className: "absolute top-[5%] left-[40%] h-32 w-24", start: 0.75, end: 0.85 },
  { id: 14, className: "absolute bottom-[5%] left-[55%] h-56 w-40", start: 0.80, end: 0.90 },
];

const AnimatedImage = ({ data, scrollYProgress }) => {
  const { start, end, className } = data;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], ["15vh", "0vh"]);
  return <motion.div style={{ opacity, y }} className={`${className} rounded-lg bg-zinc-700`} />;
};

// The main HeroSection component is now much simpler
const HeroSection = ({ scrollYProgress }) => { // It receives scrollYProgress as a prop
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const containerOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  return (
    <div className="relative h-[250vh] bg-neutral-900">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: containerOpacity }} className="relative h-full">
          <motion.div
            style={{ opacity: logoOpacity, scale: logoScale }}
            className="absolute inset-0 grid place-content-center"
          >
            <div className="flex flex-col items-center">
              <Image src="/logo.svg" alt="GameDev Co. Logo" width={400} height={100} className="mb-4" />
              <p className="text-neutral-400">Scroll to explore</p>
            </div>
          </motion.div>
          <div className="absolute inset-0">
            {imagesData.map((img) => (
              <AnimatedImage key={img.id} data={img} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;