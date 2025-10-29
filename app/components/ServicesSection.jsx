"use client";

import { motion } from "framer-motion";
import { FiCode, FiBox, FiPlay } from "react-icons/fi";
import StyleDigits from "./StyleDigits.jsx"; // 1. Import StyleDigits

const services = [
  { icon: FiBox, title: "3D Modeling & Art", description: "From character design to environmental art, we create stunning, optimized 3D assets that bring your game world to life." },
  { icon: FiPlay, title: "Game Design & Logic", description: "We craft compelling gameplay loops, level designs, and narratives that engage players and keep them coming back for more." },
  { icon: FiCode, title: "Programming & Tools", description: "Our engineers build robust, scalable codebases and custom tools to power innovative gameplay features and ensure a smooth player experience." },
];

const ServicesSection = () => {
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
  const cardVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } } };

  // Hover variants for the card
  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.03,
      // Slightly lighter dark gradient on hover for subtle shift
      background: "linear-gradient(to bottom right, rgba(30, 30, 30, 0.85), rgba(20, 20, 20, 0.9))",
      borderColor: "rgba(99, 102, 241, 0.4)", // Keep indigo border glow
      boxShadow: "0 0 25px rgba(99, 102, 241, 0.15)", // Keep subtle indigo outer glow
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    initial: {
      y: 0,
      scale: 1,
       // UPDATED: Darker, more neutral semi-transparent gradient
      background: "linear-gradient(to bottom right, rgba(15, 15, 15, 0.7), rgba(25, 25, 25, 0.8))", // Was gray-900/80 to gray-800/80
      borderColor: "rgba(55, 65, 81, 0.5)", // neutral-700/50 default border
      boxShadow: "none",
      transition: { duration: 0.3 }
    }
  };

  const iconContainerVariants = {
    hover: { borderColor: "rgba(99, 102, 241, 0.7)", backgroundColor: "rgba(99, 102, 241, 0.15)", scale: 1.1 },
    initial: { borderColor: "#374151", backgroundColor: "rgba(3, 7, 18, 0.5)", scale: 1 }
  };

  const iconVariants = {
     hover: { color: "#818cf8" }, // Indigo-400
     initial: { color: "#9ca3af" } // neutral-400
  };

  return (
    <section className="bg-transparent text-white py-20 ">
      <div className="container mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center text-3xl md:text-5xl font-black uppercase mb-16">
          {/* 2. Wrap heading text */}
          <StyleDigits>What We Do</StyleDigits>
        </motion.h2>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{ ...cardVariants, ...cardHoverVariants }}
              initial="initial"
              whileInView="visible"
              whileHover="hover"
              className="group rounded-xl border p-8 cursor-pointer overflow-hidden backdrop-blur-sm"
            >
              <motion.div variants={iconContainerVariants} transition={{ duration: 0.3 }} className="mb-6 inline-block p-4 border rounded-xl">
                <motion.div variants={iconVariants}>
                   <service.icon className="h-8 w-8" />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4">
                {/* 2. Wrap heading text */}
                <StyleDigits>{service.title}</StyleDigits>
              </h3>
              <p className="text-neutral-300">
                {/* 2. Wrap paragraph text (optional, but good for consistency if they ever have digits) */}
                <StyleDigits>{service.description}</StyleDigits>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

