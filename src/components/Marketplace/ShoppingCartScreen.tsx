
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Layout/Header';
import { CartItem } from '@/types/marketplace';

interface ShoppingCartScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const ShoppingCartScreen: React.FC<ShoppingCartScreenProps> = ({
  cartItems,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingFee = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="سلة التسوق" 
          onBack={onBack}
          showProfile={false}
        />
        
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">سلة التسوق فارغة</h2>
            <p className="text-gray-600 mb-6">أضف منتجات لتبدأ التسوق</p>
            <Button onClick={onBack}>
              <ShoppingBag className="h-5 w-5 ml-2" />
              تصفح المنتجات
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="سلة التسوق" 
        onBack={onBack}
        showProfile={false}
      />
      
      <div className="px-4 py-4 pb-32">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.product.imageUrls[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 flex-1 leading-tight">
                        {item.product.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onRemoveItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {item.product.price} ج.م
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {item.product.originalPrice} ج.م
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Item Total */}
                      <span className="font-bold text-gray-900">
                        {item.product.price * item.quantity} ج.م
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Summary - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>المجموع الفرعي</span>
                <span>{subtotal} ج.م</span>
              </div>
              
              <div className="flex justify-between text-gray-700">
                <span>رسوم الشحن</span>
                <span>{shippingFee} ج.م</span>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>الإجمالي</span>
                  <span>{total} ج.م</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full h-12 text-lg"
          onClick={onCheckout}
        >
          إتمام الشراء
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCartScreen;
