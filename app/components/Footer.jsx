"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiTwitter, FiYoutube, FiInstagram, FiArrowRight } from "react-icons/fi";
import emailjs from '@emailjs/browser';

const Footer = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatusMessage("Sending...");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setStatusMessage("Message sent successfully!");
          e.target.reset(); // Clear the form
        },
        (error) => {
          console.log("FAILED...", error.text);
          setStatusMessage("Failed to send message.");
        }
      );
  };
  
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } } };

  return (
    // ADD THIS ID to the footer tag
    <footer id="contact-section" className="bg-neutral-950 text-white py-10 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 25px 25px, #4f46e5 2%, transparent 0%), radial-gradient(circle at 75px 75px, #4f46e5 2%, transparent 0%)`, backgroundSize: `100px 100px` }}/>
        
        <div className="container mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black">Let's Build the <span className="text-indigo-400">Next Big Thing</span></h2>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-3 gap-10"
            >
                <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                        <input type="email" name="from_email" placeholder="Your Email" required className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <textarea name="message" placeholder="Your Message" required rows={4} className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <button type="submit" className="w-full bg-indigo-600 rounded-md py-3 text-sm font-semibold transition-colors hover:bg-indigo-500 flex items-center justify-center gap-2">Send Message <FiArrowRight /></button>
                        {statusMessage && <p className="text-sm text-center mt-2">{statusMessage}</p>}
                    </form>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-neutral-400">
                        <li><a href="/games" className="hover:text-indigo-400 transition-colors">Games</a></li>
                        <li><a href="/team" className="hover:text-indigo-400 transition-colors">Team</a></li>
                        <li><a href="/news" className="hover:text-indigo-400 transition-colors">News</a></li>
                    </ul>
                </motion.div>

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

            <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-sm text-neutral-500">
                <p>&copy; {new Date().getFullYear()} SleepyHeads. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;