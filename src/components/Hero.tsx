import React from 'react';
import { ArrowLeft, Sparkles, Shield, Award, Clock } from 'lucide-react';

interface HeroProps {
  onDiscoverClick: () => void;
  onCraftsmanshipClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onCraftsmanshipClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-6 pb-12 sm:pb-20 border-b border-[#E8DFC8]">
      {/* Subtle antique ornamental background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EBDDC8]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Headline, Story & Majestic Leather Shoe Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Column (Right column in RTL) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Heritage Kicker / Monogram tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] border border-[#DFD3BF] text-[#7A5B44] text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
              <span className="font-brand uppercase tracking-wider text-[11px]">European Heritage</span>
              <span className="text-[#C5A059]">•</span>
              <span>حرفية يدوية عريقة</span>
            </div>

            {/* Exact Required Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#241611] font-bold leading-[1.25] tracking-tight">
              الأناقة الكلاسيكية <br />
              <span className="text-[#64422D] relative inline-block">
                تبدأ من خطواتك
                <svg className="absolute -bottom-2 left-0 right-0 w-full text-[#C5A059]/40" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 7 C 30 0, 70 0, 100 7" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </span>
            </h1>

            {/* Story Paragraph */}
            <p className="text-base sm:text-lg text-[#5E4B3E] leading-relaxed max-w-2xl font-light">
              نصنع أحذيتنا بمهارة توارثتها الأجيال في أرقى المشاغل الأوروبية. ننتقي أجود جلود العجل الإيطالية المدبوغة نباتياً لنمنحك وقاراً كلاسيكياً يليق بحضورك، مع راحة مطلقة تدوم لسنوات.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Required Button */}
              <button
                onClick={onDiscoverClick}
                className="group inline-flex items-center gap-3 bg-[#241611] hover:bg-[#3D2517] text-[#F4EFE6] px-8 py-3.5 rounded-sm transition-all duration-300 font-medium text-sm sm:text-base border border-[#C5A059]/50 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>اكتشف المجموعة</span>
                <ArrowLeft className="w-4 h-4 text-[#C5A059] group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Secondary Atelier Button */}
              <button
                onClick={onCraftsmanshipClick}
                className="inline-flex items-center gap-2 bg-[#F3ECE0] hover:bg-[#EBE2D4] text-[#241611] px-6 py-3.5 rounded-sm transition font-medium text-sm sm:text-base border border-[#DFD3BF] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>أسرار الحرفية والجلود</span>
              </button>
            </div>

            {/* Reassurance Features / Stats */}
            <div className="pt-6 border-t border-[#E8DFC8] grid grid-cols-3 gap-4 max-w-xl text-right">
              <div>
                <p className="font-brand text-2xl sm:text-3xl font-bold text-[#241611]">100%</p>
                <p className="text-xs text-[#7A6453] mt-0.5">جلد طبيعي إيطالي</p>
              </div>
              <div className="border-r border-[#E8DFC8] pr-4">
                <p className="font-brand text-2xl sm:text-3xl font-bold text-[#241611]">40+</p>
                <p className="text-xs text-[#7A6453] mt-0.5">خطوة صناعة يدوية</p>
              </div>
              <div className="border-r border-[#E8DFC8] pr-4">
                <p className="font-brand text-2xl sm:text-3xl font-bold text-[#241611]">14 يوم</p>
                <p className="text-xs text-[#7A6453] mt-0.5">معاينة واستبدال مرن</p>
              </div>
            </div>

          </div>

          {/* Majestic Shoe Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Luxury Frame Border */}
              <div className="absolute -inset-3 border border-[#C5A059]/40 rounded-sm pointer-events-none transform -rotate-1 hidden sm:block"></div>
              
              {/* Primary Editorial Image */}
              <div className="relative overflow-hidden rounded-sm bg-[#EBDDC8] shadow-2xl border border-[#D8C7B0]">
                <img
                  src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85"
                  alt="حذاء أكسفورد جلدي كلاسيكي فاخر - CLASSIC SHOES"
                  className="w-full h-[380px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#241611]/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Heritage Plaque */}
                <div className="absolute bottom-4 right-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-sm p-4 rounded-sm border border-[#C5A059]/40 shadow-lg text-right">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-brand tracking-widest text-[#C5A059] uppercase font-semibold">Masterpiece Series</p>
                      <h4 className="font-heading font-bold text-[#241611] text-base">حذاء أكسفورد كاب-تو ملكي</h4>
                      <p className="text-xs text-[#705947]">جلد عجل إيطالي معتق بنعل جوديير ويلت</p>
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-[#8C7A6B] block">السعر</span>
                      <span className="font-brand font-bold text-lg text-[#241611]">3,450 ج.م</span>
                    </div>
                  </div>
                </div>

                {/* Leather Seal Badge */}
                <div className="absolute top-4 right-4 bg-[#241611]/90 text-[#E8DFC8] border border-[#C5A059]/60 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-md">
                  <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-medium">جلد طبيعي معتمد</span>
                </div>
              </div>

              {/* Secondary Accent Thumbnail (Brogue/Sole detail) */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-36 h-36 rounded-sm overflow-hidden border-2 border-[#FAF7F2] shadow-xl bg-[#241611]">
                <img
                  src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=400&q=80"
                  alt="تفاصيل الخياطة اليدوية"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#241611]/30 flex items-end p-2">
                  <span className="text-[10px] text-white font-medium bg-[#241611]/80 px-1.5 py-0.5 rounded-xs">
                    خياطة يدوية
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 4 Pillars Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 pt-8 border-t border-[#E8DFC8]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#F3ECE0] border border-[#DFD3BF] flex items-center justify-center shrink-0 text-[#C5A059]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#241611]">جلود طبيعية 100%</h5>
              <p className="text-xs text-[#7A6453] mt-0.5">جلود إيطالية وأوروبية مختارة خالية من الشوائب</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#F3ECE0] border border-[#DFD3BF] flex items-center justify-center shrink-0 text-[#C5A059]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#241611]">معاينة وقياس بالمنزل</h5>
              <p className="text-xs text-[#7A6453] mt-0.5">قِس الحذاء وتأكد من المقاس قبل الدفع للمندوب</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#F3ECE0] border border-[#DFD3BF] flex items-center justify-center shrink-0 text-[#C5A059]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#241611]">خياطة جوديير ويلت</h5>
              <p className="text-xs text-[#7A6453] mt-0.5">بناء هيكلي متين يتيح تغيير النعل بعد سنوات</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#F3ECE0] border border-[#DFD3BF] flex items-center justify-center shrink-0 text-[#C5A059]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#241611]">شحن لجميع المحافظات</h5>
              <p className="text-xs text-[#7A6453] mt-0.5">توصيل سريع ومغلف في صناديق فاخرة مخصصة</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
