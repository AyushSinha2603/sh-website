"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroSection from "./HeroSection.jsx";
import AboutSection from "./AboutSection.jsx";

export default function HeroAboutWrapper() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={heroRef}>
      <HeroSection>
         <AboutSection heroScrollProgress={heroScrollProgress} />
      </HeroSection>
    </div>
  );
}
