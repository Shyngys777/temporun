
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'road-running',
    title: 'Road Running',
    description: 'Engineered for speed and comfort on paved surfaces.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/road-running',
  },
  {
    id: 'trail-running',
    title: 'Trail Running',
    description: 'Rugged designs for challenging off-road terrain.',
    image: 'https://images.unsplash.com/photo-1665859618005-9dadcf72f369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/trail-running',
  },
  {
    id: 'competition',
    title: 'Competition',
    description: 'Ultralight racing shoes built for personal records.',
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    href: '/categories/competition',
  },
];

const CategoriesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      categoryRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
      <section
          ref={containerRef}
          className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 motion-safe-animate fade-in">
            <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Shop By Category</h2>
            <p className="max-w-2xl mx-auto text-lg text-black/70">
              Find the perfect shoes for your running style and terrain preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
                <div
                    key={category.id}
                    ref={(el) => (categoryRefs.current[index] = el)}
                    className="relative aspect-[4/5] overflow-hidden rounded-xl motion-safe-animate"
                >
                  <Link to={category.href} className="group block h-full w-full">
                    <div className="absolute inset-0">
                      <img
                          src={category.image}
                          alt={category.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-0">
                        {category.title}
                      </h3>
                      <p className="text-white/90 transition-all duration-300 max-w-xs">
                        {category.description}
                      </p>
                      <span className="inline-block mt-4 text-sm font-medium border-b border-white/60 pb-0.5 transition-all duration-300 group-hover:border-white">
                    Explore Collection
                  </span>
                    </div>
                  </Link>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default CategoriesSection;