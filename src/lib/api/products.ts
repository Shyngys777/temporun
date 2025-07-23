import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Product = Database['public']['Tables']['products']['Row'];
type Brand = Database['public']['Tables']['brands']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type ProductVariant = Database['public']['Tables']['product_variants']['Row'];
type ProductImage = Database['public']['Tables']['product_images']['Row'];
type ProductTag = Database['public']['Tables']['product_tags']['Row'];
type Inventory = Database['public']['Tables']['inventory']['Row'];

export interface ProductWithDetails extends Product {
  brand: Brand;
  category: Category | null;
  variants: (ProductVariant & { inventory: Inventory | null })[];
  images: ProductImage[];
  tags: ProductTag[];
  primary_image?: string;
  available_sizes: string[];
  in_stock: boolean;
  min_price: number;
  max_price: number;
}

export interface ProductFilters {
  brand?: string;
  category?: string;
  gender?: 'men' | 'women' | 'unisex';
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  search?: string;
}

export interface ProductSort {
  field: 'name' | 'base_price' | 'created_at' | 'updated_at';
  direction: 'asc' | 'desc';
}

class ProductsAPI {
  async getProducts(
    filters: ProductFilters = {},
    sort: ProductSort = { field: 'created_at', direction: 'desc' },
    limit = 50,
    offset = 0
  ): Promise<{ data: ProductWithDetails[]; count: number | null }> {
    let query = supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        category:categories(*),
        variants:product_variants(
          *,
          inventory(*)
        ),
        images:product_images(*),
        tags:product_tags(*)
      `, { count: 'exact' })
      .eq('is_active', true);

    // Apply filters
    if (filters.brand) {
      query = query.eq('brand.slug', filters.brand);
    }
    
    if (filters.category) {
      query = query.eq('category.slug', filters.category);
    }
    
    if (filters.gender) {
      query = query.eq('gender', filters.gender);
    }
    
    if (filters.minPrice) {
      query = query.gte('base_price', filters.minPrice);
    }
    
    if (filters.maxPrice) {
      query = query.lte('base_price', filters.maxPrice);
    }
    
    if (filters.isNew !== undefined) {
      query = query.eq('is_new', filters.isNew);
    }
    
    if (filters.isFeatured !== undefined) {
      query = query.eq('is_featured', filters.isFeatured);
    }
    
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Apply sorting
    query = query.order(sort.field, { ascending: sort.direction === 'asc' });
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    // Transform data to include computed fields
    const transformedData: ProductWithDetails[] = (data || []).map(product => {
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

    return { data: transformedData, count };
  }

  async getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        category:categories(*),
        variants:product_variants(
          *,
          inventory(*)
        ),
        images:product_images(*),
        tags:product_tags(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    if (!data) return null;

    // Transform data similar to getProducts
    const primaryImage = data.images?.find(img => img.is_primary)?.url || 
                        data.images?.[0]?.url || '';
    
    const availableSizes = data.variants
      ?.filter(v => v.is_active && (v.inventory?.quantity || 0) > 0)
      .map(v => v.size)
      .filter(Boolean)
      .sort() || [];
    
    const inStock = data.variants?.some(v => 
      v.is_active && (v.inventory?.quantity || 0) > 0
    ) || false;
    
    const prices = data.variants
      ?.filter(v => v.is_active)
      .map(v => v.price || data.base_price) || [data.base_price];
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      ...data,
      primary_image: primaryImage,
      available_sizes: availableSizes,
      in_stock: inStock,
      min_price: minPrice,
      max_price: maxPrice
    } as ProductWithDetails;
  }

  async getFeaturedProducts(limit = 8): Promise<ProductWithDetails[]> {
    const { data } = await this.getProducts(
      { isFeatured: true },
      { field: 'created_at', direction: 'desc' },
      limit
    );
    return data;
  }

  async getNewArrivals(limit = 8): Promise<ProductWithDetails[]> {
    const { data } = await this.getProducts(
      { isNew: true },
      { field: 'created_at', direction: 'desc' },
      limit
    );
    return data;
  }

  async getProductsByBrand(brandSlug: string, limit = 50): Promise<ProductWithDetails[]> {
    const { data } = await this.getProducts(
      { brand: brandSlug },
      { field: 'created_at', direction: 'desc' },
      limit
    );
    return data;
  }

  async getProductsByCategory(categorySlug: string, limit = 50): Promise<ProductWithDetails[]> {
    const { data } = await this.getProducts(
      { category: categorySlug },
      { field: 'created_at', direction: 'desc' },
      limit
    );
    return data;
  }

  async getSaleProducts(limit = 50): Promise<ProductWithDetails[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        category:categories(*),
        variants:product_variants(
          *,
          inventory(*)
        ),
        images:product_images(*),
        tags:product_tags(*)
      `)
      .eq('is_active', true)
      .not('compare_at_price', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching sale products:', error);
      return [];
    }

    return (data || []).map(product => {
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
  }

  async searchProducts(query: string, limit = 20): Promise<ProductWithDetails[]> {
    const { data } = await this.getProducts(
      { search: query },
      { field: 'name', direction: 'asc' },
      limit
    );
    return data;
  }
}

export const productsAPI = new ProductsAPI();