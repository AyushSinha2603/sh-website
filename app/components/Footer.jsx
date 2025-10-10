"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiTwitter, FiYoutube, FiInstagram, FiArrowRight } from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${email}! We'll be in touch.`);
    setEmail("");
    setMessage("");
  };
  
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <footer className="bg-neutral-950 text-white py-24 px-6 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 z-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #4f46e5 2%, transparent 0%), radial-gradient(circle at 75px 75px, #4f46e5 2%, transparent 0%)`,
            backgroundSize: `100px 100px`
        }}/>
        
        <div className="container mx-auto relative z-10">
            {/* Section 1: Main Headline */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-black">Let's Build the <span className="text-indigo-400">Next Big Thing</span></h2>
            </motion.div>

            {/* Section 2: Three-Column Grid */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-3 gap-12"
            >
                {/* Column 1: Contact Form */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            required
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            required
                            rows={4}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 rounded-md py-3 text-sm font-semibold transition-colors hover:bg-indigo-500 flex items-center justify-center gap-2"
                        >
                            Send Message <FiArrowRight />
                        </button>
                    </form>
                </motion.div>

                {/* Column 2: Quick Links */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-neutral-400">
                        <li><a href="/games" className="hover:text-indigo-400 transition-colors">Games</a></li>
                        <li><a href="/studio" className="hover:text-indigo-400 transition-colors">Studio</a></li>
                        <li><a href="/careers" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                        <li><a href="/blog" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                    </ul>
                </motion.div>

                {/* Column 3: Social Media */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <p className="text-neutral-400 mb-6">Join our community and stay updated on our latest projects.</p>
                    <div className="flex gap-6 text-2xl text-neutral-400">
                        <a href="#" className="hover:text-indigo-400 transition-colors"><FiTwitter /></a>
                        <a href="#" className="hover:text-indigo-400 transition-colors"><FiYoutube /></a>
                        <a href="#" className="hover:text-indigo-400 transition-colors"><FiInstagram /></a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Section 3: Copyright */}
            <div className="border-t border-neutral-800 mt-16 pt-8 text-center text-sm text-neutral-500">
                <p>&copy; {new Date().getFullYear()} GameDev Co. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;