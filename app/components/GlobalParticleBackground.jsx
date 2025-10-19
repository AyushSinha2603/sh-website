"use client";

import { useRef, useEffect } from "react";

const GlobalParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Console log to check if the effect runs
    console.log("GlobalParticleBackground useEffect running!");

    const canvas = canvasRef.current;
    // Check if canvas exists
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    const ctx = canvas.getContext('2d');
    // Check if context was retrieved
    if (!ctx) {
      console.error("Could not get canvas context!");
      return;
    }

    let particles = [];
    let animationFrameId;

    // --- Particle Logic ---
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // Use scrollHeight to cover the full document height
      canvas.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
      console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`); // Log resize
    };

    class Particle {
      constructor(x, y, size, color, speed) {
        this.x = x; this.y = y; this.size = size; this.color = color; this.speed = speed;
        this.angle = Math.random() * 2 * Math.PI;
        this.vx = this.speed * Math.cos(this.angle); this.vy = this.speed * Math.sin(this.angle);
      }
      update(mouse) {
        // Mouse interaction logic
        if (mouse.x && mouse.y) {
          const scrollY = window.scrollY; // Account for current scroll position
          const dx = this.x - mouse.x; const dy = this.y - (mouse.y + scrollY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Move particle away from mouse
            this.x += (dx / distance) * force * 2;
            this.y += (dy / distance) * force * 2;
          }
        }
        // Basic movement
        this.x += this.vx; this.y += this.vy;
        // Bounce off document edges
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) this.vx *= -1;
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) this.vy *= -1;
      }
      draw() {
        // Draw the particle
        ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Mouse position tracking
    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (event) => { mouse.x = event.clientX; mouse.y = event.clientY; };
    const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    // Function to create particles
    const createParticles = () => {
      particles = [];
      const area = canvas.width * canvas.height;
      // Adjust density based on calculated area
      const particleCount = Math.max(50, Math.floor(area / 25000)); // Ensure at least 50 particles
      console.log(`Creating ${particleCount} particles`); // Log particle count
      const colors = ['#60A5FA', '#6366F1', '#E5E7EB']; // Blue, Indigo, Gray
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width; const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speed = Math.random() * 0.3 + 0.1; // Slow speed
        particles.push(new Particle(x, y, size, color, speed));
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas before drawing new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Update and draw each particle
      particles.forEach(p => { p.update(mouse); p.draw(); });
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Debounced initialization and resize handling
    let resizeTimeout;
    const initParticles = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log("Initializing/Resizing Particles...");
            resizeCanvas(); // Set canvas size first
            createParticles(); // Then create particles based on size
            if (animationFrameId) cancelAnimationFrame(animationFrameId); // Stop previous loop
            animate(); // Start new loop
        }, 150); // Debounce to prevent rapid calls
    };

    initParticles(); // Initial call
    window.addEventListener('resize', initParticles); // Re-initialize on window resize

    // Observer to detect body size changes (e.g., content loading)
    const resizeObserver = new ResizeObserver(initParticles);
    resizeObserver.observe(document.body);

    // Cleanup function to remove listeners and stop animation when component unmounts
    const cleanupFunction = () => {
      console.log("Cleaning up GlobalParticleBackground...");
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
    return cleanupFunction;
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

  // Render the canvas element
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default GlobalParticleBackground;