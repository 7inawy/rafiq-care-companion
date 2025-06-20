
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/marketplace';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onProductClick, 
  onAddToCart 
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onProductClick(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow duration-200 relative"
      onClick={handleCardClick}
    >
      <CardContent className="p-3">
        {/* Product Image */}
        <div className="relative mb-3">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg"
          />
          
          {/* Expert Recommendation Badge */}
          {product.isExpertRecommended && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs"
            >
              ترشيح خبير
            </Badge>
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                غير متوفر
              </Badge>
            </div>
          )}

          {/* Quick Add to Cart Button */}
          {product.inStock && (
            <Button
              size="sm"
              className="absolute bottom-2 left-2 h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {product.price} ج.م
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice} ج.م
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
