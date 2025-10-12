"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

const teamMembers = [
  { name: "Ayush Sinha", role: "Web Developer", image: "https://placehold.co/500x500/1a1a1a/ffffff/png?text=AS", bio: "The architect of our digital presence, Ayush combines cutting-edge web technology with a keen eye for design, ensuring our worlds are accessible and performant on every screen.", socials: { twitter: "#", linkedin: "#", github: "#" } },
  { name: "Friend One", role: "Game Developer", image: "https://placehold.co/500x500/4f46e5/ffffff/png?text=GD", bio: "The heart of our gameplay, turning complex ideas into interactive reality. With a passion for elegant code and compelling mechanics, they build the engines that power our adventures.", socials: { twitter: "#", linkedin: "#", github: "#" } },
  { name: "Friend Two", role: "3D Artist", image: "https://placehold.co/500x500/2a2a2a/ffffff/png?text=3D", bio: "A master of form and dimension, they sculpt the characters, creatures, and environments that make our games immersive. Every polygon is placed with purpose and artistry.", socials: { twitter: "#", linkedin: "#", github: "#" } },
  { name: "Friend Three", role: "2D Artist & Illustrator", image: "https://placehold.co/500x500/3a3a3a/ffffff/png?text=2D", bio: "The visionary behind our visual identity. From concept sketches to final UI elements, they paint the mood and style of our worlds, ensuring every frame is a work of art.", socials: { twitter: "#", linkedin: "#", github: "#" } },
];

const TeamMemberRow = ({ member, imageOnLeft }) => {
  const imageVariants = { hidden: { opacity: 0, x: imageOnLeft ? -50 : 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } } };
  const textVariants = { hidden: { opacity: 0, x: imageOnLeft ? 50 : -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } } };

  return (
    <div className={`flex flex-col ${imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 mb-20`}>
      <motion.div variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="w-full md:w-1/3">
        {/* NEW & CHANGED: Added 'group' and 'overflow-hidden' classes */}
        <div className="relative aspect-square rounded-lg overflow-hidden group">
          <Image
            src={member.image}
            alt={member.name}
            fill
            // NEW & CHANGED: Added classes for the grayscale effect and hover transition
            className="rounded-lg object-cover grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>
      </motion.div>

      <motion.div variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="w-full md:w-2/3">
        <h3 className="text-3xl font-bold text-white mb-2">{member.name}</h3>
        <p className="text-xl text-indigo-400 font-semibold mb-4">{member.role}</p>
        <p className="text-neutral-300 mb-6">{member.bio}</p>
        <div className="flex gap-5 text-2xl text-neutral-400">
          <a href={member.socials.twitter} className="hover:text-white transition-colors"><FiTwitter /></a>
          <a href={member.socials.linkedin} className="hover:text-white transition-colors"><FiLinkedin /></a>
          <a href={member.socials.github} className="hover:text-white transition-colors"><FiGithub /></a>
        </div>
      </motion.div>
    </div>
  );
};

const TeamPage = () => {
  return (
    <div className="bg-neutral-900 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="text-5xl md:text-7xl font-black text-white uppercase">
            Meet the Team
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} className="text-lg text-neutral-400 mt-4">
            The creative minds behind SleepyHeads.
          </motion.p>
        </div>
        <div className="max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMemberRow key={member.name} member={member} imageOnLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;