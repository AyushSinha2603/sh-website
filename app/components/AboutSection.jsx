// app/components/AboutSection.jsx
"use client";

import { motion, useTransform } from "framer-motion";

const AboutSection = ({ heroScrollProgress }) => {
  const headline = "SleepyHead Studios";
  const bodyTextOrigin = "SleepyHead Studios started in a dimly lit room fueled by coffee and a shared dream: to create games that we, as players, would love to get lost in. We're a small, passionate team that believes in the power of interactive storytelling and innovative gameplay.";
  const bodyTextMission = "To push the boundaries of indie development, creating polished, engaging, and artistically distinct games. We value our community, transparency in our process, and the simple joy of making something cool.";

  // Fade in the About section between 80-95% of the hero scroll
  // This gives time for the image to fade out first (70-85%)
  const contentOpacity = useTransform(heroScrollProgress, [0.8, 0.95], [0, 1]);
  const contentY = useTransform(heroScrollProgress, [0.8, 0.95], [30, 0]);
  
  // Keep the About section visible - don't fade it out
  // It will naturally scroll away when user scrolls past the hero section

  return (
    <section id="about" className="h-full md:h-screen flex items-center justify-center bg-transparent pointer-events-none">
      <div className="container mx-auto px-6">
        <motion.div
          style={{ 
            opacity: contentOpacity, 
            y: contentY
          }}
          className="max-w-4xl mx-auto text-center pointer-events-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            About <span className="text-indigo-600">SleepyHead Studios</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">The dreamers behind the code.</p>
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