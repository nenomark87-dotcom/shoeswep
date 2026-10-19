import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Phone, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { ShoeCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ShoeCategory) => void;
  onOpenSizeGuide: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSizeGuide,
  onOpenContact,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 4000);
  };

  return (
    <footer className="bg-[#1C120D] text-[#E8DFC8] border-t border-[#3D2517] pt-16 pb-10 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#301D13]">
          
          {/* Brand Column (4 cols in RTL) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A059] bg-[#1C120D] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#C5A059]"></div>
              </div>
              <span className="font-brand text-2xl font-bold tracking-[0.15em] text-[#FAF7F2]">
                CLASSIC SHOES
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#B8A494] leading-relaxed max-w-sm font-light">
              متجر متخصص في الأحذية الكلاسيكية الفاخرة المستوحاة من العراقة الأوروبية، نجمع بين جلود العجل الإيطالية الطبيعية وتقاليد الخياطة اليدوية لنقدم لك أناقة تليق بخطواتك.
            </p>

            <div className="pt-2 text-xs text-[#DFCBB7] space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>الزمالك، القاهرة - جمهورية مصر العربية</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span dir="ltr">010 9988 7766</span>
              </div>
            </div>

          </div>

          {/* Quick Categories Navigation (3 cols in RTL) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-base text-[#FAF7F2] pb-1 border-b border-[#301D13] inline-block">
              تشكيلات الأحذية
            </h4>
            <ul className="space-y-2 text-xs text-[#B8A494]">
              <li>
                <button
                  onClick={() => onSelectCategory('mens')}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  أحذية رجالية رسمية (أكسفورد وبروغ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('womens')}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  أحذية نسائية كلاسيكية (كعوب وسلينج باك)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('loafers')}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  أحذية لوفر مريحة (بيني وتاسل لوفر)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('leather_luxury')}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  أحذية جلدية فاخرة وبوت تشيلسي
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('offers')}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  عروض وتخفيضات المواسم
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies (2 cols in RTL) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-base text-[#FAF7F2] pb-1 border-b border-[#301D13] inline-block">
              خدمات العملاء
            </h4>
            <ul className="space-y-2 text-xs text-[#B8A494]">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  دليل المقاسات الأوروبية
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  سياسة المعاينة عند الاستلام
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  الاستبدال والاسترجاع (14 يوماً)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  إرشادات العناية بالجلود الطبيعية
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#C5A059] transition cursor-pointer"
                >
                  زيارة صالة العرض
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription (3 cols in RTL) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-base text-[#FAF7F2] pb-1 border-b border-[#301D13] inline-block">
              نشرة النخبة البريدية
            </h4>
            <p className="text-xs text-[#B8A494] leading-relaxed">
              انضم إلى قائمتنا الخاصة لتصلك الإصدارات المحدودة ونصائح العناية بأحذيتك قبل الجميع.
            </p>

            {subscribed ? (
              <div className="bg-[#241611] border border-[#C5A059] p-2.5 rounded-xs text-xs text-[#E8DFC8] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>شكراً لانضمامك إلى نادي الأناقة الكلاسيكية!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="بريدك الإلكتروني..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#241611] border border-[#4A2E1F] focus:border-[#C5A059] px-3 py-2 rounded-xs text-xs text-[#FAF7F2] focus:outline-none placeholder:text-[#7A6453]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#C5A059] hover:bg-[#B58E45] text-[#241611] py-2 rounded-xs text-xs font-bold transition cursor-pointer"
                >
                  اشتراك مجاني
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Policies & Assurances Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-b border-[#301D13] text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-[#B8A494]">
            <Truck className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <strong className="text-[#FAF7F2] block">شحن لكافة أنحاء مصر</strong>
              <span>توصيل سريع مع إمكانية المعاينة والقياس</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-[#B8A494]">
            <RotateCcw className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <strong className="text-[#FAF7F2] block">استبدال مرن وسهل</strong>
              <span>استبدال المقاس خلال 14 يوماً مع الحفاظ على النعل</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-[#B8A494]">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <strong className="text-[#FAF7F2] block">الدفع نقدًا عند الاستلام</strong>
              <span>تسديد المبلغ نقداً للمندوب بعد استلام طلبك</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6453] gap-4">
          <p>© {new Date().getFullYear()} CLASSIC SHOES. جميع الحقوق محفوظة لمتجر الأحذية الكلاسيكية الفاخرة.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>صناعة يدوية بأصالة أوروبية</span>
            <span>•</span>
            <span>القاهرة - مصر</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
