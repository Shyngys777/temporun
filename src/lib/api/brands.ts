import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Brand = Database['public']['Tables']['brands']['Row'];

export interface BrandWithProductCount extends Brand {
  product_count: number;
}

class BrandsAPI {
  async getBrands(featuredOnly = false): Promise<Brand[]> {
    let query = supabase
      .from('brands')
      .select('*')
      .order('sort_order', { ascending: true });

    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }

    return data || [];
  }

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching brand:', error);
      return null;
    }

    return data;
  }

  async getBrandsWithProductCount(): Promise<BrandWithProductCount[]> {
    const { data, error } = await supabase
      .from('brands')
      .select(`
        *,
        products!inner(count)
      `)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching brands with product count:', error);
      throw error;
    }

    return (data || []).map(brand => ({
      ...brand,
      product_count: brand.products?.[0]?.count || 0
    })) as BrandWithProductCount[];
  }

  async getFeaturedBrands(): Promise<Brand[]> {
    return this.getBrands(true);
  }
}

export const brandsAPI = new BrandsAPI();