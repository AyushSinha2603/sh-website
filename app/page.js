"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizontalScrollCarousel from "./components/HorizontalScrollCarousel.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";

export default function Home() {
  // The scroll tracking logic is back to orchestrate the transition
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // This progress is for the hero section's animation timeline
  const heroProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]); // Adjusted the mapping for a multi-section page

  // This opacity value is tied to the end of the hero's animation
  const aboutSectionOpacity = useTransform(heroProgress, [0.9, 1], [0, 1]);

  return (
    // The ref is on the main container
    <main ref={targetRef}>
      <HeroSection scrollYProgress={heroProgress} />
      
      {/* We wrap ONLY the AboutSection in the controlled motion.div */}
      <motion.div style={{ opacity: aboutSectionOpacity }}>
        <AboutSection />
      </motion.div>

      {/* The Carousel and Services sections are NOT wrapped,
          so they will use their own 'whileInView' animations as normal. */}
      <HorizontalScrollCarousel />
      <ServicesSection />
    </main>
  );
}