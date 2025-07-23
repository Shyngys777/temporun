import { useQuery } from '@tanstack/react-query';
import { brandsAPI } from '@/lib/api/brands';

export const useBrands = (featuredOnly = false) => {
  return useQuery({
    queryKey: ['brands', featuredOnly],
    queryFn: () => brandsAPI.getBrands(featuredOnly),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useBrand = (slug: string) => {
  return useQuery({
    queryKey: ['brand', slug],
    queryFn: () => brandsAPI.getBrandBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

export const useBrandsWithProductCount = () => {
  return useQuery({
    queryKey: ['brands', 'with-product-count'],
    queryFn: () => brandsAPI.getBrandsWithProductCount(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useFeaturedBrands = () => {
  return useQuery({
    queryKey: ['brands', 'featured'],
    queryFn: () => brandsAPI.getFeaturedBrands(),
    staleTime: 15 * 60 * 1000, // 15 minutes for featured brands
  });
};