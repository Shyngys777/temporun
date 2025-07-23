/*
  # Seed Initial E-commerce Data

  1. Sample Data
    - Insert sample brands (Nike, Adidas, etc.)
    - Insert categories (Road Running, Trail, etc.)
    - Insert sample products with variants
    - Insert product images and tags
    - Set up initial inventory

  2. Collections
    - New Arrivals collection
    - Featured Products collection
    - Sale Items collection
*/

-- Insert brands
INSERT INTO brands (name, slug, description, logo_url, is_featured, sort_order) VALUES
('Nike', 'nike', 'Just Do It. Innovation and inspiration for every athlete in the world.', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', true, 1),
('Adidas', 'adidas', 'Impossible is Nothing. Creating the new through sport.', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', true, 2),
('ASICS', 'asics', 'Sound Mind, Sound Body. Moving you forward.', 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Asics_Logo.svg', true, 3),
('New Balance', 'new-balance', 'Fearlessly Independent Since 1906.', 'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg', true, 4),
('Brooks', 'brooks', 'Run Happy. We inspire everyone to run and be active.', 'https://cdn.freebiesupply.com/logos/large/2x/brooks-2-logo-png-transparent.png', true, 5),
('Hoka', 'hoka', 'Time to Fly. Maximalist running shoes.', 'https://upload.wikimedia.org/wikipedia/commons/9/98/Hoka_One_One_logo.svg', true, 6),
('Saucony', 'saucony', 'Find Your Strong. Run for Good.', 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Saucony_logo.svg', true, 7),
('On', 'on', 'Engineered for running. Born in the Swiss Alps.', 'https://upload.wikimedia.org/wikipedia/commons/8/83/On_logo.svg', false, 8);

-- Insert categories
INSERT INTO categories (name, slug, description, image_url, is_featured, sort_order) VALUES
('Road Running', 'road-running', 'Engineered for speed and comfort on paved surfaces', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true, 1),
('Trail Running', 'trail-running', 'Rugged designs for challenging off-road terrain', 'https://images.unsplash.com/photo-1665859618005-9dadcf72f369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true, 2),
('Competition', 'competition', 'Ultralight racing shoes built for personal records', 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true, 3),
('Daily Trainers', 'daily-trainers', 'Reliable shoes for everyday running', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true, 4),
('Stability', 'stability', 'Supportive shoes for runners who need gait correction', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true, 5),
('Cushioned', 'cushioned', 'Maximum comfort for long-distance running', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', true, 6);

-- Insert collections
INSERT INTO collections (name, slug, description, is_featured, sort_order) VALUES
('New Arrivals', 'new-arrivals', 'Latest releases and newest innovations', true, 1),
('Featured Products', 'featured', 'Our top recommended running shoes', true, 2),
('Sale Items', 'sale', 'Special offers and discounted products', true, 3),
('Best Sellers', 'best-sellers', 'Most popular products among runners', true, 4);

-- Insert sample products (using brand and category IDs)
DO $$
DECLARE
    nike_id uuid;
    adidas_id uuid;
    asics_id uuid;
    road_category_id uuid;
    trail_category_id uuid;
    competition_category_id uuid;
    new_arrivals_id uuid;
    featured_id uuid;
    sale_id uuid;
    
    -- Product IDs for later reference
    pegasus_id uuid;
    ultraboost_id uuid;
    kayano_id uuid;
BEGIN
    -- Get brand IDs
    SELECT id INTO nike_id FROM brands WHERE slug = 'nike';
    SELECT id INTO adidas_id FROM brands WHERE slug = 'adidas';
    SELECT id INTO asics_id FROM brands WHERE slug = 'asics';
    
    -- Get category IDs
    SELECT id INTO road_category_id FROM categories WHERE slug = 'road-running';
    SELECT id INTO trail_category_id FROM categories WHERE slug = 'trail-running';
    SELECT id INTO competition_category_id FROM categories WHERE slug = 'competition';
    
    -- Get collection IDs
    SELECT id INTO new_arrivals_id FROM collections WHERE slug = 'new-arrivals';
    SELECT id INTO featured_id FROM collections WHERE slug = 'featured';
    SELECT id INTO sale_id FROM collections WHERE slug = 'sale';

    -- Insert Nike Pegasus 40
    INSERT INTO products (
        name, slug, description, short_description, brand_id, category_id, 
        base_price, sku, gender, is_active, is_featured, is_new,
        meta_title, meta_description
    ) VALUES (
        'Air Zoom Pegasus 40',
        'nike-air-zoom-pegasus-40',
        'The Nike Air Zoom Pegasus 40 continues to put a spring in your step, using the same responsive foam as its predecessor. Whether you''re logging long marathon miles or a short jog around the neighborhood, it''s still one of our most tested shoes.',
        'Responsive daily trainer with Air Zoom technology',
        nike_id,
        road_category_id,
        129.99,
        'NIKE-PEG40-001',
        'unisex',
        true,
        true,
        true,
        'Nike Air Zoom Pegasus 40 - Premium Running Shoes',
        'Experience the legendary comfort of Nike Pegasus 40 with responsive Air Zoom technology'
    ) RETURNING id INTO pegasus_id;

    -- Insert Adidas Ultraboost 23
    INSERT INTO products (
        name, slug, description, short_description, brand_id, category_id,
        base_price, compare_at_price, sku, gender, is_active, is_featured,
        meta_title, meta_description
    ) VALUES (
        'Ultraboost 23',
        'adidas-ultraboost-23',
        'Made with a series of recycled materials, this upper features at least 50% recycled content. This product represents just one of our solutions to help end plastic waste.',
        'Energy-returning running shoes with Boost technology',
        adidas_id,
        road_category_id,
        189.99,
        199.99,
        'ADIDAS-UB23-001',
        'unisex',
        true,
        true,
        'Adidas Ultraboost 23 - Energy Return Running Shoes',
        'Feel the energy return with Adidas Ultraboost 23 featuring Boost cushioning technology'
    ) RETURNING id INTO ultraboost_id;

    -- Insert ASICS Gel-Kayano 30
    INSERT INTO products (
        name, slug, description, short_description, brand_id, category_id,
        base_price, sku, gender, is_active, is_featured,
        meta_title, meta_description
    ) VALUES (
        'GEL-Kayano 30',
        'asics-gel-kayano-30',
        'The GEL-KAYANO 30 shoe creates a stable stride that moves you towards a balanced mindset. Featuring a low-profile external heel counter, this piece cradles your foot with advanced rearfoot support.',
        'Premium stability running shoe with GEL technology',
        asics_id,
        road_category_id,
        169.99,
        'ASICS-GK30-001',
        'unisex',
        true,
        true,
        'ASICS GEL-Kayano 30 - Stability Running Shoes',
        'Experience superior stability and comfort with ASICS GEL-Kayano 30'
    ) RETURNING id INTO kayano_id;

    -- Insert product variants for Pegasus 40
    INSERT INTO product_variants (product_id, name, sku, size, color, colorway, sort_order) VALUES
    (pegasus_id, 'Size 8 - Black/White', 'NIKE-PEG40-001-8-BW', '8', 'Black', 'Black/White', 1),
    (pegasus_id, 'Size 8.5 - Black/White', 'NIKE-PEG40-001-85-BW', '8.5', 'Black', 'Black/White', 2),
    (pegasus_id, 'Size 9 - Black/White', 'NIKE-PEG40-001-9-BW', '9', 'Black', 'Black/White', 3),
    (pegasus_id, 'Size 9.5 - Black/White', 'NIKE-PEG40-001-95-BW', '9.5', 'Black', 'Black/White', 4),
    (pegasus_id, 'Size 10 - Black/White', 'NIKE-PEG40-001-10-BW', '10', 'Black', 'Black/White', 5),
    (pegasus_id, 'Size 8 - Blue/Orange', 'NIKE-PEG40-001-8-BO', '8', 'Blue', 'Blue/Orange', 6),
    (pegasus_id, 'Size 9 - Blue/Orange', 'NIKE-PEG40-001-9-BO', '9', 'Blue', 'Blue/Orange', 7),
    (pegasus_id, 'Size 10 - Blue/Orange', 'NIKE-PEG40-001-10-BO', '10', 'Blue', 'Blue/Orange', 8);

    -- Insert product images
    INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order) VALUES
    (pegasus_id, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7e5bbb8c-a97b-4aea-9c23-cc7f6fb21e70/pegasus-38-road-running-shoes-1VHfGW.png', 'Nike Air Zoom Pegasus 40 - Main View', true, 1),
    (ultraboost_id, 'https://cdn.sportsshoes.com/product/A/ADI17814/ADI17814_400_1.jpg', 'Adidas Ultraboost 23 - Main View', true, 1),
    (kayano_id, 'https://images.asics.com/is/image/asics/1011B189_003_SR_RT_GLB?$sfcc-product$', 'ASICS GEL-Kayano 30 - Main View', true, 1);

    -- Insert product tags
    INSERT INTO product_tags (product_id, tag) VALUES
    (pegasus_id, 'cushioned'),
    (pegasus_id, 'versatile'),
    (pegasus_id, 'daily-trainer'),
    (pegasus_id, 'road-running'),
    (ultraboost_id, 'energy-return'),
    (ultraboost_id, 'boost-technology'),
    (ultraboost_id, 'road-running'),
    (ultraboost_id, 'premium'),
    (kayano_id, 'stability'),
    (kayano_id, 'support'),
    (kayano_id, 'gel-technology'),
    (kayano_id, 'overpronation');

    -- Add products to collections
    INSERT INTO product_collections (product_id, collection_id, sort_order) VALUES
    (pegasus_id, new_arrivals_id, 1),
    (pegasus_id, featured_id, 1),
    (ultraboost_id, featured_id, 2),
    (ultraboost_id, sale_id, 1),
    (kayano_id, featured_id, 3);

    -- Insert inventory for variants
    INSERT INTO inventory (variant_id, quantity, low_stock_threshold)
    SELECT id, 
           CASE 
               WHEN size IN ('9', '9.5', '10') THEN floor(random() * 20 + 10)::integer
               ELSE floor(random() * 15 + 5)::integer
           END,
           5
    FROM product_variants 
    WHERE product_id IN (pegasus_id, ultraboost_id, kayano_id);

END $$;