
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="aspect-square w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);

const FeaturedProductsSection = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts(4);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
      <section
          ref={sectionRef}
          className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 motion-safe-animate fade-in">
            <div>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-4">New Arrivals</h2>
              <p className="max-w-2xl text-lg text-black/70">
                The latest innovations in performance running footwear have arrived.
              </p>
            </div>
            <Button variant="link" asChild className="mt-4 md:mt-0">
              <Link to="/new-arrivals" className="group flex items-center">
                View All
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {isLoading ? (
              // Show loading skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    ref={(el) => (productRefs.current[index] = el)}
                    className="motion-safe-animate"
                    style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProductSkeleton />
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Unable to load featured products</p>
              </div>
            ) : (
              featuredProducts?.map((product, index) => (
                <div
                    key={product.id}
                    ref={(el) => (productRefs.current[index] = el)}
                    className="motion-safe-animate"
                    style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    brand={product.brand.name}
                    price={product.min_price}
                    originalPrice={product.compare_at_price || undefined}
                    colorway={product.variants?.[0]?.colorway || 'Multiple Colors'}
                    image={product.primary_image || ''}
                    isNew={product.is_new}
                    isSale={!!product.compare_at_price}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
  );
};

export default FeaturedProductsSection;