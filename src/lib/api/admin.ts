import { supabase } from '../supabase';
import type { Database } from '../database.types';

type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];
type BrandInsert = Database['public']['Tables']['brands']['Insert'];
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

// Admin API for managing products, brands, and categories
// This would typically be protected by admin authentication

class AdminAPI {
  // Product management
  async createProduct(product: ProductInsert) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProduct(id: string, updates: ProductUpdate) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Brand management
  async createBrand(brand: BrandInsert) {
    const { data, error } = await supabase
      .from('brands')
      .insert(brand)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateBrand(id: string, updates: Partial<BrandInsert>) {
    const { data, error } = await supabase
      .from('brands')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Category management
  async createCategory(category: CategoryInsert) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateCategory(id: string, updates: Partial<CategoryInsert>) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Inventory management
  async updateInventory(variantId: string, quantity: number) {
    const { data, error } = await supabase
      .from('inventory')
      .upsert({
        variant_id: variantId,
        quantity,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Bulk operations
  async bulkUpdatePrices(updates: { productId: string; newPrice: number }[]) {
    const promises = updates.map(({ productId, newPrice }) =>
      this.updateProduct(productId, { base_price: newPrice })
    );

    return Promise.all(promises);
  }

  async bulkUpdateInventory(updates: { variantId: string; quantity: number }[]) {
    const promises = updates.map(({ variantId, quantity }) =>
      this.updateInventory(variantId, quantity)
    );

    return Promise.all(promises);
  }
}

export const adminAPI = new AdminAPI();