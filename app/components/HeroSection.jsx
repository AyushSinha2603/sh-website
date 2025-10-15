"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  // We use a ref to get direct access to the <canvas> element
  const canvasRef = useRef(null);

  // The key: Porting the vanilla JS into a useEffect hook.
  // This hook runs only on the client-side, after the component has mounted.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if the canvas isn't ready

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.angle = Math.random() * 2 * Math.PI;
        this.vx = this.speed * Math.cos(this.angle);
        this.vy = this.speed * Math.sin(this.angle);
      }
      update(mouse) {
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 2;
            this.y += (dy / distance) * force * 2;
          }
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) this.vx *= -1;
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const createParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      const colors = ['#60A5FA', '#6366F1', '#F43F5E', '#E5E7EB'];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speed = Math.random() * 0.3 + 0.1;
        particles.push(new Particle(x, y, size, color, speed));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(mouse);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const initParticles = () => {
      resizeCanvas();
      createParticles();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animate();
    };

    initParticles();
    window.addEventListener('resize', initParticles);

    // This is the cleanup function. It runs when the component is unmounted.
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []); // The empty array ensures this effect runs only once.

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-[#0F0F0F]">
      {/* The canvas element that our JS will draw on */}
      <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 z-0 w-full h-full" />
      
      <div className="relative z-10 p-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight"
        >
          From Dreams to<br />
          <span
            className="bg-gradient-to-r from-blue-400 to-indigo-700"
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Digital Worlds
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          An independent studio dedicated to building unforgettable gaming experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-8"
        >
          <a
            href="#games"
            className="bg-rose-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F0F] focus:ring-rose-500"
          >
            Explore Our Games
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </motion.div>
      
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;