
import React from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useSaleProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterIcon, SlidersHorizontal } from 'lucide-react';

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

const Sale = () => {
  const { data: saleProducts, isLoading, error } = useSaleProducts(50);

  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Sale</h1>
              <p className="mt-4 text-lg text-black/70 max-w-3xl mx-auto">
                Grab high-performance running shoes at unbeatable prices. Limited stock available - once they're gone, they're gone!
              </p>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
              <span className="text-sm text-black/70">
                {isLoading ? 'Loading...' : `${saleProducts?.length || 0} products`}
              </span>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {isLoading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <ProductSkeleton key={`skeleton-${index}`} />
                ))
              ) : error ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">Unable to load sale products</p>
                  <Button onClick={() => window.location.reload()}>Try Again</Button>
                </div>
              ) : saleProducts?.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No sale items available at the moment</p>
                </div>
              ) : (
                saleProducts?.map((product) => (
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
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default Sale;