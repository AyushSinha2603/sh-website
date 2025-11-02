// app/components/AboutSection.jsx
"use client";

import { motion, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const AboutSection = ({ heroScrollProgress }) => {
  const headline = "SleepyHead Studios";
  const bodyTextOrigin = "SleepyHead Studios started in a dimly lit room fueled by coffee and a shared dream: to create games that we, as players, would love to get lost in. We're a small, passionate team that believes in the power of interactive storytelling and innovative gameplay.";
  const bodyTextMission = "To push the boundaries of indie development, creating polished, engaging, and artistically distinct games. We value our community, transparency in our process, and the simple joy of making something cool.";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // --- 1. Call hooks UNCONDITIONALLY ---
  // These hooks will now run on every render, satisfying the Rules of Hooks.
  const contentOpacityDesktop = useTransform(heroScrollProgress, [0.8, 0.95], [0, 1]);
  const contentYDesktop = useTransform(heroScrollProgress, [0.8, 0.95], [30, 0]);
  
  // --- 2. Use the RESULTS conditionally ---
  // We assign the static value (1 or 0) OR the motion value from the hook.
  const contentOpacity = (isMobile || !heroScrollProgress) ? 1 : contentOpacityDesktop;
  const contentY = (isMobile || !heroScrollProgress) ? 0 : contentYDesktop;

  // 3. Conditionally set styles and classes
  const motionStyle = { opacity: contentOpacity, y: contentY }; // Apply the combined style
  const sectionClasses = isMobile ? "h-auto py-24" : "h-full md:h-screen flex items-center justify-center";
  const pointerEventsClass = isMobile ? "pointer-events-auto" : "pointer-events-none";


  return (
    <section id="about" className={`${sectionClasses} bg-transparent ${pointerEventsClass}`}>
      <div className="container mx-auto px-6">
        <motion.div
          style={motionStyle} // 4. Apply the conditional style
          className="max-w-4xl mx-auto text-center pointer-events-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            About <span className="text-indigo-600">SleepyHead Studios</span>
          </h2>
          <p className="mt-4 text-2xl text-gray-400">The dreamers behind the code.</p>
          <div className="mt-12 text-left space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Origin Story</h3>
              <p className="text-gray-300 leading-relaxed">
                {bodyTextOrigin}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                {bodyTextMission}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;