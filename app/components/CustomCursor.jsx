"use client";

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Use separate MotionValues for the two elements
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const outlineX = useMotionValue(-100);
  const outlineY = useMotionValue(-100);

  // Snappy spring for the dot, gentle spring for the outline
  const springConfig = { damping: 25, stiffness: 700 };
  const outlineSpringConfig = { damping: 30, stiffness: 150 };

  const dotXSpring = useSpring(dotX, springConfig);
  const dotYSpring = useSpring(dotY, springConfig);
  const outlineXSpring = useSpring(outlineX, outlineSpringConfig);
  const outlineYSpring = useSpring(outlineY, outlineSpringConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      outlineX.set(e.clientX);
      outlineY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    window.addEventListener('mousemove', moveCursor);
    
    // Attach listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [dotX, dotY, outlineX, outlineY]);

  // Animation variants for the outer glow
  const outlineVariants = {
    default: { scale: 1, opacity: 0.3 },
    hover: { scale: 1.5, opacity: 0.5 },
  };

  return (
    <>
      {/* The Outer Glow "Aurora" */}
      <motion.div
        className="fixed w-10 h-10 bg-indigo-500 rounded-full pointer-events-none z-[9999] blur-lg" // The blur effect is key
        style={{
          translateX: outlineXSpring,
          translateY: outlineYSpring,
          x: "-50%",
          y: "-50%",
        }}
        variants={outlineVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      {/* The Inner Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: dotXSpring,
          translateY: dotYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
    </>
  );
};

export default CustomCursor;