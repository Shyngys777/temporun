import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Category = Database['public']['Tables']['categories']['Row'];

export interface CategoryWithProductCount extends Category {
  product_count: number;
  subcategories?: CategoryWithProductCount[];
}

class CategoriesAPI {
  async getCategories(featuredOnly = false): Promise<Category[]> {
    let query = supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data || [];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return null;
    }

    return data;
  }

  async getCategoriesWithProductCount(): Promise<CategoryWithProductCount[]> {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        products!inner(count)
      `)
      .is('parent_id', null) // Only top-level categories
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories with product count:', error);
      throw error;
    }

    return (data || []).map(category => ({
      ...category,
      product_count: category.products?.[0]?.count || 0
    })) as CategoryWithProductCount[];
  }

  async getFeaturedCategories(): Promise<Category[]> {
    return this.getCategories(true);
  }

  async getCategoryHierarchy(): Promise<CategoryWithProductCount[]> {
    // Get all categories
    const { data: allCategories, error } = await supabase
      .from('categories')
      .select(`
        *,
        products!inner(count)
      `)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching category hierarchy:', error);
      throw error;
    }

    if (!allCategories) return [];

    // Build hierarchy
    const categoryMap = new Map<string, CategoryWithProductCount>();
    const rootCategories: CategoryWithProductCount[] = [];

    // First pass: create all categories
    allCategories.forEach(cat => {
      const category: CategoryWithProductCount = {
        ...cat,
        product_count: cat.products?.[0]?.count || 0,
        subcategories: []
      };
      categoryMap.set(cat.id, category);
    });

    // Second pass: build hierarchy
    allCategories.forEach(cat => {
      const category = categoryMap.get(cat.id)!;
      if (cat.parent_id) {
        const parent = categoryMap.get(cat.parent_id);
        if (parent) {
          parent.subcategories!.push(category);
        }
      } else {
        rootCategories.push(category);
      }
    });

    return rootCategories;
  }
}

export const categoriesAPI = new CategoriesAPI();