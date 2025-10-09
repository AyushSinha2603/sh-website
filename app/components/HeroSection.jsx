"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const targetRef = useRef(null);
  
  // Track scroll progress within the targetRef section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"], // Animate from the start of the section to the end
  });

  // --- LOGO ANIMATION ---
  // Fade out the logo as we scroll down (from 0% to 20% of the way)
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // Shrink the logo as we scroll down
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // --- IMAGES ANIMATION ---
  // Move the group of images up as we scroll (from 20% to 80%)
  const imagesY = useTransform(scrollYProgress, [0.2, 0.8], ["50vh", "-50vh"]);

  // Staggered fade-in for each image
  const image1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const image2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const image3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  // --- FINAL FADE OUT ---
  // Fade out the entire sticky container at the end of the animation
  const containerOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: containerOpacity }} className="grid place-content-center h-full">

          {/* LOGO */}
          <motion.div
            style={{ opacity: logoOpacity, scale: logoScale }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white">GameDev Co.</h1>
            <p className="text-neutral-400 mt-4">Scroll to explore</p>
          </motion.div>

          {/* IMAGES */}
          <motion.div 
            style={{ y: imagesY }}
            className="absolute inset-0 flex items-center justify-center gap-8"
          >
            {/* Replace these with your actual game images */}
            <motion.div style={{ opacity: image1Opacity }} className="h-64 w-48 rounded-lg bg-zinc-700" 
              // Example background image:
              // style={{ opacity: image1Opacity, backgroundImage: `url(...)` }}
            />
            <motion.div style={{ opacity: image2Opacity }} className="h-96 w-64 rounded-lg bg-zinc-700" />
            <motion.div style={{ opacity: image3Opacity }} className="h-64 w-48 rounded-lg bg-zinc-700" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;