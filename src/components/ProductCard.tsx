
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  colorway: string;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  className?: string;
}

const ProductCard = ({
                       id,
                       name,
                       brand,
                       price,
                       originalPrice,
                       colorway,
                       image,
                       isNew = false,
                       isSale = false,
                       className,
                     }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const discountPercentage = originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation

    addToCart({
      id,
      name,
      brand,
      price,
      image,
      colorway
    });

    toast({
      title: "Added to cart",
      description: `${brand} ${name} has been added to your cart.`,
    });
  };

  return (
      <div
          className={cn("group relative", className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
          <Link to={`/product/${id}`}>
            <img
                src={image}
                alt={`${brand} ${name}`}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />
          </Link>

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
                <Badge variant="secondary" className="font-medium">
                  New
                </Badge>
            )}
            {isSale && (
                <Badge variant="destructive" className="font-medium">
                  -{discountPercentage}%
                </Badge>
            )}
          </div>

          <div
              className={cn(
                  "absolute bottom-0 inset-x-0 flex justify-between p-3 bg-gradient-to-t from-black/20 to-transparent",
                  "opacity-0 transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
              )}
          >
            <Button
                size="sm"
                className="bg-white text-black hover:bg-white/90 transition-all rounded-full w-full"
                onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-black/80">{brand}</h3>
            <h2 className="text-base font-medium mt-1">
              <Link to={`/product/${id}`} className="hover:underline">
                {name}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-black/60">{colorway}</p>
            <div className="mt-1 flex items-center">
              <p className="font-medium">${price.toFixed(2)}</p>
              {originalPrice && (
                  <p className="ml-2 text-sm text-black/60 line-through">${originalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>

          <Button variant="ghost" size="icon" className="text-black/70 hover:text-black">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
  );
};

export default ProductCard;