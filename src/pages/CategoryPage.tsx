
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Map of category IDs to their display names and descriptions
const categoryInfo = {
  'road-running': {
    title: 'Road Running',
    description: 'Engineered for speed and comfort on paved surfaces. Perfect for daily training, marathons, and urban environments.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'trail-running': {
    title: 'Trail Running',
    description: 'Rugged designs for challenging off-road terrain. Built with durable materials and enhanced traction for unpredictable surfaces.',
    image: 'https://images.unsplash.com/photo-1665859618005-9dadcf72f369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'competition': {
    title: 'Competition',
    description: 'Ultralight racing shoes built for personal records. Engineered with cutting-edge materials and technology for race day performance.',
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'daily-trainers': {
    title: 'Daily Trainers',
    description: 'Reliable shoes for everyday running. Balanced cushioning and durability for consistent training throughout the year.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'stability': {
    title: 'Stability',
    description: 'Supportive shoes for runners who need gait correction. Engineered with guidance features to promote natural alignment.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  'cushioned': {
    title: 'Cushioned',
    description: 'Maximum comfort for long-distance running. Plush cushioning to absorb impact and reduce fatigue over extended miles.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryInfo[categoryId as keyof typeof categoryInfo];
  
  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase() === categoryId?.toLowerCase() ||
    (product.tags && product.tags.some(tag => tag.toLowerCase() === categoryId?.toLowerCase()))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center my-20">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Category Not Found</h1>
              <p className="text-xl text-black/70 mb-8">
                Sorry, we couldn't find the category you're looking for.
              </p>
              <Button asChild>
                <Link to="/categories">View All Categories</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Category Info */}
        <div 
          className="relative h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <Button variant="outline" asChild className="mb-6 w-fit text-white border-white hover:bg-white/20 hover:text-white">
              <Link to="/categories" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Categories
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-white mb-4">{category.title}</h1>
            <p className="text-white/90 text-lg max-w-2xl">{category.description}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{category.title} Shoes</h2>
            <span className="text-sm text-black/70">
              {categoryProducts.length} products
            </span>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  colorway={product.colorway}
                  image={product.image}
                  isNew={product.isNew}
                  isSale={product.isSale}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-black/70 mb-6">
                We currently don't have any products in this category.
              </p>
              <Button asChild>
                <Link to="/categories">Explore Other Categories</Link>
              </Button>
            </div>
          )}
        </div>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
