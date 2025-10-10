"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  const headline = "Forging New Worlds";
  const bodyText = "Founded in 2020, our studio is a collective of passionate artists, designers, and engineers dedicated to crafting unforgettable interactive experiences. We believe in the power of play and strive to build games that challenge the mind and touch the heart.";

  // Animation variants for the container to orchestrate the children's animations
  const sentenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        staggerChildren: 0.04, // Each letter will appear 0.04s after the previous one
      },
    },
  };

  // Animation variants for each individual letter
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // AFTER
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          variants={sentenceVariants}
          initial="hidden"
          whileInView="visible" // Animate when the element comes into view
          viewport={{ once: true }} // Only animate once
          className="text-4xl md:text-6xl font-black uppercase mb-8"
        >
          {headline.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-300"
        >
          {bodyText}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;