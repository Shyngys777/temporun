import { supabase } from '../supabase';
import type { Database } from '../database.types';
import type { ProductWithDetails } from './products';

type Collection = Database['public']['Tables']['collections']['Row'];

export interface CollectionWithProducts extends Collection {
  products: ProductWithDetails[];
  product_count: number;
}

class CollectionsAPI {
  async getCollections(activeOnly = true): Promise<Collection[]> {
    let query = supabase
      .from('collections')
      .select('*')
      .order('sort_order', { ascending: true });

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }

    return data || [];
  }

  async getCollectionBySlug(slug: string): Promise<CollectionWithProducts | null> {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        *,
        product_collections(
          sort_order,
          product:products(
            *,
            brand:brands(*),
            category:categories(*),
            variants:product_variants(
              *,
              inventory(*)
            ),
            images:product_images(*),
            tags:product_tags(*)
          )
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching collection:', error);
      return null;
    }

    if (!data) return null;

    // Transform the data
    const products: ProductWithDetails[] = (data.product_collections || [])
      .map(pc => pc.product)
      .filter(Boolean)
      .map(product => {
        const primaryImage = product.images?.find(img => img.is_primary)?.url || 
                            product.images?.[0]?.url || '';
        
        const availableSizes = product.variants
          ?.filter(v => v.is_active && (v.inventory?.quantity || 0) > 0)
          .map(v => v.size)
          .filter(Boolean)
          .sort() || [];
        
        const inStock = product.variants?.some(v => 
          v.is_active && (v.inventory?.quantity || 0) > 0
        ) || false;
        
        const prices = product.variants
          ?.filter(v => v.is_active)
          .map(v => v.price || product.base_price) || [product.base_price];
        
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        return {
          ...product,
          primary_image: primaryImage,
          available_sizes: availableSizes,
          in_stock: inStock,
          min_price: minPrice,
          max_price: maxPrice
        } as ProductWithDetails;
      });

    return {
      ...data,
      products,
      product_count: products.length
    };
  }

  async getFeaturedCollections(): Promise<Collection[]> {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching featured collections:', error);
      throw error;
    }

    return data || [];
  }
}

export const collectionsAPI = new CollectionsAPI();