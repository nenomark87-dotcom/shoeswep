import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, colorIndex: number, quantity: number) => void;
  onInstantBuy: (product: Product, size: number, colorIndex: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantBuy,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.primaryImage);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<'craft' | 'care' | 'delivery' | null>('craft');

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColorIdx, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleInstantBuy = () => {
    onInstantBuy(product, selectedSize, selectedColorIdx);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241611]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative bg-[#FAF7F2] w-full max-w-5xl rounded-sm shadow-2xl border border-[#C5A059]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header bar with close */}
        <div className="px-6 py-4 border-b border-[#E8DFC8] flex items-center justify-between bg-[#F4EFE6]">
          <div className="flex items-center gap-2">
            <span className="font-brand text-xs uppercase tracking-widest text-[#C5A059] font-bold">Atelier Selection</span>
            <span className="text-[#8C7A6B]">•</span>
            <span className="text-xs text-[#7A6453]">{product.craftsmanshipOrigin}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EBE2D4] border border-[#DFD3BF] text-[#241611] flex items-center justify-center transition cursor-pointer"
            aria-label="إغلاق تفاصيل المنتج"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Gallery Column (6 cols in RTL) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Primary Selected Image */}
              <div className="relative aspect-square sm:aspect-4/3 rounded-sm overflow-hidden bg-[#EBDDC8] border border-[#DFD3BF] shadow-xs">
                <img
                  src={selectedImage}
                  alt={product.nameAr}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                {/* Badge if available */}
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-[#241611]/90 text-[#F4EFE6] text-xs font-medium px-3 py-1 rounded-xs border border-[#C5A059]/40">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Heart */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] text-[#241611] flex items-center justify-center shadow-md transition hover:scale-110 cursor-pointer"
                  title="إضافة للمفضلة"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-[#8B2635] text-[#8B2635]' : 'text-[#241611]'
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 shrink-0 rounded-xs overflow-hidden border-2 transition cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                        : 'border-[#DFD3BF] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`زاوية ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Handcrafted Reassurance Note */}
              <div className="bg-[#F3ECE0] border border-[#DFD3BF] p-3.5 rounded-xs flex items-center gap-3 text-right">
                <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0" />
                <p className="text-xs text-[#5C483B] leading-relaxed">
                  هذا الحذاء مصنوع بحياكة معززة تضمن مرونة ميكانيكية فائقة وتسمح للجلد بالتنفس مع قدمك بشكل طبيعي.
                </p>
              </div>

            </div>

            {/* Info and Purchase Column (6 cols in RTL) */}
            <div className="lg:col-span-6 space-y-6 text-right">
              
              <div>
                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-[#C5A059]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#C5A059]'
                            : 'text-[#DFD3BF]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#241611]">{product.rating}</span>
                  <span className="text-xs text-[#7A6453]">({product.reviewsCount} تقييم موثق)</span>
                </div>

                {/* Main Shoe Title */}
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#241611]">
                  {product.nameAr}
                </h2>
                <p className="font-brand uppercase tracking-wider text-xs text-[#8C7A6B] mt-0.5">
                  {product.nameEn}
                </p>
              </div>

              {/* Price section in EGP */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-[#E8DFC8]">
                <span className="font-brand text-3xl font-bold text-[#241611]">
                  {product.price.toLocaleString('ar-EG')}
                </span>
                <span className="text-base font-heading font-medium text-[#705947]">جنيه مصري</span>

                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center gap-2 mr-3">
                    <span className="text-sm text-[#948174] line-through">
                      {product.originalPrice.toLocaleString('ar-EG')} ج.م
                    </span>
                    <span className="text-xs bg-[#8B2635] text-white px-2 py-0.5 rounded-xs font-medium">
                      وفر {(product.originalPrice - product.price).toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                )}
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#241611]">
                    لون الجلد:{' '}
                    <span className="font-normal text-[#7A6453]">
                      {product.colors[selectedColorIdx]?.name}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.code}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xs border transition cursor-pointer text-xs ${
                        selectedColorIdx === idx
                          ? 'border-[#241611] bg-[#241611] text-[#E8DFC8] font-bold shadow-xs'
                          : 'border-[#DFD3BF] bg-[#F4EFE6] text-[#241611] hover:border-[#8C7A6B]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#241611]">
                    المقاس (النظام الأوروبي EU):{' '}
                    <span className="font-brand font-bold text-[#C5A059]">{selectedSize}</span>
                  </span>

                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#C5A059] hover:text-[#9E7D3B] flex items-center gap-1 font-medium underline underline-offset-4 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>جدول القياسات وكيف تقيس قدمك</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-sm font-sans rounded-xs border transition cursor-pointer flex flex-col items-center justify-center ${
                        selectedSize === size
                          ? 'bg-[#241611] text-[#E8DFC8] border-[#241611] font-bold shadow-xs ring-1 ring-[#C5A059]'
                          : 'bg-[#F4EFE6] text-[#241611] border-[#DFD3BF] hover:border-[#8C7A6B]'
                      }`}
                    >
                      <span>{size}</span>
                      <span className="text-[9px] opacity-70">متوفر</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#DFD3BF] rounded-xs bg-[#F4EFE6]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm text-[#241611] hover:bg-[#EBE2D4] cursor-pointer"
                      aria-label="إنقاص الكمية"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-[#241611]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm text-[#241611] hover:bg-[#EBE2D4] cursor-pointer"
                      aria-label="زيادة الكمية"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-xs font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer ${
                      addedAnimation
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : 'bg-[#241611] hover:bg-[#3D2517] text-[#F4EFE6] border-[#C5A059]/40 shadow-md'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>تمت الإضافة إلى السلة بنجاح!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                        <span>إضافة إلى سلة المشتريات</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instant Quick Order with Cash on Delivery */}
                <button
                  onClick={handleInstantBuy}
                  className="w-full py-3 px-6 rounded-xs bg-[#C5A059] hover:bg-[#B58E45] text-[#241611] font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#A68037]"
                >
                  <span>شراء سريع والدفع عند الاستلام</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>

              {/* Delivery Assurance */}
              <div className="bg-[#F7F2E8] p-3 rounded-xs border border-[#E3D7C5] text-xs text-[#6B5546] space-y-1">
                <div className="flex items-center gap-2 font-medium text-[#241611]">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                  <span>معاينة وقياس قبل الدفع</span>
                </div>
                <p>
                  يمكنك فتح الشحنة وقياس الحذاء أمام مندوب الشحن للتأكد من الراحة والمقاس التام قبل سداد المبلغ نقداً.
                </p>
              </div>

              {/* Accordions for Craftsmanship, Care Tips, Shipping */}
              <div className="border-t border-[#E8DFC8] pt-4 space-y-2">
                
                {/* Accordion 1: Craftsmanship */}
                <div className="border border-[#E3D7C5] rounded-xs overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'craft' ? null : 'craft')}
                    className="w-full px-4 py-2.5 bg-[#F4EFE6] text-right text-xs font-bold text-[#241611] flex items-center justify-between cursor-pointer"
                  >
                    <span>تفاصيل الحرفية ونوع الجلد والنعل</span>
                    {openAccordion === 'craft' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'craft' && (
                    <div className="p-4 bg-[#FAF7F2] text-xs text-[#5C483B] space-y-2">
                      <p><strong>نوع الجلد:</strong> {product.leatherType}</p>
                      <p><strong>نوع النعل:</strong> {product.soleType}</p>
                      <p><strong>بلد المنشأ والتصميم:</strong> {product.craftsmanshipOrigin}</p>
                      <p className="leading-relaxed mt-2">{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Care Guide */}
                <div className="border border-[#E3D7C5] rounded-xs overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                    className="w-full px-4 py-2.5 bg-[#F4EFE6] text-right text-xs font-bold text-[#241611] flex items-center justify-between cursor-pointer"
                  >
                    <span>إرشادات العناية بالجلد لإطالة عمر الحذاء</span>
                    {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'care' && (
                    <div className="p-4 bg-[#FAF7F2] text-xs text-[#5C483B] space-y-1.5">
                      {product.careTips.map((tip, i) => (
                        <p key={i} className="flex items-start gap-1.5">
                          <span className="text-[#C5A059]">•</span>
                          <span>{tip}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
