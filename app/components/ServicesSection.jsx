"use client";

import { motion } from "framer-motion";
import { FiCode, FiBox, FiPlay } from "react-icons/fi";

const services = [
  {
    icon: <FiBox className="text-4xl text-indigo-400" />,
    title: "3D Modeling & Art",
    description: "From character design to environmental art, we create stunning, optimized 3D assets that bring your game world to life.",
  },
  {
    icon: <FiPlay className="text-4xl text-indigo-400" />,
    title: "Game Design & Logic",
    description: "We craft compelling gameplay loops, level designs, and narratives that engage players and keep them coming back for more.",
  },
  {
    icon: <FiCode className="text-4xl text-indigo-400" />,
    title: "Programming & Tools",
    description: "Our engineers build robust, scalable codebases and custom tools to power innovative gameplay features and ensure a smooth player experience.",
  },
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // This will animate children one by one with a 0.2s delay
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <section className="bg-neutral-900 text-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-3xl md:text-5xl font-black uppercase mb-16"
        >
          What We Do
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-neutral-800/50 p-8 rounded-lg border border-neutral-700 text-center"
            >
              <div className="mb-6 inline-block">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-neutral-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;