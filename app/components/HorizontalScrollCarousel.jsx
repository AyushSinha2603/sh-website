import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return <HorizontalScrollCarousel />;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-42%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 p-4"> {/* Added padding for mobile */}
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      // RESPONSIVE CHANGE: Made the card smaller on mobile, larger on medium screens+
      className="group relative h-[400px] w-[300px] md:h-[450px] md:w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        {/* RESPONSIVE CHANGE: Made the text smaller on mobile */}
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-4xl md:text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
    // Using placeholder images for demonstration
  { url: "https://placehold.co/600x400/000000/FFFFFF/png?text=Game+One", title: "Game One", id: 1 },
  { url: "https://placehold.co/600x400/111111/FFFFFF/png?text=Game+Two", title: "Game Two", id: 2 },
  { url: "https://placehold.co/600x400/222222/FFFFFF/png?text=Game+Three", title: "Game Three", id: 3 },
  { url: "https://placehold.co/600x400/333333/FFFFFF/png?text=Game+Four", title: "Game Four", id: 4 },
  { url: "https://placehold.co/600x400/444444/FFFFFF/png?text=Game+Five", title: "Game Five", id: 5 },
  { url: "https://placehold.co/600x400/555555/FFFFFF/png?text=Game+Six", title: "Game Six", id: 6 },
  { url: "https://placehold.co/600x400/666666/FFFFFF/png?text=Game+Seven", title: "Game Seven", id: 7 },
];