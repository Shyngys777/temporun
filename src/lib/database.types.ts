export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          website_url: string | null
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          image_url: string | null
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          brand_id: string
          category_id: string | null
          base_price: number
          compare_at_price: number | null
          cost_price: number | null
          sku: string | null
          weight: number | null
          gender: 'men' | 'women' | 'unisex'
          is_active: boolean
          is_featured: boolean
          is_new: boolean
          release_date: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          brand_id: string
          category_id?: string | null
          base_price: number
          compare_at_price?: number | null
          cost_price?: number | null
          sku?: string | null
          weight?: number | null
          gender?: 'men' | 'women' | 'unisex'
          is_active?: boolean
          is_featured?: boolean
          is_new?: boolean
          release_date?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          brand_id?: string
          category_id?: string | null
          base_price?: number
          compare_at_price?: number | null
          cost_price?: number | null
          sku?: string | null
          weight?: number | null
          gender?: 'men' | 'women' | 'unisex'
          is_active?: boolean
          is_featured?: boolean
          is_new?: boolean
          release_date?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          sku: string | null
          price: number | null
          compare_at_price: number | null
          size: string | null
          color: string | null
          colorway: string | null
          material: string | null
          weight: number | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          sku?: string | null
          price?: number | null
          compare_at_price?: number | null
          size?: string | null
          color?: string | null
          colorway?: string | null
          material?: string | null
          weight?: number | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          sku?: string | null
          price?: number | null
          compare_at_price?: number | null
          size?: string | null
          color?: string | null
          colorway?: string | null
          material?: string | null
          weight?: number | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          variant_id: string | null
          url: string
          alt_text: string | null
          is_primary: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          variant_id?: string | null
          url: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          variant_id?: string | null
          url?: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      product_tags: {
        Row: {
          id: string
          product_id: string
          tag: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          tag: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          tag?: string
          created_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          variant_id: string
          quantity: number
          reserved_quantity: number
          low_stock_threshold: number
          track_inventory: boolean
          allow_backorder: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          variant_id: string
          quantity?: number
          reserved_quantity?: number
          low_stock_threshold?: number
          track_inventory?: boolean
          allow_backorder?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          variant_id?: string
          quantity?: number
          reserved_quantity?: number
          low_stock_threshold?: number
          track_inventory?: boolean
          allow_backorder?: boolean
          updated_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_collections: {
        Row: {
          id: string
          product_id: string
          collection_id: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          collection_id: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          collection_id?: string
          sort_order?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}