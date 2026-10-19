import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  Banknote, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  ArrowRight, 
  Printer, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { CartItem, CustomerDetails, PlacedOrder } from '../types';
import { EGYPTIAN_GOVERNORATES } from '../data/governorates';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo: string;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    secondaryPhone: '',
    governorate: 'cairo',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);

  if (!isOpen) return null;

  const currentGov = EGYPTIAN_GOVERNORATES.find((g) => g.id === formData.governorate) || EGYPTIAN_GOVERNORATES[0];
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = appliedPromo === 'CLASSIC10' ? 0.10 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const freeShipping = subtotal >= 3000;
  const shippingFee = freeShipping ? 0 : currentGov.shippingFee;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = 'يرجى إدخال الاسم بالكامل ثلاثياً على الأقل';
    }
    const cleanPhone = formData.phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || !/^01[0125][0-9]{8}$/.test(cleanPhone)) {
      errors.phone = 'يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً (مثال: 01012345678)';
    }
    if (!formData.city.trim()) {
      errors.city = 'يرجى كتابة المدينة أو الحي (مثال: المعادي، المهندسين، سموحة...)';
    }
    if (!formData.address.trim() || formData.address.trim().length < 8) {
      errors.address = 'يرجى كتابة العنوان بالتفصيل (اسم الشارع، رقم العقار، الدور، الشقة)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `CS-${Math.floor(10000 + Math.random() * 90000)}`;
      const order: PlacedOrder = {
        orderId,
        createdAt: new Date().toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customer: formData,
        items,
        subtotal,
        discount: discountAmount,
        shippingFee,
        total: grandTotal,
        promoCode: appliedPromo || undefined,
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241611]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] w-full max-w-4xl rounded-sm shadow-2xl border border-[#C5A059]/40 overflow-hidden my-auto max-h-[94vh] flex flex-col text-right"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#E8DFC8] bg-[#F4EFE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-heading font-bold text-lg text-[#241611]">
              {completedOrder ? 'إيصال تأكيد الطلب الرسمي' : 'إتمام الطلب - الدفع عند الاستلام'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EBE2D4] border border-[#DFD3BF] text-[#241611] flex items-center justify-center transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          
          {completedOrder ? (
            /* SUCCESS CONFIRMATION RECEIPT SCREEN */
            <div className="space-y-6 text-center max-w-2xl mx-auto">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="font-brand text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                  Order Confirmed
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#241611] mt-1">
                  تم تسجيل طلبك بنجاح!
                </h3>
                <p className="text-sm text-[#6E594B] mt-2">
                  شكراً لثقتك في <strong>CLASSIC SHOES</strong>. تم تسجيل طلبك برقم مرجعي:
                </p>
                <div className="inline-block bg-[#F3ECE0] border border-[#C5A059]/50 px-5 py-2 rounded-xs mt-3">
                  <span className="font-brand text-xl font-bold text-[#241611] tracking-wider">
                    {completedOrder.orderId}
                  </span>
                </div>
              </div>

              {/* Delivery info & Inspection Note */}
              <div className="bg-[#F7F2E8] border border-[#E3D7C5] p-4 rounded-xs text-right text-xs sm:text-sm text-[#5C483B] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#241611]">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                  <span>موعد التوصيل المتوقع: {currentGov.deliveryDays}</span>
                </div>
                <p className="text-xs">
                  سيقوم أحد ممثلي خدمة العملاء بالتواصل معك هاتفياً على الرقم (<strong>{completedOrder.customer.phone}</strong>) لتأكيد المقاسات وتحديد موعد خروج المندوب.
                </p>
                <div className="flex items-center gap-2 text-emerald-800 font-medium text-xs pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>تذكير: يحق لك فتح الصندوق ومعاينة وقياس الحذاء قبل السداد لمندوب الشحن.</span>
                </div>
              </div>

              {/* Order Items & Totals Summary */}
              <div className="bg-[#FAF7F2] border border-[#DFD3BF] p-4 rounded-xs text-right space-y-3">
                <h4 className="font-bold text-xs text-[#241611] border-b border-[#E8DFC8] pb-2">
                  ملخص الأحذية المطلوبة ({completedOrder.items.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {completedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-[#241611]">{item.product.nameAr}</span>
                        <span className="text-[#8C7A6B] mr-2">
                          (مقاس {item.selectedSize} - {item.selectedColor.name} × {item.quantity})
                        </span>
                      </div>
                      <span className="font-brand font-bold text-[#241611]">
                        {(item.product.price * item.quantity).toLocaleString('ar-EG')} ج.م
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8DFC8] pt-2 space-y-1 text-xs text-[#7A6453]">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{completedOrder.subtotal.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>الخصم المطبق:</span>
                      <span>-{completedOrder.discount.toLocaleString('ar-EG')} ج.م</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>مصاريف الشحن ({currentGov.nameAr}):</span>
                    <span>{completedOrder.shippingFee === 0 ? 'مجاني' : `${completedOrder.shippingFee} ج.م`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#241611] pt-1 border-t border-[#DFD3BF]">
                    <span>المبلغ المستحق عند الاستلام:</span>
                    <span className="font-brand text-base text-[#241611]">
                      {completedOrder.total.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xs bg-[#F3ECE0] hover:bg-[#EBE2D4] text-[#241611] text-xs font-medium border border-[#DFD3BF] flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#C5A059]" />
                  <span>طباعة أو حفظ الإيصال</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xs bg-[#241611] hover:bg-[#3D2517] text-[#FAF7F2] text-xs font-bold transition border border-[#C5A059]/40 cursor-pointer"
                >
                  العودة للمتجر ومتابعة التسوق
                </button>
              </div>

            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Important Transparency Notice */}
              <div className="bg-[#F8F4EC] border border-[#C5A059]/40 p-4 rounded-xs text-xs text-[#5C483B] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-[#241611]">
                    خيار الدفع المعتمد: نقدًا عند الاستلام (Cash on Delivery)
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    لا حاجة لأي بطاقات بنكية أو دفع إلكتروني مسبق. ستقوم بالدفع نقداً لمندوب الشحن بعد استلام الصندوق وتجربة الحذاء والتأكد من جودته ومقاسه.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Customer Information Inputs (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-heading font-bold text-base text-[#241611] pb-2 border-b border-[#E8DFC8] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C5A059]" />
                    <span>بيانات العميل وعنوان التوصيل</span>
                  </h4>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#241611] mb-1">
                      الاسم بالكامل (ثلاثي) <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: أحمد عبد الله محمود"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-700 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phones Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#241611] mb-1">
                        رقم الهاتف الأساسي <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        placeholder="01012345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none text-left"
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-700 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#241611] mb-1">
                        رقم هاتف بديل (اختياري)
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        placeholder="01xxxxxxxxx"
                        value={formData.secondaryPhone}
                        onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                        className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none text-left"
                      />
                    </div>
                  </div>

                  {/* Governorate and City Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#241611] mb-1">
                        المحافظة <span className="text-red-700">*</span>
                      </label>
                      <select
                        value={formData.governorate}
                        onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                        className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none cursor-pointer"
                      >
                        {EGYPTIAN_GOVERNORATES.map((gov) => (
                          <option key={gov.id} value={gov.id}>
                            {gov.nameAr} - ({gov.deliveryDays})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#241611] mb-1">
                        المدينة / الحي <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: المعادي الجديدة، الدقي، سيدي جابر"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none"
                      />
                      {formErrors.city && (
                        <p className="text-[11px] text-red-700 mt-1">{formErrors.city}</p>
                      )}
                    </div>
                  </div>

                  {/* Detailed Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#241611] mb-1">
                      العنوان بالتفصيل <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="اسم الشارع، رقم العمارة، الدور، رقم الشقة أو علامة مميزة بجوارك..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2 rounded-xs text-xs text-[#241611] focus:outline-none resize-none"
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-red-700 mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <label className="block text-xs font-medium text-[#7A6453] mb-1">
                      ملاحظات خاصة بالمندوب (اختياري)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: يفضل الاتصال بعد الساعة 3 عصراً"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#DFD3BF] px-3.5 py-2 rounded-xs text-xs text-[#241611] focus:outline-none"
                    />
                  </div>

                </div>

                {/* Order Summary & Payment Method (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  <h4 className="font-heading font-bold text-base text-[#241611] pb-2 border-b border-[#E8DFC8] flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#C5A059]" />
                    <span>طريقة السداد وملخص الحساب</span>
                  </h4>

                  {/* Payment Method Badge */}
                  <div className="p-3.5 bg-[#FAF7F2] border-2 border-[#C5A059] rounded-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#241611] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span>الدفع عند الاستلام (COD)</span>
                      </span>
                      <span className="text-[10px] bg-[#E8DFC8] text-[#241611] px-2 py-0.5 rounded-xs font-medium">
                        بدون فوائد
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5546] leading-relaxed">
                      تسليم يد بيد للمندوب بعد فتح الطرد ومعاينة المقاس وجودة الجلد الطبيعي.
                    </p>
                  </div>

                  {/* Compact Items List */}
                  <div className="border border-[#E3D7C5] bg-[#F4EFE6] p-3 rounded-xs max-h-40 overflow-y-auto space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <div className="truncate max-w-[170px]">
                          <span className="font-bold text-[#241611] block truncate">{item.product.nameAr}</span>
                          <span className="text-[10px] text-[#8C7A6B]">
                            مقاس {item.selectedSize} • {item.selectedColor.name} × {item.quantity}
                          </span>
                        </div>
                        <span className="font-brand font-bold text-[#241611] shrink-0">
                          {(item.product.price * item.quantity).toLocaleString('ar-EG')} ج.م
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#6B5546] bg-[#FAF7F2] p-3 rounded-xs border border-[#DFD3BF]">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي:</span>
                      <span className="font-brand font-bold text-[#241611]">
                        {subtotal.toLocaleString('ar-EG')} ج.م
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-800">
                        <span>الخصم ({appliedPromo}):</span>
                        <span className="font-brand font-bold">
                          -{discountAmount.toLocaleString('ar-EG')} ج.م
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>شحن ({currentGov.nameAr}):</span>
                      <span className="font-bold text-[#241611]">
                        {freeShipping ? (
                          <span className="text-emerald-700">مجاني (للطلبات +3000)</span>
                        ) : (
                          `${shippingFee} ج.م`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base font-bold text-[#241611] pt-2 border-t border-[#DFD3BF]">
                      <span>الإجمالي المطلوب نقداً:</span>
                      <span className="font-brand text-lg text-[#241611]">
                        {grandTotal.toLocaleString('ar-EG')} ج.م
                      </span>
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full py-3.5 px-6 rounded-xs bg-[#241611] hover:bg-[#3D2517] disabled:bg-[#7D6B5E] text-[#FAF7F2] font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 border border-[#C5A059]/40 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>جاري تسجيل الطلب...</span>
                    ) : (
                      <>
                        <span>تأكيد الطلب الآن</span>
                        <ArrowRight className="w-4 h-4 text-[#C5A059] rotate-180" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#8C7A6B]">
                    بالنقر على تأكيد الطلب، فإنك توافق على سياسة الاستبدال والمعاينة في متجر CLASSIC SHOES.
                  </p>

                </div>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
