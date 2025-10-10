"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizontalScrollCarousel from "./components/HorizontalScrollCarousel.jsx"; // 1. Add this import back
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const heroProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contentOpacity = useTransform(heroProgress, [0.95, 1], [0, 1]);

  return (
    <main ref={targetRef}>
      <HeroSection scrollYProgress={heroProgress} />
      
      {/* This motion.div now wraps BOTH the About section and the Carousel */}
      <motion.div style={{ opacity: contentOpacity }}>
        <AboutSection />
        <HorizontalScrollCarousel /> {/* 2. Place the carousel here */}
      </motion.div>
    </main>
  );
}