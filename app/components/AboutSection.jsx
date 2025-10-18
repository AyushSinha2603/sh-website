// app/components/AboutSection.jsx
"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  const headline = "SleepyHead Studios";
  const bodyText = "Founded in 2020, our studio is a collective of passionate artists, designers, and engineers dedicated to crafting unforgettable interactive experiences. We believe in the power of play and strive to build games that challenge the mind and touch the heart.";

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3, }, }, };
  const wordVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }, };

  return (
    // UPDATED: Reduced vertical padding on all screen sizes
    <section id="about" className="bg-transparent py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            About <span className="text-indigo-500">SleepyHead</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">The dreamers behind the code.</p>
          <div className="mt-12 text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">Our Origin Story</h3>
              <p className="text-gray-300 leading-relaxed">
                SleepyHead Studios started in a dimly lit room fueled by coffee and a shared dream: to create games that we, as players, would love to get lost in. We're a small, passionate team that believes in the power of interactive storytelling and innovative gameplay.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To push the boundaries of indie development, creating polished, engaging, and artistically distinct games. We value our community, transparency in our process, and the simple joy of making something cool.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;