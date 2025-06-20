
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Home, Phone, Package } from 'lucide-react';

interface OrderConfirmationScreenProps {
  onBackToMarketplace: () => void;
  onBackToDashboard: () => void;
}

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  onBackToMarketplace,
  onBackToDashboard
}) => {
  // Mock order data
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Success Animation/Icon */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          {/* Success Icon */}
          <div className="relative mx-auto mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            تم استلام طلبك بنجاح!
          </h1>
          <p className="text-gray-600 mb-6">
            شكراً لك على الثقة. سنقوم بتجهيز طلبك في أقرب وقت
          </p>

          {/* Order Details Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Order Number */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">رقم الطلب</span>
                  <Badge variant="outline" className="font-mono">
                    {orderNumber}
                  </Badge>
                </div>

                {/* Estimated Delivery */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">التسليم المتوقع</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{estimatedDelivery}</div>
                    <div className="text-sm text-gray-500">خلال 2-3 أيام عمل</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">حالة الطلب</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    قيد التجهيز
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">الخطوات التالية</h3>
              <div className="space-y-3 text-right">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">تجهيز الطلب</div>
                    <div className="text-gray-600">سنقوم بتجهيز وتعبئة منتجاتك بعناية</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">تأكيد الموعد</div>
                    <div className="text-gray-600">سنتصل بك لتأكيد موعد التسليم المناسب</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Home className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">التسليم</div>
                    <div className="text-gray-600">سيصل طلبك إلى باب منزلك في الموعد المحدد</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">تحتاج مساعدة؟</h4>
            <p className="text-blue-700 text-sm mb-2">
              تواصل معنا على الرقم: 16123
            </p>
            <p className="text-blue-700 text-sm">
              أو عبر البريد الإلكتروني: support@rafiqlady.com
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-8 space-y-3">
        <Button 
          className="w-full h-12"
          onClick={onBackToMarketplace}
        >
          العودة للمتجر
        </Button>
        
        <Button 
          variant="outline"
          className="w-full h-12"
          onClick={onBackToDashboard}
        >
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;
