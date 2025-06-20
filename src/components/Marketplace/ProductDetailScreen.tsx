
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, ShoppingCart, Heart, Share } from 'lucide-react';
import Header from '@/components/Layout/Header';
import { mockProducts } from '@/data/marketplaceData';
import { Product } from '@/types/marketplace';

interface ProductDetailScreenProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  productId,
  onBack,
  onAddToCart
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">المنتج غير موجود</h2>
          <Button onClick={onBack}>العودة للمتجر</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="تفاصيل المنتج" 
        onBack={onBack}
        showProfile={false}
      />
      
      <div className="pb-4">
        {/* Image Gallery */}
        <div className="bg-white px-4 py-4 mb-4">
          <div className="relative mb-4">
            <img
              src={product.imageUrls[selectedImageIndex]}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            
            {/* Expert Recommendation Badge */}
            {product.isExpertRecommended && (
              <Badge 
                variant="secondary" 
                className="absolute top-3 right-3 bg-green-100 text-green-800"
              >
                ترشيح خبير
              </Badge>
            )}

            {/* Favorite Button */}
            <Button
              size="sm"
              variant="outline"
              className="absolute top-3 left-3 h-10 w-10 p-0 rounded-full bg-white"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
          </div>

          {/* Image Thumbnails */}
          {product.imageUrls.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.imageUrls.map((url, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="bg-white px-4 py-4 mb-4">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviewCount} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-primary">{product.price} ج.م</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {product.inStock ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  متوفر في المخزن
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  غير متوفر حالياً
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 h-12"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 ml-2" />
              {product.inStock ? 'أضف إلى السلة' : 'غير متوفر'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-12 w-12 p-0"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Details Accordion */}
        <div className="bg-white px-4 py-4">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-right">الوصف</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </AccordionContent>
            </AccordionItem>

            {product.specifications && (
              <AccordionItem value="specifications">
                <AccordionTrigger className="text-right">المواصفات</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary text-sm">•</span>
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="reviews">
              <AccordionTrigger className="text-right">
                التقييمات ({product.reviewCount})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {review.reviewerName}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
