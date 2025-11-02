// app/components/HeroSection.jsx
"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
// 1. Import React, useState, and useEffect
import React, { useRef, useState, useEffect } from "react";

// Increased height for slower animation
const SECTION_HEIGHT = 2000;

const HeroSection = ({ children }) => {
  // 2. Add mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 768px is the 'md' breakpoint in Tailwind
    setIsMobile(window.innerWidth < 768);
  }, []);

  // 3. Desktop-only hooks and logic
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
    enabled: !isMobile, // 4. Disable scroll tracking on mobile
  });

  const clipStart = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 0.5], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(scrollYProgress, [0, 0.5], ["100%", "80%"]);
  const imageOpacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);

  // 5. Return the simple mobile layout
  if (isMobile) {
    return (
      <section className="relative w-full h-auto bg-transparent">
        {/* Static Hero Background */}
        <div
          className="h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/website-banner.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "80%", // Use a static size
          }}
        />
        {/* Static, visible children (AboutSection) */}
        <div className="relative z-10">{children}</div>
      </section>
    );
  }

  // 6. Return the original Desktop layout
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
          {/* 7. Pass scrollYProgress to children (AboutSection) */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { heroScrollProgress: scrollYProgress });
            }
            return child;
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;