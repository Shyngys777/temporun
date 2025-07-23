import { useQuery } from '@tanstack/react-query';
import { productsAPI, type ProductFilters, type ProductSort } from '@/lib/api/products';

export const useProducts = (
  filters: ProductFilters = {},
  sort: ProductSort = { field: 'created_at', direction: 'desc' },
  limit = 50,
  offset = 0
) => {
  return useQuery({
    queryKey: ['products', filters, sort, limit, offset],
    queryFn: () => productsAPI.getProducts(filters, sort, limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsAPI.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProducts = (limit = 8) => {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productsAPI.getFeaturedProducts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes for featured products
  });
};

export const useNewArrivals = (limit = 8) => {
  return useQuery({
    queryKey: ['products', 'new-arrivals', limit],
    queryFn: () => productsAPI.getNewArrivals(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByBrand = (brandSlug: string, limit = 50) => {
  return useQuery({
    queryKey: ['products', 'brand', brandSlug, limit],
    queryFn: () => productsAPI.getProductsByBrand(brandSlug, limit),
    enabled: !!brandSlug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByCategory = (categorySlug: string, limit = 50) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug, limit],
    queryFn: () => productsAPI.getProductsByCategory(categorySlug, limit),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSaleProducts = (limit = 50) => {
  return useQuery({
    queryKey: ['products', 'sale', limit],
    queryFn: () => productsAPI.getSaleProducts(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string, limit = 20) => {
  return useQuery({
    queryKey: ['products', 'search', query, limit],
    queryFn: () => productsAPI.searchProducts(query, limit),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};