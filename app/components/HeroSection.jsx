"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

const SECTION_HEIGHT = 800;

// Update HeroSection to accept children
const HeroSection = ({ children }) => { // Ensure children is accepted here
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const clipStart = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 1], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["100%", "80%"]);
  const imageOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]); // Fades image out

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
          className="absolute inset-0 bg-cover bg-center" // Absolute positioning
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
        {/* Position absolutely, ensure z-index */}
        <div className="absolute inset-0 z-10">
            {children} {/* Make sure this line exists */}
        </div>

      </div>
       {/* Gradient removed previously */}
       {/* Scroll Indicator removed previously */}
    </section>
  );
};

export default HeroSection;