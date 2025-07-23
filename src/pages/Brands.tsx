
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBrandsWithProductCount } from '@/hooks/useBrands';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Search, Filter, Grid3X3, ListFilter } from 'lucide-react';

// Brand logos and background images
const brandAssets: Record<string, { logo: string, background: string, accent: string }> = {
  "Nike": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    background: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    accent: "from-orange-600 to-red-600"
  },
  "Adidas": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    background: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80",
    accent: "from-blue-600 to-indigo-600"
  },
  "New Balance": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg",
    background: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    accent: "from-gray-600 to-slate-800"
  },
  "Asics": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Asics_Logo.svg",
    background: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    accent: "from-red-600 to-blue-600"
  },
  "Saucony": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Saucony_logo.svg",
    background: "https://images.unsplash.com/photo-1539692858702-5cc9e1e40c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    accent: "from-red-600 to-yellow-600"
  },
  "Brooks": {
    logo: "https://cdn.freebiesupply.com/logos/large/2x/brooks-2-logo-png-transparent.png",
    background: "https://images.unsplash.com/photo-1595950653613-ab04d3255511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    accent: "from-blue-600 to-green-600"
  },
  "Hoka": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/Hoka_One_One_logo.svg",
    background: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2112&q=80",
    accent: "from-blue-600 to-orange-600"
  },
  "On": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/On_logo.svg",
    background: "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    accent: "from-gray-600 to-blue-600"
  },
  "Mizuno": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Mizuno_logo.svg",
    background: "https://images.unsplash.com/photo-1574668392358-60fc1b62cfce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    accent: "from-blue-600 to-cyan-600"
  }
};

const BrandSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-[16/9] w-full" />
    <CardContent className="p-6">
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-20" />
    </CardContent>
  </Card>
);

interface BrandInfo {
  name: string;
  logo: string;
  background: string;
  accent: string;
  productCount: number;
}

const BrandsPage = () => {
  const { data: brandsData, isLoading: brandsLoading, error: brandsError } = useBrandsWithProductCount();
  const { data: allProductsData, isLoading: productsLoading } = useProducts();
  
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState(allProductsData?.data || []);
  const [brandsInfo, setBrandsInfo] = useState<BrandInfo[]>([]);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');

  const brandSectionRef = useRef<HTMLDivElement>(null);
  const brandRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set up intersection observer for animation
  useEffect(() => {
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

    if (brandSectionRef.current) {
      observer.observe(brandSectionRef.current);
    }

    brandRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [brandsInfo]);

  // Prepare brands info with product counts
  useEffect(() => {
    if (!brandsData) return;

    const brands = brandsData.map(brand => {
      const defaultLogo = "https://placehold.co/200x80?text=" + brand.name;
      const defaultBackground = "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

      return {
        name: brand.name,
        logo: brand.logo_url || brandAssets[brand.name]?.logo || defaultLogo,
        background: brandAssets[brand.name]?.background || defaultBackground,
        accent: brandAssets[brand.name]?.accent || "from-gray-600 to-slate-800",
        productCount: brand.product_count
      };
    });

    // Sort brands by product count (descending)
    const sortedBrands = brands.sort((a, b) => b.productCount - a.productCount);

    setBrandsInfo(sortedBrands);
  }, [brandsData]);

  // Update displayed products when brand selection changes
  useEffect(() => {
    if (!allProductsData?.data) return;
    
    if (selectedBrand) {
      setDisplayedProducts(
        allProductsData.data.filter(product => 
          product.brand.name.toLowerCase() === selectedBrand.toLowerCase()
        )
      );
    } else {
      setDisplayedProducts(allProductsData.data);
    }
  }, [selectedBrand, allProductsData]);

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(prev => prev === brandName ? null : brandName);
  };

  // Convert brand name to URL friendly format
  const getBrandUrl = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 motion-safe-animate fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-black text-white text-sm font-medium mb-4">Premium Selection</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-black">
                World-Class Running Brands
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-black/70">
                Explore our curated collection of premium running shoe brands that deliver performance, comfort, and style for every runner.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Showcase */}
        <section
            ref={brandSectionRef}
            className="py-16 bg-white motion-safe-animate opacity-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandsLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <BrandSkeleton key={`skeleton-${index}`} />
                ))
              ) : brandsError ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Unable to load brands</p>
                </div>
              ) : (
                brandsInfo.map((brand, index) => (
                  <div
                      key={brand.name}
                      ref={(el) => (brandRefs.current[index] = el)}
                      className="opacity-0 motion-safe-animate"
                      style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link to={`/brands/${getBrandUrl(brand.name)}`}>
                      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${brand.accent} opacity-70 mix-blend-multiply`}></div>
                          <img
                              src={brand.background}
                              alt={brand.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 flex items-center justify-center p-6">
                            <div className="bg-white rounded-lg p-6 w-32 h-20 flex items-center justify-center shadow-lg">
                              <img
                                  src={brand.logo}
                                  alt={brand.name}
                                  className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">{brand.name}</h3>
                            <span className="text-sm text-black/70">{brand.productCount} products</span>
                          </div>
                          <Button variant="ghost" size="sm" className="mt-4 group/btn w-full justify-between">
                            <span>Explore Collection</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Shop by Brand</h2>
                <p className="max-w-2xl text-lg text-black/70">
                  Browse our selection by your favorite running shoe brand.
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex items-center gap-2">
                <Button
                    variant={activeView === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setActiveView('grid')}
                    className="h-9 w-9"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                    variant={activeView === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setActiveView('list')}
                    className="h-9 w-9"
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8 flex overflow-x-auto p-1">
                <TabsTrigger value="all" onClick={() => setSelectedBrand(null)}>
                  All Brands
                </TabsTrigger>
                {brandsInfo.map(brand => (
                    <TabsTrigger
                        key={brand.name}
                        value={brand.name}
                        onClick={() => setSelectedBrand(brand.name)}
                    >
                      {brand.name}
                    </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    {selectedBrand ? `${selectedBrand} Products` : "All Products"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-black/70">
                    {productsLoading ? 'Loading...' : `${displayedProducts.length} products`}
                  </span>
                  </div>
                </div>

                {activeView === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                      {productsLoading ? (
                        Array.from({ length: 12 }).map((_, index) => (
                          <div key={`skeleton-${index}`} className="space-y-4">
                            <Skeleton className="aspect-square w-full rounded-lg" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-4 w-1/4" />
                            </div>
                          </div>
                        ))
                      ) : (
                        displayedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
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
                        ))
                      )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                      {productsLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                          <Card key={`skeleton-${index}`} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              <Skeleton className="sm:w-1/3 aspect-square sm:aspect-auto h-48" />
                              <div className="p-6 sm:w-2/3 space-y-4">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-10 w-24" />
                              </div>
                            </div>
                          </Card>
                        ))
                      ) : (
                        displayedProducts.map((product) => (
                          <Card key={product.id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              <div className="sm:w-1/3 aspect-square sm:aspect-auto relative">
                                <img
                                    src={product.primary_image || ''}
                                    alt={`${product.brand.name} ${product.name}`}
                                    className="h-full w-full object-cover object-center"
                                />
                                {product.is_new && (
                                    <div className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                                      New
                                    </div>
                                )}
                                {product.compare_at_price && (
                                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                                      Sale
                                    </div>
                                )}
                              </div>
                              <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="text-sm font-medium text-black/80">{product.brand.name}</p>
                                      <h3 className="text-lg font-bold mt-1">{product.name}</h3>
                                      <p className="mt-1 text-sm text-black/60">{product.variants?.[0]?.colorway || 'Multiple Colors'}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <p className="font-medium">${product.min_price.toFixed(2)}</p>
                                      {product.compare_at_price && (
                                          <p className="ml-2 text-sm text-black/60 line-through">${product.compare_at_price.toFixed(2)}</p>
                                      )}
                                    </div>
                                  </div>
                                  <p className="mt-4 text-sm text-black/70">{product.short_description || "Premium running shoes designed for performance and comfort."}</p>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                  <div className="flex gap-2">
                                    {product.tags?.slice(0, 3).map(tagObj => (
                                        <span key={tagObj.tag} className="inline-block bg-gray-100 text-black/70 text-xs px-2 py-1 rounded">
                                  {tagObj.tag}
                                </span>
                                    ))}
                                  </div>
                                  <Button asChild>
                                    <Link to={`/product/${product.id}`}>View Details</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                )}

                {displayedProducts.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-lg text-black/70">No products found for this brand.</p>
                    </div>
                )}
              </TabsContent>

              {brandsInfo.map(brand => (
                  <TabsContent key={brand} value={brand} className="mt-0">
                    {/* Same content as "all" but filtered for this brand */}
                    <div className="mb-6 flex justify-between items-center">
                      <h3 className="text-xl font-semibold">{brand.name} Products</h3>
                      <span className="text-sm text-black/70">
                    {displayedProducts.length} products
                  </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                      {displayedProducts.map((product) => (
                          <ProductCard
                              key={product.id}
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
                      ))}
                    </div>

                    {displayedProducts.length === 0 && (
                        <div className="text-center py-16">
                          <p className="text-lg text-black/70">No products found for this brand.</p>
                        </div>
                    )}
                  </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
  );
};

export default BrandsPage;