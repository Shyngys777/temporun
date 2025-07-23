
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useFeaturedCategories } from '@/hooks/useCategories';
import { Skeleton } from '@/components/ui/skeleton';

const CategorySkeleton = () => (
  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
    <Skeleton className="h-full w-full" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-48" />
    </div>
  </div>
);

const CategoriesSection = () => {
  const { data: categories, isLoading, error } = useFeaturedCategories();
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
            {isLoading ? (
              // Show loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <CategorySkeleton />
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Unable to load categories</p>
              </div>
            ) : (
              categories?.slice(0, 3).map((category, index) => (
                <div
                    key={category.id}
                    ref={(el) => (categoryRefs.current[index] = el)}
                    className="relative aspect-[4/5] overflow-hidden rounded-xl motion-safe-animate"
                >
                  <Link to={`/categories/${category.slug}`} className="group block h-full w-full">
                    <div className="absolute inset-0">
                      <img
                          src={category.image_url || ''}
                          alt={category.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-0">
                        {category.name}
                      </h3>
                      <p className="text-white/90 transition-all duration-300 max-w-xs">
                        {category.description || 'Discover our collection'}
                      </p>
                      <span className="inline-block mt-4 text-sm font-medium border-b border-white/60 pb-0.5 transition-all duration-300 group-hover:border-white">
                    Explore Collection
                  </span>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
  );
};

export default CategoriesSection;