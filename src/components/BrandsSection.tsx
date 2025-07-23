
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFeaturedBrands } from '@/hooks/useBrands';
import { Skeleton } from '@/components/ui/skeleton';

const BrandSkeleton = () => (
  <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-white shadow-lg">
    <Skeleton className="h-16 w-24 mb-6" />
    <Skeleton className="h-6 w-20 mb-2" />
    <Skeleton className="h-4 w-32" />
  </div>
);

const BrandsSection = () => {
  const { data: brands, isLoading, error } = useFeaturedBrands();
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scale-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    brandRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      brandRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
      <section
          ref={containerRef}
          className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
      >
        {/* Decorative elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] bg-blue-100 rounded-full opacity-30 mix-blend-multiply blur-3xl animate-image-rotate"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[400px] h-[400px] bg-green-100 rounded-full opacity-20 mix-blend-multiply blur-3xl animate-image-rotate animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 motion-safe-animate fade-in">
            <span className="inline-block px-4 py-1 rounded-full bg-black text-white text-sm font-medium mb-4">World-Class Selection</span>
            <h2 className="text-4xl font-display font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-black">Premium Running Brands</h2>
            <p className="max-w-2xl mx-auto text-lg text-black/70">
              We partner with the world's leading running shoe brands to bring you the best in performance and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {isLoading ? (
              // Show loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <BrandSkeleton />
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Unable to load brands</p>
              </div>
            ) : (
              brands?.map((brand, index) => (
                <Link
                    key={brand.id}
                    to={`/brands/${brand.slug}`}
                    className={cn(
                        "flex flex-col items-center justify-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-500",
                        "group hover:translate-y-[-8px] motion-safe-animate bg-white/80",
                        "relative overflow-hidden"
                    )}
                    ref={(el) => (brandRefs.current[index] = el)}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white via-gray-50 to-blue-50/50 transition-opacity duration-700"></div>

                  <div className="relative z-10">
                    <div className="h-16 w-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                      <img
                          src={brand.logo_url || ''}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                  <span className="text-lg font-bold text-black mb-2 block">
                    {brand.name}
                  </span>
                      <span className="text-sm text-gray-600 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                    {brand.description || 'Premium running footwear'}
                  </span>
                    </div>
                  </div>

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-black/10 rounded-xl transition-colors duration-300"></div>
                </Link>
              ))
            )}
          </div>

          <div className="mt-16 text-center motion-safe-animate fade-in">
            <Button variant="outline" asChild className="overflow-hidden group relative border-2 border-black/80 hover:bg-black hover:text-white transition-all duration-300 px-8 py-6">
              <Link to="/brands" className="flex items-center gap-2 text-lg font-medium">
              <span className="relative z-10">
                View All Brands
              </span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
  );
};

export default BrandsSection;