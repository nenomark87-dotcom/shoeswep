/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, FilterState, ShoeCategory, PlacedOrder } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductCard } from './components/ProductCard';
import { ProductFilter } from './components/ProductFilter';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HeritageSection } from './components/HeritageSection';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CheckCircle2, Heart, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // --- Cart State (Hydrated from localStorage) ---
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cs_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial luxury item in cart for quick preview
    return [
      {
        id: 'cart-init-1',
        productId: PRODUCTS[0].id,
        product: PRODUCTS[0],
        selectedSize: 42,
        selectedColor: PRODUCTS[0].colors[0],
        quantity: 1,
      },
    ];
  });

  // --- Wishlist State (Hydrated from localStorage) ---
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cs_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [PRODUCTS[2].id]; // Penny loafer default in wishlist
  });

  // --- Promo Code State ---
  const [appliedPromo, setAppliedPromo] = useState<string>('CLASSIC10');

  // --- Filters & Search State ---
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
    priceRange: [2000, 5000],
    selectedSizes: [],
    selectedColors: [],
    sortBy: 'featured',
  });

  // --- Modals and Drawers Visibility ---
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // --- Toast Notification State ---
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('cs_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('cs_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // --- Cart Actions ---
  const handleAddToCart = (
    product: Product,
    size?: number,
    colorIndex: number = 0,
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes[0];
    const chosenColor = product.colors[colorIndex] || product.colors[0];
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor.code}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity,
        },
      ];
    });

    showToast(`تمت إضافة "${product.nameAr}" بمقاس ${chosenSize} إلى السلة!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('تم حذف المنتج من السلة', 'info');
  };

  // --- Wishlist Actions ---
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`تمت إزالة "${product.nameAr}" من المفضلة`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`تمت إضافة "${product.nameAr}" إلى المفضلة!`);
        return [...prev, product.id];
      }
    });
  };

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  // --- Promo Handling ---
  const handleApplyPromo = (code: string): boolean => {
    if (code === 'CLASSIC10') {
      setAppliedPromo('CLASSIC10');
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    showToast('تم إلغاء كود الخصم', 'info');
  };

  // --- Instant Buy from Product Detail ---
  const handleInstantBuy = (product: Product, size: number, colorIndex: number) => {
    handleAddToCart(product, size, colorIndex, 1);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  // --- Filter and Sort Logic ---
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (filters.category === 'mens') {
      result = result.filter((p) => p.category === 'mens');
    } else if (filters.category === 'womens') {
      result = result.filter((p) => p.category === 'womens');
    } else if (filters.category === 'loafers') {
      result = result.filter((p) => p.category === 'loafers');
    } else if (filters.category === 'leather_luxury') {
      result = result.filter((p) => p.isLuxuryHandcrafted || p.category === 'leather_luxury');
    } else if (filters.category === 'offers') {
      result = result.filter((p) => !!p.originalPrice && p.originalPrice > p.price);
    } else if (filters.category === 'new') {
      result = result.filter((p) => p.isNew);
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameAr.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.leatherType.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
    }

    // Size filter
    if (filters.selectedSizes.length > 0) {
      result = result.filter((p) =>
        filters.selectedSizes.some((size) => p.sizes.includes(size))
      );
    }

    // Color filter
    if (filters.selectedColors.length > 0) {
      result = result.filter((p) =>
        filters.selectedColors.some((cCode) =>
          p.colors.some((color) => color.code.toLowerCase().includes(cCode.toLowerCase()))
        )
      );
    }

    // Sorting
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [filters]);

  // Extract distinct sizes & colors for filter controls
  const allAvailableSizes = useMemo(() => {
    const sizeSet = new Set<number>();
    PRODUCTS.forEach((p) => p.sizes.forEach((s) => sizeSet.add(s)));
    return Array.from(sizeSet).sort((a, b) => a - b);
  }, []);

  const allAvailableColors = useMemo(() => {
    return [
      { name: 'أسود ملكي', hex: '#1C1B1B', code: 'black' },
      { name: 'بني شوكولاتة', hex: '#3B2317', code: 'dark-brown' },
      { name: 'كونياك / تان', hex: '#7A3F1F', code: 'cognac' },
      { name: 'كراميل دافئ', hex: '#945828', code: 'caramel' },
      { name: 'عاجي كريمي', hex: '#EDE6DA', code: 'ivory' },
      { name: 'أوكس بلود خمري', hex: '#471E20', code: 'oxblood' },
    ];
  }, []);

  const luxuryAtelierProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.isLuxuryHandcrafted || p.category === 'leather_luxury');
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241611] flex flex-col font-arabic selection:bg-[#C5A059]/30">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#241611] text-[#FAF7F2] border border-[#C5A059] px-5 py-3 rounded-xs shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentCategory={filters.category}
        onSelectCategory={(cat) => setFilters({ ...filters, category: cat })}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('contact-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSearch={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={filters.searchQuery}
        setSearchQuery={(q) => setFilters({ ...filters, searchQuery: q })}
      />

      {/* Hero Section */}
      <Hero
        onDiscoverClick={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onCraftsmanshipClick={() => {
          const el = document.getElementById('heritage-atelier');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Visual Collections Showcase */}
      <FeaturedCategories
        onSelectCategory={(cat) => {
          setFilters({ ...filters, category: cat });
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Product Catalog Section */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-right w-full flex-1">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-[1px] bg-[#C5A059]"></div>
            <span className="font-brand uppercase text-xs tracking-widest text-[#C5A059] font-bold">
              Artisan Footwear
            </span>
            <div className="w-8 h-[1px] bg-[#C5A059]"></div>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#241611]">
            تشكيلة الأحذية الكلاسيكية الفاخرة
          </h2>
          <p className="text-xs sm:text-base text-[#6E594B] mt-2 font-light">
            مصنوعة يدوياً من جلود العجل الإيطالية بأدق المعايير، مع إمكانية المعاينة والقياس عند الاستلام بجميع المحافظات
          </p>
        </div>

        {/* Filters and Controls */}
        <ProductFilter
          filters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
          totalProductsCount={filteredProducts.length}
          availableSizes={allAvailableSizes}
          availableColors={allAvailableColors}
          onResetFilters={() =>
            setFilters({
              category: 'all',
              searchQuery: '',
              priceRange: [2000, 5000],
              selectedSizes: [],
              selectedColors: [],
              sortBy: 'featured',
            })
          }
        />

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#FAF7F2] border border-[#DFD3BF] p-12 text-center rounded-sm max-w-md mx-auto my-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F3ECE0] text-[#7A6453] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#241611]">
              لم يتم العثور على أحذية مطابقة
            </h3>
            <p className="text-xs text-[#7A6453]">
              جرّب تغيير كلمات البحث، أو إلغاء تصفية المقاسات والألوان للوصول إلى كافة الموديلات.
            </p>
            <button
              onClick={() =>
                setFilters({
                  category: 'all',
                  searchQuery: '',
                  priceRange: [2000, 5000],
                  selectedSizes: [],
                  selectedColors: [],
                  sortBy: 'featured',
                })
              }
              className="bg-[#241611] text-[#FAF7F2] text-xs font-medium px-5 py-2 rounded-xs hover:bg-[#3D2517] transition cursor-pointer"
            >
              عرض كافة المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p, size, cIdx) => handleAddToCart(p, size, cIdx, 1)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

      </main>

      {/* Handcrafted Atelier & "أناقة تدوم مع الزمن" Sections */}
      <HeritageSection
        luxuryProducts={luxuryAtelierProducts}
        onExploreLuxury={() => {
          setFilters({ ...filters, category: 'leather_luxury' });
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Contact & Showroom Section */}
      <ContactSection />

      {/* Atelier Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setFilters({ ...filters, category: cat });
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('contact-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, size, cIdx, qty) => handleAddToCart(p, size, cIdx, qty)}
        onInstantBuy={handleInstantBuy}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
        onOpenQuickView={(p) => {
          setIsWishlistOpen(false);
          setQuickViewProduct(p);
        }}
      />

      {/* Checkout Modal with COD */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={appliedPromo}
        onOrderSuccess={(order) => {
          // Clear cart on successful confirmed placement
          setCartItems([]);
          showToast(`تم تأكيد الطلب بنجاح برقم ${order.orderId}`);
        }}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

    </div>
  );
}
