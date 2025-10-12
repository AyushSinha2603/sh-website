// app/page.js

// No need for "use client" or hooks here anymore
import HorizontalScrollCarousel from "./components/HorizontalScrollCarousel.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <HorizontalScrollCarousel />
      <ServicesSection />
    </main>
  );
}