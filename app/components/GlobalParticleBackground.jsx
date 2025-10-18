// app/components/GlobalParticleBackground.jsx
"use client";

import { useRef, useEffect } from "react";

const GlobalParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      // Make canvas cover the entire scrollable height
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight; // Cover full document height
    };

    class Particle {
      constructor(x, y, size, color, speed) {
        this.x = x; this.y = y; this.size = size; this.color = color; this.speed = speed;
        this.angle = Math.random() * 2 * Math.PI;
        this.vx = this.speed * Math.cos(this.angle); this.vy = this.speed * Math.sin(this.angle);
      }
      update(mouse) {
         // Keep mouse interaction logic if desired
        if (mouse.x && mouse.y) {
          const scrollY = window.scrollY; // Account for scroll position
          const dx = this.x - mouse.x; const dy = this.y - (mouse.y + scrollY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 2; this.y += (dy / distance) * force * 2;
          }
        }
        this.x += this.vx; this.y += this.vy;
        // Bounce off edges of the full document height
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) this.vx *= -1;
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (event) => { mouse.x = event.clientX; mouse.y = event.clientY; };
    const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const createParticles = () => {
      particles = [];
      // Adjust particle count based on document height
      const area = canvas.width * canvas.height;
      const particleCount = Math.floor(area / 20000); // Adjust density as needed
      const colors = ['#60A5FA', '#6366F1', '#F43F5E', '#E5E7EB'];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width; const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speed = Math.random() * 0.3 + 0.1;
        particles.push(new Particle(x, y, size, color, speed));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(mouse); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    const initParticles = () => {
        resizeCanvas();
        createParticles();
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animate();
    };

    // Use a timeout to ensure the DOM is fully laid out before measuring scrollHeight
    const timeoutId = setTimeout(initParticles, 100);
    window.addEventListener('resize', initParticles); // Re-init on resize

    // Also re-init on navigation changes (important for SPAs)
    // This requires access to Next.js router or path, which is tricky in a layout component.
    // A simpler approach is to resize/reinit periodically or on scroll events if needed.

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Use fixed positioning and low z-index
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default GlobalParticleBackground;