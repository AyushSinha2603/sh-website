"use client";

import { motion } from "framer-motion";
import { FiCode, FiBox, FiPlay } from "react-icons/fi";

const services = [
  { icon: <FiBox className="h-8 w-8 text-neutral-400" />, title: "3D Modeling & Art", description: "From character design to environmental art, we create stunning, optimized 3D assets that bring your game world to life." },
  { icon: <FiPlay className="h-8 w-8 text-neutral-400" />, title: "Game Design & Logic", description: "We craft compelling gameplay loops, level designs, and narratives that engage players and keep them coming back for more." },
  { icon: <FiCode className="h-8 w-8 text-neutral-400" />, title: "Programming & Tools", description: "Our engineers build robust, scalable codebases and custom tools to power innovative gameplay features and ensure a smooth player experience." },
];

const ServicesSection = () => {
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
  const cardVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } } };

  return (
    // Standardized padding
    <section className="bg-transparent text-white py-20">
      <div className="container mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center text-3xl md:text-5xl font-black uppercase mb-16">
          What We Do
        </motion.h2>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }} className="group rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 transition-colors duration-300 hover:border-indigo-500/50">
              <div className="mb-6 inline-block p-4 bg-neutral-950 border border-neutral-700 rounded-xl transition-colors duration-300 group-hover:border-indigo-500/50 group-hover:bg-indigo-900/20">
                {service.icon}
              </div>
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