"use client";

import { useRef, useEffect } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y, size, color, speed) {
        this.x = x; this.y = y; this.size = size; this.color = color; this.speed = speed;
        this.angle = Math.random() * 2 * Math.PI;
        this.vx = this.speed * Math.cos(this.angle); this.vy = this.speed * Math.sin(this.angle);
      }
      update(mouse) {
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x; const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 2; this.y += (dy / distance) * force * 2;
          }
        }
        this.x += this.vx; this.y += this.vy;
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
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      const colors = ['#60A5FA', '#6366F1', '#E5E7EB'];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width; const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speed = Math.random() * 0.2 + 0.1;
        particles.push(new Particle(x, y, size, color, speed));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(mouse); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    const initParticles = () => { resizeCanvas(); createParticles(); if (animationFrameId) cancelAnimationFrame(animationFrameId); animate(); };
    initParticles();
    window.addEventListener('resize', initParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
};

export default ParticleBackground;