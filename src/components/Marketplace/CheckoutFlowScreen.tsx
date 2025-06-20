
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, CreditCard, Truck } from 'lucide-react';
import Header from '@/components/Layout/Header';
import { CartItem, ShippingAddress, PaymentMethod } from '@/types/marketplace';
import { egyptianGovernorates, governorateCities } from '@/data/marketplaceData';

interface CheckoutFlowScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

const CheckoutFlowScreen: React.FC<CheckoutFlowScreenProps> = ({
  cartItems,
  onBack,
  onOrderComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    governorate: '',
    city: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'cash'
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingFee = 50;
  const total = subtotal + shippingFee;

  const steps = [
    { number: 1, title: 'العنوان', icon: <Truck className="h-4 w-4" /> },
    { number: 2, title: 'الدفع', icon: <CreditCard className="h-4 w-4" /> },
    { number: 3, title: 'تأكيد', icon: <Check className="h-4 w-4" /> }
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onOrderComplete();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return shippingAddress.fullName && shippingAddress.phone && 
               shippingAddress.governorate && shippingAddress.city && 
               shippingAddress.street && shippingAddress.buildingNumber;
      case 2:
        return paymentMethod.type === 'cash' || 
               (paymentMethod.cardNumber && paymentMethod.expiryDate && paymentMethod.cvv);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const availableCities = shippingAddress.governorate ? 
    governorateCities[shippingAddress.governorate] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="إتمام الشراء" 
        onBack={handlePreviousStep}
        showProfile={false}
      />
      
      <div className="px-4 py-4 pb-32">
        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${currentStep >= step.number 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                  }
                `}>
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-px w-12 mx-2 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                عنوان الشحن
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">الاسم كاملاً *</Label>
                <Input
                  id="fullName"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({
                    ...shippingAddress,
                    fullName: e.target.value
                  })}
                  placeholder="أدخل اسمك كاملاً"
                />
              </div>

              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value
                  })}
                  placeholder="01xxxxxxxxx"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>المحافظة *</Label>
                  <Select
                    value={shippingAddress.governorate}
                    onValueChange={(value) => setShippingAddress({
                      ...shippingAddress,
                      governorate: value,
                      city: '' // Reset city when governorate changes
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المحافظة" />
                    </SelectTrigger>
                    <SelectContent>
                      {egyptianGovernorates.map((gov) => (
                        <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>المدينة *</Label>
                  <Select
                    value={shippingAddress.city}
                    onValueChange={(value) => setShippingAddress({
                      ...shippingAddress,
                      city: value
                    })}
                    disabled={!shippingAddress.governorate}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="street">الشارع *</Label>
                <Input
                  id="street"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({
                    ...shippingAddress,
                    street: e.target.value
                  })}
                  placeholder="اسم الشارع"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buildingNumber">رقم المبنى *</Label>
                  <Input
                    id="buildingNumber"
                    value={shippingAddress.buildingNumber}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      buildingNumber: e.target.value
                    })}
                    placeholder="رقم المبنى"
                  />
                </div>

                <div>
                  <Label htmlFor="apartmentNumber">رقم الشقة</Label>
                  <Input
                    id="apartmentNumber"
                    value={shippingAddress.apartmentNumber || ''}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      apartmentNumber: e.target.value
                    })}
                    placeholder="رقم الشقة (اختياري)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                طريقة الدفع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod.type}
                onValueChange={(value) => setPaymentMethod({
                  type: value as 'cash' | 'credit_card'
                })}
              >
                <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💵</div>
                      <div>
                        <div className="font-semibold">الدفع عند الاستلام</div>
                        <div className="text-sm text-gray-600">ادفع نقداً عند وصول الطلب</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💳</div>
                      <div>
                        <div className="font-semibold">البطاقة الائتمانية</div>
                        <div className="text-sm text-gray-600">ادفع بالبطاقة الائتمانية الآن</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod.type === 'credit_card' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">رقم البطاقة</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      onChange={(e) => setPaymentMethod({
                        ...paymentMethod,
                        cardNumber: e.target.value
                      })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        onChange={(e) => setPaymentMethod({
                          ...paymentMethod,
                          expiryDate: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        onChange={(e) => setPaymentMethod({
                          ...paymentMethod,
                          cvv: e.target.value
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardHolderName">اسم حامل البطاقة</Label>
                    <Input
                      id="cardHolderName"
                      placeholder="كما هو مكتوب على البطاقة"
                      onChange={(e) => setPaymentMethod({
                        ...paymentMethod,
                        cardHolderName: e.target.value
                      })}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-gray-600">الكمية: {item.quantity}</div>
                      </div>
                      <div className="font-semibold">
                        {item.product.price * item.quantity} ج.م
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{subtotal} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم الشحن</span>
                      <span>{shippingFee} ج.م</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي</span>
                      <span>{total} ج.م</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>عنوان الشحن</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="font-semibold">{shippingAddress.fullName}</div>
                  <div>{shippingAddress.phone}</div>
                  <div>
                    {shippingAddress.street}، مبنى {shippingAddress.buildingNumber}
                    {shippingAddress.apartmentNumber && `، شقة ${shippingAddress.apartmentNumber}`}
                  </div>
                  <div>{shippingAddress.city}، {shippingAddress.governorate}</div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>طريقة الدفع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {paymentMethod.type === 'cash' ? '💵' : '💳'}
                  </div>
                  <span>
                    {paymentMethod.type === 'cash' ? 'الدفع عند الاستلام' : 'البطاقة الائتمانية'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handlePreviousStep}
            className="flex-1"
          >
            {currentStep === 1 ? 'العودة' : 'السابق'}
          </Button>
          <Button 
            onClick={handleNextStep}
            disabled={!isStepValid(currentStep)}
            className="flex-1"
          >
            {currentStep === 3 ? 'تأكيد الطلب' : 'التالي'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlowScreen;
