// app/page.js
"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
// REMOVED: import HorizontalScrollCarousel from "./components/HorizontalScrollCarousel.jsx";
import FeaturedGamesSection from "./components/FeaturedGamesSection.jsx"; // IMPORT New Section
import ServicesSection from "./components/ServicesSection.jsx";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-transparent">
      <div ref={heroRef}>
        <HeroSection>
           <AboutSection heroScrollProgress={heroScrollProgress} />
        </HeroSection>
      </div>

      {/* REPLACED Carousel with Featured Games */}
      <FeaturedGamesSection />

      <ServicesSection />
    </main>
  );
}