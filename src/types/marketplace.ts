
export interface ProductReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrls: string[];
  description: string;
  specifications?: string[];
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  isExpertRecommended?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  governorate: string;
  city: string;
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
}

export interface PaymentMethod {
  type: 'cash' | 'credit_card';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolderName?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  total: number;
  estimatedDelivery: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}
