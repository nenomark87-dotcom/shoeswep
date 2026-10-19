import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Truck, 
  ShieldCheck, 
  Ruler, 
  Sparkles
} from 'lucide-react';
import { ShoeCategory } from '../types';

interface HeaderProps {
  currentCategory: ShoeCategory;
  onSelectCategory: (category: ShoeCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onOpenContact: () => void;
  onOpenSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeGuide,
  onOpenContact,
  onOpenSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navItems: { label: string; category: ShoeCategory }[] = [
    { label: 'الرئيسية', category: 'all' },
    { label: 'أحذية رجالية', category: 'mens' },
    { label: 'أحذية نسائية', category: 'womens' },
    { label: 'أحذية جلدية فاخرة', category: 'leather_luxury' },
    { label: 'أحذية لوفر', category: 'loafers' },
    { label: 'المجموعات الجديدة', category: 'new' },
    { label: 'العروض الحصرية', category: 'offers' },
  ];

  const handleNavClick = (cat: ShoeCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    // Smooth scroll to catalog section
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl && cat !== 'all') {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]/60 transition-all shadow-xs">
      {/* Top Heritage Announcement Bar */}
      <div className="bg-[#241611] text-[#E8DFC8] text-xs py-2 px-4 border-b border-[#3D2517]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>شحن سريع لجميع محافظات مصر • متاح المعاينة والقياس عند الاستلام</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#C5A059]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>جلود طبيعية 100% مضمونة</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-[#DFCBB7]">
            <button 
              onClick={onOpenSizeGuide}
              className="hover:text-[#C5A059] transition flex items-center gap-1 cursor-pointer"
            >
              <Ruler className="w-3 h-3 text-[#C5A059]" />
              <span>دليل المقاسات</span>
            </button>
            <span className="opacity-40">|</span>
            <a 
              href="tel:01099887766" 
              className="hover:text-[#C5A059] transition flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span dir="ltr">010 9988 7766</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Brand & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Right Area (Search & Mobile Toggle in RTL) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#241611] hover:text-[#C5A059] transition rounded-lg hover:bg-[#F3ECE0]"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Quick Search trigger / bar */}
            <div className="relative hidden sm:block">
              <div className="flex items-center bg-[#F3ECE0]/80 border border-[#DFD3BF] focus-within:border-[#C5A059] rounded-full px-3 py-1.5 transition-all w-48 lg:w-64">
                <Search className="w-4 h-4 text-[#8C7A6B] ml-2 shrink-0" />
                <input
                  type="text"
                  placeholder="ابحث عن حذاء كلاسيكي..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs sm:text-sm text-[#241611] placeholder:text-[#8C7A6B] focus:outline-none w-full"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[#8C7A6B] hover:text-[#241611] text-xs px-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Mobile search icon */}
            <button
              onClick={onOpenSearch}
              className="sm:hidden p-2 text-[#241611] hover:text-[#C5A059] transition rounded-full hover:bg-[#F3ECE0]"
              title="بحث"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Center Brand Identity (Classic European Atelier Emblem) */}
          <div className="text-center cursor-pointer select-none" onClick={() => handleNavClick('all')}>
            <div className="flex flex-col items-center">
              {/* Heraldic crest mark */}
              <div className="flex items-center gap-2 mb-0.5">
                <div className="h-[1px] w-6 bg-[#C5A059]/60"></div>
                <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A059] bg-[#FAF7F2] flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#C5A059]"></div>
                </div>
                <div className="h-[1px] w-6 bg-[#C5A059]/60"></div>
              </div>

              {/* Brand Typography */}
              <h1 className="font-brand text-2xl sm:text-3xl lg:text-4xl tracking-[0.18em] text-[#241611] font-bold uppercase transition hover:text-[#3D2517]">
                CLASSIC SHOES
              </h1>
              
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#8C6D58] tracking-widest font-heading font-medium mt-0.5">
                <span>صُنِعَ للأناقة الخالدة</span>
                <span>•</span>
                <span className="font-brand uppercase tracking-wider text-[9px] text-[#C5A059]">EST. 1984</span>
              </div>
            </div>
          </div>

          {/* Left Action Buttons (Wishlist & Cart in RTL) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-[#241611] hover:text-[#C5A059] transition rounded-full hover:bg-[#F3ECE0] cursor-pointer"
              aria-label="قائمة الرغبات والمفضلة"
              title="المفضلة"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-[#8B2635] fill-[#8B2635]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#8B2635] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#FAF7F2]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-[#241611] hover:bg-[#382218] text-[#F4EFE6] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition shadow-xs cursor-pointer border border-[#C5A059]/30"
              aria-label="سلة التسوق"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#E8DFC8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C5A059] text-[#241611] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#241611]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline text-[#E8DFC8]">
                السلة
              </span>
            </button>
          </div>

        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center border-t border-[#E8DFC8]/70 py-3 gap-8 text-sm">
          {navItems.map((item) => {
            const isActive = currentCategory === item.category;
            return (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className={`relative py-1 font-medium transition cursor-pointer text-[13px] ${
                  isActive
                    ? 'text-[#241611] font-bold'
                    : 'text-[#614D3F] hover:text-[#241611]'
                }`}
              >
                {item.label}
                {item.category === 'offers' && (
                  <span className="mr-1.5 inline-block px-1.5 py-0.2 text-[9px] bg-[#8B2635] text-white rounded-xs font-sans">
                    خصومات
                  </span>
                )}
                {item.category === 'leather_luxury' && (
                  <span className="mr-1 inline-block text-[#C5A059]">✦</span>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059] rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
          
          <button
            onClick={onOpenContact}
            className="text-[#614D3F] hover:text-[#241611] font-medium transition cursor-pointer text-[13px]"
          >
            تواصل معنا
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#DFD3BF] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile search bar */}
          <div className="mb-4">
            <div className="flex items-center bg-[#F3ECE0] border border-[#DFD3BF] rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-[#8C7A6B] ml-2 shrink-0" />
              <input
                type="text"
                placeholder="ابحث عن موديل، لون، مقاس..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-[#241611] focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className={`w-full text-right py-2.5 px-3 rounded-lg text-sm flex items-center justify-between ${
                  currentCategory === item.category
                    ? 'bg-[#241611] text-[#E8DFC8] font-bold'
                    : 'text-[#241611] hover:bg-[#F3ECE0]'
                }`}
              >
                <span>{item.label}</span>
                {item.category === 'leather_luxury' && (
                  <span className="text-xs text-[#C5A059]">جلد طبيعي 100%</span>
                )}
                {item.category === 'offers' && (
                  <span className="text-[10px] bg-[#8B2635] text-white px-2 py-0.5 rounded-full">
                    تخفيضات
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full text-right py-2.5 px-3 rounded-lg text-sm text-[#241611] hover:bg-[#F3ECE0]"
            >
              تواصل معنا
            </button>

            <button
              onClick={() => {
                onOpenSizeGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-right py-2.5 px-3 rounded-lg text-sm text-[#C5A059] font-medium hover:bg-[#F3ECE0] flex items-center gap-2"
            >
              <Ruler className="w-4 h-4" />
              <span>دليل المقاسات ونظام القياس الأوروبي</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
