
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export interface BrandHeroSlide {
    image: string;
    title: string;
    subtitle?: string;
}

interface BrandHeroProps {
    brand: string;
    description: string;
    slides: BrandHeroSlide[];
    accentColor: string;
}

const BrandHero = ({
                       brand,
                       description,
                       slides,
                       accentColor
                   }: BrandHeroProps) => {
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
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setIsTransitioning(false);
            }, 800);
        }, 6000);

        return () => {
            clearInterval(interval);
            clearTimeout(loadTimer);
        };
    }, [slides.length]);

    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setIsTransitioning(false);
            }, 800);
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
                setIsTransitioning(false);
            }, 800);
        }
    };

    const slide = slides[currentSlide];

    return (
        <section className="relative overflow-hidden bg-black">
            {/* Preload all images to avoid flickering */}
            <div className="hidden">
                {slides.map((s, i) => (
                    <img key={`preload-${i}`} src={s.image} alt="" />
                ))}
            </div>

            <div className="relative min-h-[85vh] flex items-center">
                {/* Background image slider */}
                <div className="absolute inset-0">
                    {slides.map((s, index) => (
                        <div
                            key={index}
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
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
                </div>

                {/* Brand Logo and Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left column with brand info */}
                        <div className={cn(
                            "transition-all duration-1000",
                            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            {/* Brand logo or name */}
                            <div className="mb-6">
                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
                                    {brand}
                                </h1>
                                <div className={`h-1 w-24 bg-gradient-to-r ${accentColor} my-4`}></div>
                            </div>

                            {/* Slide title and subtitle */}
                            <div className={cn(
                                "transition-all duration-1000",
                                isTransitioning
                                    ? "opacity-0 translate-y-8 blur-sm"
                                    : "opacity-100 translate-y-0 blur-0"
                            )}>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {slide.title}
                                </h2>
                                {slide.subtitle && (
                                    <p className="text-xl text-white/80 mb-6">{slide.subtitle}</p>
                                )}
                            </div>

                            {/* Welcome message */}
                            <div className="mt-8">
                                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                    {description}
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" className={`bg-gradient-to-r ${accentColor} text-white hover:opacity-90`}>
                                        Shop Collection
                                    </Button>
                                    <Button variant="outline" size="lg" className="text-white border-white/30 bg-white/10 hover:bg-white/20">
                                        Explore More
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right column for visual space */}
                        <div className="hidden lg:block"></div>
                    </div>
                </div>

                {/* Slide navigation controls */}
                <div className="absolute bottom-8 inset-x-0 flex justify-center z-10">
                    <div className="flex gap-4 items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            className="text-white border-white/30 bg-white/10 hover:bg-white/20 rounded-full"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>

                        <div className="flex space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (currentSlide !== index && !isTransitioning) {
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
                                            ? `w-12 h-2 bg-gradient-to-r ${accentColor}`
                                            : "w-2 h-2 bg-white/60 hover:bg-white/80"
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            className="text-white border-white/30 bg-white/10 hover:bg-white/20 rounded-full"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <Separator className="bg-white/10" />
        </section>
    );
};

export default BrandHero;