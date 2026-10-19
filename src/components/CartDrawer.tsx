import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Tag, 
  CheckCircle2 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3000;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = appliedPromo === 'CLASSIC10' ? 0.10 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const freeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoSuccess('تم تطبيق خصم 10% بنجاح!');
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('كود الخصم غير صالح. جرّب: CLASSIC10');
      setPromoSuccess('');
    }
  };

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
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-heading font-bold text-lg text-[#241611]">
                سلة المشتريات ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EBE2D4] text-[#241611] transition cursor-pointer"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#EFE7D8] px-5 py-3 border-b border-[#DFD3BF]">
            <div className="flex items-center justify-between text-xs mb-1.5 text-[#5C483B]">
              <span className="font-medium flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                {freeShippingUnlocked ? (
                  <strong className="text-emerald-800">مبروك! حصلت على شحن مجاني لكافة المحافظات</strong>
                ) : (
                  <span>
                    أضف بقيمة <strong>{amountNeededForFreeShipping.toLocaleString('ar-EG')} ج.م</strong> للحصول على شحن مجاني!
                  </span>
                )}
              </span>
              <span className="font-brand font-bold text-[11px] text-[#241611]">{progressPercent}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-[#DFD3BF] rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#C5A059] to-[#9E7D3B] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#8C7A6B]">
                <div className="w-16 h-16 rounded-full bg-[#F3ECE0] flex items-center justify-center mb-4 text-[#C5A059]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#241611] mb-1">
                  سلة التسوق فارغة حالياً
                </h4>
                <p className="text-xs text-[#7A6453] max-w-xs mb-6">
                  استكشف تشكيلات الأحذية الجلدية الكلاسيكية الفاخرة وأضف ما يناسب ذوقك.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#241611] text-[#FAF7F2] text-xs font-medium px-6 py-2.5 rounded-xs hover:bg-[#3D2517] transition border border-[#C5A059]/40 cursor-pointer"
                >
                  تصفح الأحذية الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 bg-[#FAF7F2] border border-[#E3D7C5] rounded-xs shadow-2xs relative"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#E8DFC8] rounded-xs overflow-hidden shrink-0 border border-[#DFD3BF]">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.nameAr}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-[#241611] leading-snug">
                          {item.product.nameAr}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#998778] hover:text-[#8B2635] transition p-0.5 cursor-pointer"
                          title="حذف الحذاء من السلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#7A6453] mt-1">
                        <span>المقاس: <strong className="font-sans text-[#241611]">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    {/* Price and quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EDE4D5]">
                      <div className="flex items-center border border-[#DFD3BF] rounded-xs bg-[#F4EFE6] text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#241611] hover:bg-[#EBE2D4] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold font-sans text-[#241611]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#241611] hover:bg-[#EBE2D4] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-brand font-bold text-sm text-[#241611]">
                        {(item.product.price * item.quantity).toLocaleString('ar-EG')} ج.م
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area with Promo & Totals */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8DFC8] bg-[#F4EFE6] space-y-4">
              
              {/* Promo Code Form */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2.5 rounded-xs text-xs text-emerald-900">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>كود مفعّل: <strong>{appliedPromo}</strong> (خصم 10%)</span>
                    </span>
                    <button
                      onClick={onRemovePromo}
                      className="text-red-700 hover:text-red-900 text-[11px] underline cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="كود الخصم (جرّب: CLASSIC10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#FAF7F2] border border-[#DFD3BF] px-3 py-1.5 rounded-xs text-xs text-[#241611] focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="bg-[#241611] text-[#E8DFC8] text-xs font-medium px-4 py-1.5 rounded-xs hover:bg-[#3D2517] transition cursor-pointer"
                    >
                      تطبيق
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-red-700 mt-1">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-700 mt-1">{promoSuccess}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B5546]">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-brand font-bold text-[#241611]">
                    {subtotal.toLocaleString('ar-EG')} ج.م
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>خصم الكوبون (10%):</span>
                    <span className="font-brand font-bold">
                      -{discountAmount.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>الشحن المقدر:</span>
                  <span className="font-medium text-[#241611]">
                    {freeShippingUnlocked ? (
                      <span className="text-emerald-700 font-bold">مجاني</span>
                    ) : (
                      'يحدد حسب المحافظة في الخطوة التالية'
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#DFD3BF] text-sm sm:text-base font-bold text-[#241611]">
                  <span>الإجمالي المبدئي:</span>
                  <span className="font-brand text-lg text-[#241611]">
                    {(subtotal - discountAmount).toLocaleString('ar-EG')} ج.م
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-xs bg-[#241611] hover:bg-[#3D2517] text-[#FAF7F2] font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 border border-[#C5A059]/40 cursor-pointer"
              >
                <span>متابعة الطلب والدفع عند الاستلام</span>
                <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A6453]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>دفع نقدًا عند الاستلام بعد المعاينة والقياس</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
