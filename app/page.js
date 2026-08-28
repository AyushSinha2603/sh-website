import HeroAboutWrapper from "./components/HeroAboutWrapper.jsx";
import FeaturedGamesSection from "./components/FeaturedGamesSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";

export default function Home() {
  return (
    <main className="bg-transparent">
      <HeroAboutWrapper />
      <FeaturedGamesSection />
      <ServicesSection />
    </main>
  );
}