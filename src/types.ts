export type ShoeCategory = 'all' | 'mens' | 'womens' | 'leather_luxury' | 'loafers' | 'offers' | 'new';

export interface ShoeColor {
  name: string;
  hex: string;
  code: string;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'mens' | 'womens' | 'loafers' | 'leather_luxury';
  badge?: string; // e.g. "إصدار ملكي", "الأكثر مبيعاً", "عرض خاص"
  price: number; // in EGP
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isLuxuryHandcrafted?: boolean;
  colors: ShoeColor[];
  sizes: number[];
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  shortDesc: string;
  description: string;
  leatherType: string;
  soleType: string;
  craftsmanshipOrigin: string; // e.g. "صناعة يدوية على الطراز الإيطالي"
  careTips: string[];
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  product: Product;
  selectedSize: number;
  selectedColor: ShoeColor;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  secondaryPhone?: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod'; // Cash on Delivery
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  promoCode?: string;
}

export interface FilterState {
  category: ShoeCategory;
  searchQuery: string;
  priceRange: [number, number];
  selectedSizes: number[];
  selectedColors: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
