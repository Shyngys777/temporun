
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const heroSlides = [
  {
    id: 1,
    title: "Создано для высоких результатов",
    description: "Откройте новейшие технологии в беговой обуви, чтобы покорять любые дистанции.",
    image: "/mainpage.jpg",
    ctaText: "Shop Performance",
    ctaLink: "/performance",
  },
  {
    id: 2,
    title: "New Balance Fresh Foam",
    description: "Experience premium cushioning for every stride.",
    image: "IMG_1454.JPG",
    ctaText: "Приобрести New Balance",
    ctaLink: "/brands/new-balance",
  },
  {
    id: 3,
    title: "Кроссовки для Трейлраннинга",
    description: "Где заканчивается дорога, начинается твой бег.",
    image: "IMG_1574.JPG",
    ctaText: "Все для Трейла",
    ctaLink: "/brands/nike",
  },
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a short delay to allow for initial animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 800);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(loadTimer);
    };
  }, []);

  const slide = heroSlides[currentSlide];

  return (
      <section className="relative h-screen w-full overflow-hidden">
        {/* Preload all images to avoid flickering */}
        <div className="hidden">
          {heroSlides.map((s) => (
              <img key={`preload-${s.id}`} src={s.image} alt="" />
          ))}
        </div>

        {/* Background Image with parallax effect */}
        <div className="absolute inset-0">
          {heroSlides.map((s, index) => (
              <div
                  key={s.id}
                  className={cn(
                      "absolute inset-0 transition-all duration-1500 ease-in-out bg-cover bg-center",
                      currentSlide === index
                          ? "opacity-100 scale-[1.02]"
                          : "opacity-0 scale-[1.1]"
                  )}
                  style={{
                    backgroundImage: `url(${s.image})`,
                    transitionProperty: "opacity, transform"
                  }}
              />
          ))}
          {/* Gradient overlay with improved transition */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/10" />
        </div>

        {/* Content */}
        <div
            className={cn(
                "relative flex h-full items-center",
                isLoaded ? "opacity-100" : "opacity-0",
                "transition-opacity duration-1000"
            )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="max-w-lg">
              <h1
                  className={cn(
                      "text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight",
                      "transition-all duration-1000",
                      isTransitioning
                          ? "opacity-0 translate-y-8 blur-sm"
                          : "opacity-100 translate-y-0 blur-0"
                  )}
              >
                {slide.title}
              </h1>
              <p
                  className={cn(
                      "text-lg text-white/90 mb-8 max-w-md",
                      "transition-all duration-1000 delay-150",
                      isTransitioning
                          ? "opacity-0 translate-y-8 blur-sm"
                          : "opacity-100 translate-y-0 blur-0"
                  )}
              >
                {slide.description}
              </p>
              <div
                  className={cn(
                      "transition-all duration-1000 delay-300",
                      isTransitioning
                          ? "opacity-0 translate-y-8 blur-sm"
                          : "opacity-100 translate-y-0 blur-0"
                  )}
              >
                <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 overflow-hidden group relative"
                >
                <span className="relative z-10 flex items-center">
                  {slide.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                  <span className="absolute inset-0 bg-white opacity-100 group-hover:opacity-80 transition-opacity duration-500"></span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators with improved animation */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                      if (currentSlide !== index) {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentSlide(index);
                          setIsTransitioning(false);
                        }, 800);
                      }
                    }}
                    className={cn(
                        "rounded-full transition-all duration-500",
                        currentSlide === index
                            ? "w-8 h-2 bg-white"
                            : "w-2 h-2 bg-white/60 hover:bg-white/80"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
          </div>
        </div>
      </section>
  );
};

export default HeroSection;