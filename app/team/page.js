"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

// --- UPDATED: Using unique backImage paths for each member ---
const teamMembers = [
  { name: "Rahul Kumar Mahato", role: "Lead Developer", image: "/images/rahul_cover.jpg", backImage: "/images/rahul_in.jpeg", bio: "Rahul is the architect of our digital worlds, turning complex ideas into seamless gameplay.", color: "#FACC15", socials: { linkedin: "https://www.linkedin.com/in/rahul-kumar-mahato-36938931a", github: "https://github.com/rahul-240505" } },
  { name: "Narayan Satapathy", role: "3D Artist & UI/UX", image: "/images/narayan_cover.png", backImage: "/images/narayan_in.jpeg", bio: "Narayan brings our visuals to life, sculpting immersive 3D worlds and designing intuitive user interfaces.", color: "#6366F1", socials: { linkedin: "https://www.linkedin.com/in/narayan-satapathy-a242341b3", github: "https://github.com/Narayan69" } },
  { name: "Vivek Kumar", role: "2D Artist", image: "/images/vivek_cover.jpeg", backImage: "/images/vivek_in.jpeg", bio: "Vivek is the master of pixels and palettes, creating stunning concept art and 2D assets that define our games' visual identity.", color: "#F43F5E", socials: { linkedin: "https://www.linkedin.com/in/vivek-kashyap-b24b59295", github: "https://github.com/vivekkashyap17" } },
  { name: "Ayush Sinha", role: "Web Developer", image: "/images/ayush_cover.jpeg", backImage: "/images/ayush_in.jpeg", bio: "Ayush builds our online presence, ensuring our community has a fast, beautiful, and reliable place to connect with us.", color: "#10B981", socials: { linkedin: "https://www.linkedin.com/in/ayush-sinha-70046a319", github: "https://github.com/AyushSinha2603" } },
];

const TeamMemberFlipCard = ({ member, variants }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // This prevents clicks on social links from flipping the card
  const handleFlip = (e) => {
    if (e.target.closest('a')) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div variants={variants} className="w-full">
      <div className="card-container aspect-[2/3] cursor-pointer group" onClick={handleFlip} style={{ perspective: '1000px' }}>
        <motion.div className="card-inner relative w-full h-full" initial={false} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} style={{ transformStyle: "preserve-3d" }}>
          {/* Card Front */}
          <div className="card-front absolute w-full h-full rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-[1.03]" style={{ backfaceVisibility: 'hidden' }}>
            <Image src={member.image} alt={member.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
              <h4 className="text-2xl font-bold">{member.name}</h4>
            </div>
          </div>
          {/* Card Back */}
          <div className="card-back absolute w-full h-full rounded-lg overflow-hidden bg-gray-800 p-6 flex flex-col" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <Image src={member.backImage} alt={member.name} width={96} height={96} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 object-cover" style={{ borderColor: member.color }} />
            <h4 className="text-xl font-bold text-center text-white">{member.name}</h4>
            <p className="text-center mb-4 font-semibold" style={{ color: member.color }}>{member.role}</p>
            <p className="text-gray-300 text-sm text-center flex-grow">{member.bio}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FiLinkedin className="w-6 h-6"/></a>
              <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FiGithub className="w-6 h-6"/></a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TeamPage = () => {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="bg-transparent min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="text-5xl md:text-7xl font-black text-white uppercase"> Meet the Team </motion.h1>
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} className="text-lg text-neutral-400 mt-4"> The creative minds behind SleepyHeads. </motion.p>
        </div>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => ( <TeamMemberFlipCard key={member.name} member={member} variants={itemVariants} /> ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamPage;
