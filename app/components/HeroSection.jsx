"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

// Increased height for slower animation (was 800, now 4000)
const SECTION_HEIGHT = 2000;

// Update HeroSection to accept children
const HeroSection = ({ children }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Slow down the animation by using only the first 50% of scroll for the main animation
  // The last 50% will keep the final state sticky
  const clipStart = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 0.5], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(scrollYProgress, [0, 0.5], ["100%", "80%"]);
  
  // Fade out the image between 70-85% to make room for About section
  const imageOpacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);

  return (
    <section
      ref={targetRef}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-transparent"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Animated Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            clipPath: clipPath,
            backgroundSize: backgroundSize,
            opacity: imageOpacity,
            backgroundImage: "url('/images/website-banner.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Render children (About Section content) ON TOP */}
        <div className="absolute inset-0 z-10">
            {children}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;