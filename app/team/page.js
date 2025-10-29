"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiTwitter, FiLinkedin, FiGithub, FiRotateCw } from "react-icons/fi";

// --- UPDATED: Using unique backImage paths for each member ---
const teamMembers = [
  { name: "Rahul Kumar Mahato", role: "Lead Developer", image: "/images/rahul_cover.webp", backImage: "/images/rahul_in.jpeg", bio: "Rahul is the architect of our digital worlds, turning complex ideas into seamless gameplay.", color: "#FACC15", socials: { linkedin: "https://www.linkedin.com/in/rahul-kumar-mahato-36938931a", github: "https://github.com/rahul-240505" } },
  { name: "Narayan Satapathy", role: "3D Artist & UI/UX", image: "/images/narayan_cover.webp", backImage: "/images/narayan_in.jpeg", bio: "Narayan brings our visuals to life, sculpting immersive 3D worlds and designing intuitive user interfaces.", color: "#6366F1", socials: { linkedin: "https://www.linkedin.com/in/narayan-satapathy-a242341b3", github: "https://github.com/Narayan69" } },
  { name: "Vivek Kumar", role: "2D Artist", image: "/images/vivek_cover.webp", backImage: "/images/vivek_in.jpeg", bio: "Vivek is the master of pixels and palettes, creating stunning concept art and 2D assets that define our games' visual identity.", color: "#F43F5E", socials: { linkedin: "https://www.linkedin.com/in/vivek-kashyap-b24b59295", github: "https://github.com/vivekkashyap17" } },
  { name: "Ayush Sinha", role: "Web Developer", image: "/images/ayush_cover.webp", backImage: "/images/ayush_in.jpeg", bio: "Ayush builds our online presence, ensuring our community has a fast, beautiful, and reliable place to connect with us.", color: "#10B981", socials: { linkedin: "https://www.linkedin.com/in/ayush-sinha-70046a319", github: "https://github.com/AyushSinha2603" } },
];

const TeamMemberFlipCard = ({ member, variants }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div variants={variants} className="w-full">
      <div 
        className="card-container aspect-[2/3] cursor-pointer group" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: '1000px' }}
      >
        <motion.div 
          className="card-inner relative w-full h-full" 
          initial={false} 
          animate={{ rotateY: isHovered ? 180 : 0 }} 
          transition={{ duration: 0.6, ease: "easeInOut" }} 
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Front */}
          <div 
            className="card-front absolute w-full h-full rounded-lg overflow-hidden shadow-xl" 
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            {/* Flip Icon Indicator */}
            <motion.div 
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <FiRotateCw className="w-5 h-5 text-white" />
            </motion.div>

            {/* Hover Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-indigo-600/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
              <motion.h4 
                className="text-2xl font-bold"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {member.name}
              </motion.h4>
              <motion.p
                className="text-sm mt-2 opacity-0"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
                style={{ color: member.color }}
              >
                {member.role}
              </motion.p>
            </div>
          </div>

          {/* Card Back */}
          <div 
            className="card-back absolute w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col shadow-xl border border-gray-700" 
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <Image 
              src={member.backImage} 
              alt={member.name} 
              width={96} 
              height={96} 
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 object-cover shadow-lg" 
              style={{ borderColor: member.color }} 
            />
            <h4 className="text-xl font-bold text-center text-white">{member.name}</h4>
            <p 
              className="text-center mb-4 font-semibold text-sm" 
              style={{ color: member.color }}
            >
              {member.role}
            </p>
            <p className="text-gray-300 text-sm text-center flex-grow leading-relaxed">
              {member.bio}
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a 
                href={member.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all hover:scale-110"
              >
                <FiLinkedin className="w-6 h-6"/>
              </a>
              <a 
                href={member.socials.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all hover:scale-110"
              >
                <FiGithub className="w-6 h-6"/>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TeamPage = () => {
    const containerVariants = { 
      hidden: { opacity: 0 }, 
      visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
      } 
    };
    const itemVariants = { 
      hidden: { opacity: 0, y: 30 }, 
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
      } 
    };

  return (
    <div className="bg-transparent min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }} 
            className="text-5xl md:text-7xl font-black text-white uppercase"
          > 
            Meet the Team 
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} 
            className="text-lg text-neutral-400 mt-4"
          > 
            The creative minds behind SleepyHead Studios. 
          </motion.p>
        </div>
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {teamMembers.map((member) => ( 
            <TeamMemberFlipCard key={member.name} member={member} variants={itemVariants} /> 
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamPage;