"use client";

import HorizontalScrollCarousel from "./components/HorizontalScrollCarousel.jsx";
import HeroSection from "./components/HeroSection.jsx"; // 1. Import the new component

export default function Home() {
  return (
    <main>
      {/* The Navbar from layout.js will sit on top of this */}
      
      {/* 2. Add the new Hero Section */}
      <HeroSection />

      {/* 3. The Carousel follows */}
      <HorizontalScrollCarousel />

      {/* You can add a footer or other sections here later */}
    </main>
  );
}