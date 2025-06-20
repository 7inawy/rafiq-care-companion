
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart } from 'lucide-react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import ProductCard from './ProductCard';
import { mockProducts, productCategories } from '@/data/marketplaceData';
import { Product } from '@/types/marketplace';

interface MarketplaceHomeScreenProps {
  onProductClick: (productId: string) => void;
  onCartClick: () => void;
  onAddToCart: (product: Product) => void;
  cartItemCount: number;
}

const MarketplaceHomeScreen: React.FC<MarketplaceHomeScreenProps> = ({
  onProductClick,
  onCartClick,
  onAddToCart,
  cartItemCount
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'therapy-tools' && product.category === 'أدوات علاجية') ||
      (selectedCategory === 'developmental-toys' && product.category === 'ألعاب تنمية') ||
      (selectedCategory === 'health-devices' && product.category === 'أجهزة صحية') ||
      (selectedCategory === 'books-resources' && product.category === 'كتب ومصادر');
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const expertRecommendedProducts = mockProducts.filter(p => p.isExpertRecommended).slice(0, 3);

  const navigationItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: '🏠', isActive: false },
    { id: 'marketplace', label: 'المتجر', icon: '🛍️', isActive: true },
    { id: 'profile', label: 'الملف', icon: '👤', isActive: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="المتجر" 
        showProfile={false}
      />
      
      <div className="px-4 py-4 pb-20">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="ابحث عن المنتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {productCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap flex items-center gap-2"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Expert Recommendations */}
        {selectedCategory === 'all' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">ترشيحات الخبراء</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                موصى به
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {expertRecommendedProducts.map((product) => (
                <div key={product.id} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex gap-4">
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{product.price} ج.م</span>
                        <Button 
                          size="sm"
                          onClick={() => onProductClick(product.id)}
                        >
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {selectedCategory === 'all' ? 'جميع المنتجات' : 
             productCategories.find(c => c.id === selectedCategory)?.name}
          </h2>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد منتجات</h3>
              <p className="text-gray-600">جرب البحث بكلمات أخرى أو اختر فئة مختلفة</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <Button
        className="fixed bottom-20 left-4 h-14 w-14 rounded-full shadow-lg z-40"
        onClick={onCartClick}
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cartItemCount}
            </Badge>
          )}
        </div>
      </Button>

      <BottomNavigation
        items={navigationItems}
        onItemClick={(id) => {
          if (id === 'dashboard') {
            // Handle navigation to dashboard
          }
        }}
      />
    </div>
  );
};

export default MarketplaceHomeScreen;
