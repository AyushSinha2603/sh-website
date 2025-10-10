"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// --- FINAL RESPONSIVE DATA ARRAY ---
const imagesData = [
    // --- GROUP 1: 7 Images visible on MOBILE, which reposition on DESKTOP ---
    { id: 1,  className: "absolute top-[15%] left-[10%] h-48 w-36 lg:top-[12%] lg:left-[15%]", start: 0.15, end: 0.30 },
    { id: 2,  className: "absolute top-[30%] right-[8%] h-64 w-40 lg:top-[20%] lg:right-[10%]", start: 0.20, end: 0.35 },
    { id: 3,  className: "absolute bottom-[20%] left-[12%] h-40 w-56 lg:bottom-[25%] lg:left-[15%]", start: 0.25, end: 0.40 },
    { id: 4,  className: "absolute bottom-[10%] right-[15%] h-56 w-36 lg:bottom-[15%] lg:right-[12%]", start: 0.30, end: 0.45 },
    { id: 5,  className: "absolute top-[50%] left-1/2 -translate-x-1/2 h-40 w-32", start: 0.40, end: 0.55 },
    { id: 6,  className: "absolute top-[5%] right-[30%] h-40 w-32", start: 0.50, end: 0.65 },
    { id: 7,  className: "absolute bottom-[5%] left-[35%] h-32 w-48", start: 0.55, end: 0.70 },

    // --- GROUP 2: 5 Additional images for DESKTOP ONLY ---
    { id: 8,  className: "hidden lg:block absolute top-[40%] left-[25%] h-56 w-40", start: 0.50, end: 0.60 },
    { id: 9,  className: "hidden lg:block absolute bottom-[25%] right-[40%] h-32 w-48", start: 0.55, end: 0.65 },
    { id: 10, className: "hidden lg:block absolute top-[10%] right-[50%] h-40 w-28", start: 0.60, end: 0.70 },
    { id: 11, className: "hidden lg:block absolute bottom-[45%] left-[40%] h-48 w-32", start: 0.65, end: 0.75 },
    { id: 12, className: "hidden lg:block absolute top-[65%] right-[25%] h-40 w-28", start: 0.70, end: 0.80 },
];

const AnimatedImage = ({ data, scrollYProgress }) => {
  const { start, end, className } = data;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], ["15vh", "0vh"]);
  const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);
  return <motion.div style={{ opacity, y, scale }} className={`${className} rounded-lg bg-zinc-700`} />;
};

const HeroSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const containerOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    // We'll stick with the faster 200vh height
    <section ref={targetRef} className="relative h-[200vh] bg-neutral-900">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: containerOpacity }} className="relative h-full">
          <motion.div
            style={{ opacity: logoOpacity, scale: logoScale }}
            className="absolute inset-0 grid place-content-center"
          >
            <div className="flex flex-col items-center">
              <Image src="/logo.svg" alt="GameDev Co. Logo" width={400} height={100} className="w-[250px] md:w-[400px] h-auto mb-4" />
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
    </section>
  );
};

export default HeroSection;