"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiMail, FiX, FiArrowRight } from "react-icons/fi";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, setIsOpen }) => {
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
          e.target.reset();
          setTimeout(() => {
              setIsOpen(false);
              setStatusMessage(""); // Reset status after closing
          }, 2000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setStatusMessage("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-neutral-900/40 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 text-white p-8 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden border border-neutral-800"
          >
            {/* Close button added */}
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-20">
                <FiX size={24}/>
            </button>
            <div className="relative z-10">
              <div className="text-center mb-6">
                 <div className="bg-indigo-600 w-16 h-16 mb-4 rounded-full text-3xl grid place-items-center mx-auto">
                    <FiMail />
                 </div>
                <h3 className="text-3xl font-bold mb-2">Get in Touch</h3>
                <p className="text-neutral-400">We'd love to hear from you!</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                <input
                    type="email"
                    name="from_email" // Ensure this matches your EmailJS template variable
                    placeholder="Your Email"
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                    name="message" // Ensure this matches your EmailJS template variable
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 rounded-md py-3 font-semibold transition-colors hover:bg-indigo-500 flex items-center justify-center gap-2"
                >
                    Send Message <FiArrowRight />
                </button>
                {statusMessage && <p className="text-sm text-center mt-2 text-neutral-400">{statusMessage}</p>}
              </form>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;