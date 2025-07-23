
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';

// Sample product data
const featuredProducts = [
  {
    id: '1',
    name: 'Adidas adizero adios pro 4',
    brand: 'Adidas',
    price: 220,
    colorway: 'Core Black / Cloud White',
    image: 'https://cdn.sportsshoes.com/product/A/ADI17814/ADI17814_400_1.jpg',
    isNew: true,
  },
  {
    id: '2',
    name: 'Adistar Byd',
    brand: 'Adidas',
    price: 129.99,
    colorway: 'Blue Void / Bright Crimson',
    image: 'https://cdn.sportsshoes.com/product/A/ADI17653/ADI17653_400_1.jpg',
    isNew: true,
  },
  {
    id: '3',
    name: 'Novablast 5',
    brand: 'Asics',
    price: 149.99,
    originalPrice: 159.99,
    colorway: 'Grey / White',
    image: 'https://cdn11.bigcommerce.com/s-21x65e8kfn/images/stencil/original/products/74276/381482/ASI15343_1000_3__71373.1733419188.jpg',
    isSale: false,
    isNew: true,
  },
  {
    id: '4',
    name: 'Rincon 4',
    brand: 'Hoka',
    price: 159.99,
    colorway: 'Black / Graphite Grey',
    image: 'https://cdn.sportsshoes.com/product/H/HOK2763/HOK2763_400_1.jpg',
    isNew: true,
  },
];

const FeaturedProductsSection = () => {
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
            {featuredProducts.map((product, index) => (
                <div
                    key={product.id}
                    ref={(el) => (productRefs.current[index] = el)}
                    className="motion-safe-animate"
                    style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProductCard {...product} />
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default FeaturedProductsSection;