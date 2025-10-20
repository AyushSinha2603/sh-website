// app/news/page.js
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const newsData = [
  { id: 1, title: "Red Orbit Blasts Off: Closed Testing Now Live on Play Store! 🎮", date: "October 2025", description: "Our space platformer, Red Orbit, officially enters closed testing on the Play Store! We gather vital feedback to fine-tune mechanics and polish the experience before the public release." },
  { id: 2, title: "New Project Underway: BYOG 2025 Idea Enters Full Development! 💡", date: "October 2025", description: "Following BYOG 2025, we start full development on a thrilling new game concept that proved too ambitious for the jam's deadline. We commit to continuous updates on this next major release." },
  { id: 3, title: "Vlog Series Launch: IGDC 2024 Experience, Part 1 is Live! 🎬", date: "June 2025", description: "We release Part 1 of the IGDC 2024 Vlog Series! This first episode focuses on our pre-IGDC journey, sharing the team's excitement of travel and reaching the grand venue." },
  { id: 4, title: "Demo Drop: Red Orbit Launches Public Demo! 🪐", date: "May 2025", description: "We release the public demo for Red Orbit, developed in just 15 days! This fast-paced space platformer challenges players to hop between platforms and efficiently deliver valuable minerals for profit." },
  { id: 5, title: "First Jam of 2025: OnTime Delivers Post-Apocalyptic Pizza! 🍕", date: "January 2025", description: "We develop OnTime, a post-apocalyptic pizza delivery game, during the Devfest 4.0 game jam. This project highlights our ability to create engaging, humorous narratives in short sprints." },
  { id: 6, title: "Level Up: SleepyHead Studios Advances in XR Creator Hackathon! 🌐", date: "December 2024", description: "We advance to the second round of the XR Creator Hackathon (WAVES 2025). This milestone provides a key opportunity to build a working prototype of our Extended Reality idea." },
  { id: 7, title: "A New Level Unlocked: SleepyHead Studios Attends IGDC 2024! 🤝", date: "November 2024", description: "SleepyHead Studios attends its first major event, IGDC 2024! Meeting industry leaders and seeing leading games offers tremendous motivation to create more impactful and fun titles." },
  { id: 8, title: "Impactful Design: MedAid Teaches First Aid Through Gameplay! ⛑️", date: "October 2024", description: "Our successful hackathon build, MedAid, launches as an educational training simulator. The game teaches players essential first-aid knowledge, demonstrating our commitment to impactful, real-world design." },
  { id: 9, title: "Launching Aurat: Horror Game Enters IGDC Awards Submission! 👻", date: "September 2024", description: "We launch the horror game Aurat, a Bollywood-inspired thriller submitted to the IGDC Awards 2024. This title showcases our versatility in blending local culture with terrifying gameplay." },
  { id: 10, title: "HackINNO Victory: Eco-Builder Wins IntraNITR Hackathon! 🥇", date: "September 2024", description: "We win the intraNITR HackINNO with Eco-Builder, a city-building simulator addressing sustainable development. The game showcases how strategic decisions impact a city's ecological health." },
  { id: 11, title: "First Place Victory: Chrono Warfare Dominates IGDC Game Connect! 🏆", date: "June 2024", description: "Chrono Warfare dominates the IGDC Game Connect at IITM Tech Meet 12.0, securing First Place! This major victory awards the team free tickets to attend IGDC 2024, boosting our industry commitment." },
  { id: 12, title: "Shining on Debut: DEPTH: Lost Into The Abyss Excels in First Game Jam! ✨", date: "December 2023", description: "Our debut game, DEPTH: Lost Into The Abyss, excels in its first jam, winning 3rd place in Graphics and 9th overall. This early success validates our core strength in visual excellence and fun gameplay." },
  { id: 13, title: "Wake Up and Play: Announcing the Founding of SleepyHead Studios! 🚀", date: "December 2023", description: "SleepyHead Studios officially forms! Driven by a passion for competitive development, our indie game studio commits to turning creative energy into memorable games for players everywhere." },
];

const NewsItem = ({ item, side }) => {
  const itemVariants = { hidden: { opacity: 0, x: side === 'left' ? -100 : 100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } } };
  const desktopLeftVariant = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } } };

  return (
    <motion.div variants={side === 'left' ? desktopLeftVariant : itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className={`relative w-full mb-8 md:w-1/2 ${side === 'left' ? 'md:self-start md:pr-8' : 'md:self-end md:pl-8'}`}>
      <div className="relative pl-10 md:pl-0">
        <div className={`absolute top-1 left-0 -translate-x-1/2 md:left-auto md:translate-x-0 ${side === 'left' ? 'md:right-[-0.5rem]' : 'md:left-[-0.5rem]'} w-4 h-4 bg-indigo-500 rounded-full border-4 border-[#0F0F0F]`} />
        <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700">
          <p className="text-sm text-indigo-400 mb-2">{item.date}</p>
          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-neutral-300 text-sm">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const NewsPage = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end end"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    // UPDATED: Background confirmed transparent
    <div className="bg-transparent min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="text-5xl md:text-7xl font-black text-white uppercase"> Latest Updates </motion.h1>
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} className="text-lg text-neutral-400 mt-4"> Follow our journey and recent milestones. </motion.p>
        </div>
        <div ref={timelineRef} className="relative max-w-3xl mx-auto flex flex-col items-center">
          <motion.div className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-indigo-500 origin-top" style={{ scaleY }}/>
          <div className="w-full flex flex-col items-center">
            {newsData.map((item, index) => ( <NewsItem key={item.id} item={item} side={index % 2 === 0 ? 'left' : 'right'}/> ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;