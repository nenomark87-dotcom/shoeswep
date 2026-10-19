import React from 'react';
import { X, Heart, Trash2, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveWishlist,
  onAddToCart,
  onOpenQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#241611]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-r border-[#C5A059]/40 shadow-2xl flex flex-col text-right">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFC8] bg-[#F4EFE6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8B2635] fill-[#8B2635]" />
              <h3 className="font-heading font-bold text-lg text-[#241611]">
                قائمة الرغبات والمفضلة ({wishlistItems.length})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EBE2D4] text-[#241611] transition cursor-pointer"
              aria-label="إغلاق المفضلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#8C7A6B]">
                <div className="w-16 h-16 rounded-full bg-[#F3ECE0] flex items-center justify-center mb-4 text-[#8B2635]">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#241611] mb-1">
                  لا توجد منتجات في المفضلة بعد
                </h4>
                <p className="text-xs text-[#7A6453] max-w-xs mb-6">
                  اضغط على رمز القلب بجانب أي حذاء لحفظه في قائمتك الخاصة والعودة إليه لاحقاً.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#241611] text-[#FAF7F2] text-xs font-medium px-6 py-2.5 rounded-xs hover:bg-[#3D2517] transition border border-[#C5A059]/40 cursor-pointer"
                >
                  استعراض التشكيلة
                </button>
              </div>
            ) : (
              wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3.5 bg-[#FAF7F2] border border-[#E3D7C5] rounded-xs shadow-2xs relative"
                >
                  <div className="w-20 h-20 bg-[#E8DFC8] rounded-xs overflow-hidden shrink-0 border border-[#DFD3BF]">
                    <img
                      src={product.primaryImage}
                      alt={product.nameAr}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-[#241611] leading-snug">
                          {product.nameAr}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(product)}
                          className="text-[#998778] hover:text-[#8B2635] transition p-0.5 cursor-pointer"
                          title="حذف من المفضلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A6453] mt-0.5">{product.leatherType.split('(')[0]}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EDE4D5]">
                      <div className="font-brand font-bold text-sm text-[#241611]">
                        {product.price.toLocaleString('ar-EG')} ج.م
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenQuickView(product);
                          }}
                          className="p-1.5 rounded-xs bg-[#F3ECE0] text-[#241611] hover:bg-[#EBE2D4] text-xs"
                          title="معاينة"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="flex items-center gap-1 bg-[#241611] hover:bg-[#3D2517] text-[#FAF7F2] text-[11px] px-2.5 py-1.5 rounded-xs transition cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3 text-[#C5A059]" />
                          <span>إلى السلة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
