import { useQuery } from '@tanstack/react-query';
import { categoriesAPI } from '@/lib/api/categories';

export const useCategories = (featuredOnly = false) => {
  return useQuery({
    queryKey: ['categories', featuredOnly],
    queryFn: () => categoriesAPI.getCategories(featuredOnly),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoriesAPI.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategoriesWithProductCount = () => {
  return useQuery({
    queryKey: ['categories', 'with-product-count'],
    queryFn: () => categoriesAPI.getCategoriesWithProductCount(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useFeaturedCategories = () => {
  return useQuery({
    queryKey: ['categories', 'featured'],
    queryFn: () => categoriesAPI.getFeaturedCategories(),
    staleTime: 15 * 60 * 1000,
  });
};

export const useCategoryHierarchy = () => {
  return useQuery({
    queryKey: ['categories', 'hierarchy'],
    queryFn: () => categoriesAPI.getCategoryHierarchy(),
    staleTime: 15 * 60 * 1000,
  });
};