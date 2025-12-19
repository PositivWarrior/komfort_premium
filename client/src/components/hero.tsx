import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import heroBg1 from "@assets/generated_images/mercedes_v-class_exterior_black.png";
import heroBg2 from "@assets/generated_images/chauffeur_greeting_businessman_at_hotel.png";
import heroBg3 from "@assets/generated_images/wedding_couple_entering_luxury_car.png";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const slides = [
    {
      image: heroBg1,
      ...t.hero.slide1
    },
    {
      image: heroBg2,
      ...t.hero.slide2
    },
    {
      image: heroBg3,
      ...t.hero.slide3
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover object-center ${index === current ? "scale-105 animate-slow-zoom" : "scale-100"}`}
          />
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-20 px-6">
        <div className="max-w-2xl">
          {slides.map((slide, index) => (
            index === current && (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h2 className="text-primary font-medium tracking-[0.2em] mb-4 uppercase">{slide.subtitle}</h2>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
                  {slide.title.split(' ').map((word, i) => (
                    i === 1 || i === 2 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 block">{word}</span> : <span key={i}> {word} </span>
                  ))}
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
                  {slide.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact">
                    <Button size="lg" className="bg-primary text-black hover:bg-primary/90 text-md px-8 h-12 w-full sm:w-auto">
                      {t.hero.bookRide}
                    </Button>
                  </a>
                  <a href="#fleet">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white text-md px-8 h-12 w-full sm:w-auto">
                      {t.hero.viewFleet} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 flex gap-4">
        <button onClick={prevSlide} className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextSlide} className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
