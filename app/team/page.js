"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// 1. useCallback is already imported, which is what we need
import { useState, useEffect, useRef, useCallback } from "react"; 
import {
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiRefreshCw,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiFolder,
} from "react-icons/fi";
import StyleDigits from "../components/StyleDigits.jsx"; // Import StyleDigits - This path is now correct

// --- Data for Team Section ---
const teamMembers = [
  { name: "Rahul Kumar Mahato", role: "Lead Developer", image: "/images/rahul_cover.webp", backImage: "/images/rahul_in.jpeg", bio: "Rahul is the architect of our digital worlds, turning complex ideas into seamless gameplay.", color: "#FACC15", socials: { linkedin: "https://www.linkedin.com/in/rahul-kumar-mahato-36938931a", github: "https://github.com/rahul-240505" } },
  { name: "Narayan Satapathy", role: "3D Artist & UI/UX", image: "/images/narayan_cover.webp", backImage: "/images/narayan_in.jpeg", bio: "Narayan brings our visuals to life, sculpting immersive 3D worlds and designing intuitive user interfaces.", color: "#6366F1", socials: { linkedin: "https://www.linkedin.com/in/narayan-satapathy-a242341b3", github: "https://github.com/Narayan69" } },
  { name: "Vivek Kumar", role: "2D Artist", image: "/images/vivek_in.jpeg", backImage: "/images/vivek_in.jpeg", bio: "Vivek is the master of pixels and palettes, creating stunning concept art and 2D assets that define our games' visual identity.", color: "#F43F5E", socials: { linkedin: "https://www.linkedin.com/in/vivek-kashyap-b24b59295", github: "https://github.com/vivekkashyap17" } },
  { name: "Ayush Sinha", role: "Web Developer", image: "/images/ayush_cover.webp", backImage: "/images/ayush_in.jpeg", bio: "Ayush builds our online presence, ensuring our community has a fast, beautiful, and reliable place to connect with us.", color: "#10B981", socials: { linkedin: "https.linkedin.com/in/ayush-sinha-70046a319", github: "https://github.com/AyushSinha2603" } },
];

// --- Data for Gallery Section ---
const galleryCategories = [
  {
    id: 1,
    title: "HackInno'24",
    coverImage: "/images/IMG_20251101_172418_919.jpg",
    images: [
      "/images/IMG_20251101_172418_919.jpg",
      "/images/IMG_20240901_133915078_HDR.jpg",
      "/images/IMG_20240901_151713568.jpg",
      "/images/IMG_20240901_162654650.jpg",
      "/images/IMG_20240901_162738672_HDR.jpg",
      "/images/IMG_20240901_162936175_HDR.jpg",
      "/images/IMG_20240901_163501307_HDR.jpg",
      "/images/IMG_20240903_210849097.jpg",
    ],
    date: "August 2024",
  },
  {
    id: 4,
    title: "IGDC'24",
    coverImage: "/images/ig_cover.jpg",
    images: [
      "/images/ig6.jpg",
      "/images/ig1.jpg",
      "/images/ig8.jpg",
      "/images/ig2.jpg",
      "/images/ig9.jpg",
      "/images/ig3.jpg",
      "/images/ig4.jpg",
      "/images/ig5.jpg",
      "/images/ig7.jpg"
    ],
    date: "November 2024",
  },
];

// --- Team Card Component ---
const TeamMemberFlipCard = ({ member, variants }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const shouldFlip = !isMobile ? isHovered : isFlipped;

  return (
    <motion.div variants={variants} className="w-full">
      <div
        className="card-container aspect-[2/3] cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="card-inner relative w-full h-full"
          initial={false}
          animate={{ rotateY: shouldFlip ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Front */}
          <div
            className="card-front absolute w-full h-full rounded-lg overflow-hidden shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* Flip Icon Indicator - Only show on larger screens */}
            <motion.div
              className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full p-3 hidden lg:block"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 0 : 1,
                rotate: isHovered ? 180 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <FiRefreshCw className="w-5 h-5 text-white" strokeWidth={2.5} />
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
                <StyleDigits>{member.name}</StyleDigits>
              </motion.h4>
              <motion.p
                className="text-sm mt-2 opacity-0"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
                style={{ color: member.color }}
              >
                <StyleDigits>{member.role}</StyleDigits>
              </motion.p>
            </div>
          </div>

          {/* Card Back */}
          <div
            className="card-back absolute w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col shadow-xl border border-gray-700"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <Image
              src={member.backImage}
              alt={member.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 object-cover shadow-lg"
              style={{ borderColor: member.color }}
            />
            <h4 className="text-xl font-bold text-center text-white">
              <StyleDigits>{member.name}</StyleDigits>
            </h4>
            <p
              className="text-center mb-4 font-semibold text-sm"
              style={{ color: member.color }}
            >
              <StyleDigits>{member.role}</StyleDigits>
            </p>
            <p className="text-gray-300 text-sm text-center flex-grow leading-relaxed">
              <StyleDigits>{member.bio}</StyleDigits>
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all hover:scale-110"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all hover:scale-110"
              >
                <FiGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Gallery Card Component ---
const CategoryCard = ({ category, onClick, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={category.coverImage}
        alt={category.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Folder Icon */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
        <FiFolder className="w-5 h-5 text-white" />
      </div>

      {/* Category Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl font-bold text-white mb-1">
          <StyleDigits>{category.title}</StyleDigits>
        </h3>
        <p className="text-sm text-gray-300">
          <StyleDigits>{category.images.length} photos • {category.date}</StyleDigits>
        </p>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-indigo-600/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// --- Gallery Modal Component ---
const GalleryModal = ({ category, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartRef = useRef(null);
  const touchMoveRef = useRef(null);
  const lastWheelTime = useRef(0);
  const minSwipeDistance = 50;

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % category.images.length);
  }, [category.images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + category.images.length) % category.images.length
    );
  }, [category.images.length]);

  // Effect for keyboard (Arrows + Esc) and mouse wheel listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") { 
        onClose(); 
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime.current < 300) {
        return;
      }
      lastWheelTime.current = now;

      if (e.deltaY > 0) {
        nextImage();
      } else if (e.deltaY < 0) {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const modalElement = document.querySelector(".fixed.inset-0.z-50");
    if (modalElement) {
      modalElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (modalElement) {
        modalElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [nextImage, prevImage, onClose]); // This dependency array is now stable

  // Touch event handlers
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
    touchMoveRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchMoveRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchMoveRef.current) {
      return;
    }
    const deltaX = touchMoveRef.current - touchStartRef.current;

    if (deltaX < -minSwipeDistance) {
      nextImage();
    } else if (deltaX > minSwipeDistance) {
      prevImage();
    }

    touchStartRef.current = null;
    touchMoveRef.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors"
      >
        <FiX className="w-6 h-6 text-white" />
      </button>

      {/* Content */}
      <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <StyleDigits>{category.title}</StyleDigits>
          </h2>
          <p className="text-gray-400">
            <StyleDigits>{category.date}</StyleDigits>
          </p>
        </div>

        {/* Image Display */}
        <div className="relative">
          {/* Main Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative aspect-[16/10] md:aspect-[16/9] rounded-lg overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={category.images[currentIndex]}
              alt={`${category.title} ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Navigation Arrows (Hidden) */}
          {category.images.length > 1 && false && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 md:p-3 hover:bg-white/20 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 md:p-3 hover:bg-white/20 transition-colors"
              >
                <FiChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <p className="text-white text-sm">
              <StyleDigits>{currentIndex + 1} / {category.images.length}</StyleDigits>
            </p>
          </div>
        </div>

        {/* Thumbnail Strip (Desktop only) */}
        <div className="hidden md:flex gap-2 mt-4 overflow-x-auto pb-2">
          {category.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-indigo-500 opacity-100"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component (Combined) ---
const TeamAndGalleryPage = () => {
  // State for Gallery Modal
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- FIX IS HERE ---
  // 1. Define a stable onClose handler using useCallback
  const handleCloseModal = useCallback(() => {
    setSelectedCategory(null);
  }, []); // An empty dependency array ensures this function is created only once

  // Variants for Team Section
  const teamContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const teamItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variants for Gallery Section
  const galleryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const galleryItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* --- 1. TEAM SECTION --- */}
      <div className="bg-transparent pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-5xl md:text-7xl font-black text-white uppercase"
            >
              <StyleDigits>Meet the Team</StyleDigits>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="text-lg text-neutral-400 mt-4"
            >
              <StyleDigits>The creative minds behind SleepyHead Studios.</StyleDigits>
            </motion.p>
          </div>
          <motion.div
            variants={teamContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {teamMembers.map((member) => (
              <TeamMemberFlipCard
                key={member.name}
                member={member}
                variants={teamItemVariants}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- 2. GALLERY SECTION --- */}
      <section className="bg-transparent py-20">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
              <StyleDigits>Our Moments</StyleDigits>
            </h2>
            <p className="text-lg text-neutral-400 mt-4">
              <StyleDigits>Memories we've created together</StyleDigits>
            </p>
          </motion.div>

          {/* Category Grid */}
          <motion.div
            variants={galleryContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {galleryCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => setSelectedCategory(category)}
                variants={galleryItemVariants}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 3. GALLERY MODAL (Global) --- */}
      <AnimatePresence>
        {selectedCategory && (
          <GalleryModal
            category={selectedCategory}
            onClose={handleCloseModal} // 2. Pass the stable function here
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamAndGalleryPage;