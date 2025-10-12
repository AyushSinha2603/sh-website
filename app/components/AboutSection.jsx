"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  const headline = "SleepyHead Studios";
  const bodyText = "Founded in 2020, our studio is a collective of passionate artists, designers, and engineers dedicated to crafting unforgettable interactive experiences. We believe in the power of play and strive to build games that challenge the mind and touch the heart.";

  // NEW: Variants for the word-by-word reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // The delay between each word
        delayChildren: 0.3,   // A slight delay before the whole animation starts
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        {/* The headline now uses the new word-by-word animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black uppercase mb-8"
        >
          {headline.split(" ").map((word, index) => (
            <motion.span key={index} variants={wordVariants} className="inline-block mr-4">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* The paragraph animation is kept simple for contrast and readability */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }} // Delayed to follow the headline
          className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-300"
        >
          {bodyText}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;