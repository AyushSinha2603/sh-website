// app/page.js

import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import HorizontalScrollCarousel from "./components/HorizontalScrollCarousel.jsx";
import ServicesSection from "./components/ServicesSection.jsx";

export default function Home() {
  return (
    // UPDATED: Background is transparent
    <main className="bg-transparent">
      <HeroSection />
      <AboutSection />
      <HorizontalScrollCarousel />
      <ServicesSection />
    </main>
  );
}