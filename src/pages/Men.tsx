
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ArrowDown } from 'lucide-react';

// Sample men's products data
const menProducts = [
  {
    id: 'pegasus-39',
    name: 'Pegasus 39',
    brand: 'Nike',
    price: 120,
    colorway: 'Black/White',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ultraboost-22',
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 180,
    colorway: 'Core Black/Core Black',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gel-kayano-29',
    name: 'Gel-Kayano 29',
    brand: 'ASICS',
    price: 160,
    colorway: 'Blue/White',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'fresh-foam-1080',
    name: 'Fresh Foam X 1080v12',
    brand: 'New Balance',
    price: 160,
    originalPrice: 180,
    colorway: 'Black/Thunder',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    isSale: true,
  },
  {
    id: 'endorphin-speed',
    name: 'Endorphin Speed 3',
    brand: 'Saucony',
    price: 160,
    colorway: 'Orange/Black',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ghost-14',
    name: 'Ghost 14',
    brand: 'Brooks',
    price: 130,
    colorway: 'Grey/Blue',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'speedgoat-5',
    name: 'Speedgoat 5',
    brand: 'Hoka',
    price: 155,
    colorway: 'Blue/Orange',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    isNew: true,
  },
  {
    id: 'clifton-8',
    name: 'Clifton 8',
    brand: 'Hoka',
    price: 130,
    colorway: 'Black/White',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  },
];

// Filter and sort options
const categories = ['All', 'Road Running', 'Trail Running', 'Competition', 'Daily Trainers'];
const brands = ['All Brands', 'Nike', 'Adidas', 'ASICS', 'New Balance', 'Saucony', 'Hoka', 'Brooks'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Bestsellers'];

const Men = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('Newest');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          {/* Hero Banner */}
          <div className="relative h-96 overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=600&q=80"
                alt="Men's Running Shoes"
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Men's Running Shoes</h1>
                  <p className="text-lg text-white/80 mb-8">
                    Find your perfect fit with our premium selection of men's running footwear for every terrain and style.
                  </p>
                  <Button size="lg" asChild>
                    <Link to="#products">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Listing */}
          <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className="text-sm"
                    >
                      {category}
                    </Button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      {selectedBrand}
                      <ArrowDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {brands.map(brand => (
                        <DropdownMenuItem key={brand} onClick={() => setSelectedBrand(brand)}>
                          {brand}
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      Sort: {sortBy}
                      <ArrowDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {sortOptions.map(option => (
                        <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                          {option}
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Separator className="mb-10" />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {menProducts.map(product => (
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
          </div>

          <Newsletter />
        </main>
        <Footer />
      </div>
  );
};

export default Men;