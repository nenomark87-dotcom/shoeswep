import React from 'react';
import { Sparkles, Shield, Award, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface HeritageSectionProps {
  onExploreLuxury: () => void;
  onOpenQuickView: (product: Product) => void;
  luxuryProducts: Product[];
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({
  onExploreLuxury,
  onOpenQuickView,
  luxuryProducts,
}) => {
  return (
    <div id="heritage-atelier" className="space-y-16 py-12 sm:py-20">
      
      {/* 1. Required Section: "أناقة تدوم مع الزمن" (Timeless Elegance) */}
      <section className="bg-[#241611] text-[#FAF7F2] py-16 sm:py-24 relative overflow-hidden border-y border-[#C5A059]/30">
        
        {/* Subtle decorative crest watermark in background */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none text-[300px] font-brand">
          CS
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-[#C5A059]"></div>
              <span className="font-brand uppercase tracking-widest text-[#C5A059] text-xs font-bold">Heritage Philosophy</span>
            </div>
            
            {/* Exact Required Title */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              أناقة تدوم مع الزمن
            </h2>

            <p className="mt-4 text-[#DFCBB7] text-base sm:text-lg leading-relaxed font-light">
              في عالم يلهث خلف الموضة السريعة والمواد الصناعية الرخيصة، نقف في CLASSIC SHOES ثباتاً على نهج الحرفية الأوروبية الأصيلة. نصنع أحذية لا تموت صيحتها، بل تزداد نضارة ووقاراً مع كل عام تمشيه بها.
            </p>
          </div>

          {/* 4 Pillars of Timeless Footwear */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-10 border-t border-[#3D2517]">
            
            <div className="bg-[#2C1B15] p-6 rounded-sm border border-[#4A2E1F] hover:border-[#C5A059]/60 transition-all">
              <div className="font-brand text-2xl font-bold text-[#C5A059] mb-3">01</div>
              <h3 className="font-heading text-xl font-bold text-[#FAF7F2] mb-2">
                انتقاء الجلود النادرة
              </h3>
              <p className="text-xs sm:text-sm text-[#DFCBB7] leading-relaxed">
                نستخدم جلود العجل الإيطالية المدبوغة نباتياً (Full-Grain) فقط، والخالية من الطلاءات الكيميائية الثقيلة لتتنفس قدماك بحرية.
              </p>
            </div>

            <div className="bg-[#2C1B15] p-6 rounded-sm border border-[#4A2E1F] hover:border-[#C5A059]/60 transition-all">
              <div className="font-brand text-2xl font-bold text-[#C5A059] mb-3">02</div>
              <h3 className="font-heading text-xl font-bold text-[#FAF7F2] mb-2">
                القالب التشريحي الإيطالي
              </h3>
              <p className="text-xs sm:text-sm text-[#DFCBB7] leading-relaxed">
                قوالبنا الخشبية منحوتة لدعم قوس القدم وتوزيع وزن الجسم بشكل متزن يقلل إجهاد المفاصل والظهر في أوقات العمل الطويلة.
              </p>
            </div>

            <div className="bg-[#2C1B15] p-6 rounded-sm border border-[#4A2E1F] hover:border-[#C5A059]/60 transition-all">
              <div className="font-brand text-2xl font-bold text-[#C5A059] mb-3">03</div>
              <h3 className="font-heading text-xl font-bold text-[#FAF7F2] mb-2">
                حياكة جوديير ويلت
              </h3>
              <p className="text-xs sm:text-sm text-[#DFCBB7] leading-relaxed">
                طريقة الحياكة المزدوجة التي تربط الجزء العلوي بالنعل الداخلي بحزام جلدي معزز، مقاومة للماء وقابلة لإعادة استبدال النعل لعقود.
              </p>
            </div>

            <div className="bg-[#2C1B15] p-6 rounded-sm border border-[#4A2E1F] hover:border-[#C5A059]/60 transition-all">
              <div className="font-brand text-2xl font-bold text-[#C5A059] mb-3">04</div>
              <h3 className="font-heading text-xl font-bold text-[#FAF7F2] mb-2">
                صقل الباتينا اليدوي
              </h3>
              <p className="text-xs sm:text-sm text-[#DFCBB7] leading-relaxed">
                تُصبغ كل قطعة يدوياً بزيوت عطرية وشمع النحل الطبيعي لإنتاج تدرجات لونية غنية وفريدة تجعل حذاءك لا مثيل له في العالم.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Required Section: "قسم خاص بالأحذية الجلدية الفاخرة" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        <div className="bg-[#FAF7F2] border-2 border-[#C5A059]/40 p-8 sm:p-12 rounded-sm shadow-xl relative overflow-hidden">
          
          {/* Atelier Seal Accent */}
          <div className="absolute top-0 left-0 bg-[#C5A059] text-[#241611] text-xs font-brand tracking-widest font-bold px-6 py-2 rounded-br-sm uppercase">
            Master Craftsman Series
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
            
            {/* Story & Specifications */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-brand uppercase tracking-wider text-[#A67C38] font-bold">
                  The Pinnacle of European Artistry
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#241611]">
                  قسم الأحذية الجلدية الفاخرة
                </h2>
                <p className="text-sm sm:text-base text-[#6B5546] leading-relaxed font-light">
                  مجموعة استثنائية لأصحاب الذوق الأكثر تطلباً، صُممت ونُفذت في مشاغل متخصصة تستغرق في صُنع الزوج الواحد ما يزيد عن 40 ساعة من العمل اليدوي الدقيق.
                </p>
              </div>

              {/* Craft Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#3E2B21]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>قصة هول-كت قطة واحدة بدون درزات جانبية</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>نعل جلدي هيدروليكي مدبوغ بخشب البلوط</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>بطانة جلدية مسامية طبيعية تمنع التعرق</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>قوالب مجانية من خشب الأرز لحفظ الحذاء</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreLuxury}
                  className="bg-[#241611] hover:bg-[#3D2517] text-[#FAF7F2] px-6 py-3 rounded-xs text-sm font-medium transition shadow-md flex items-center gap-2 border border-[#C5A059]/40 cursor-pointer"
                >
                  <span>عرض تشكيلة الأحذية الفاخرة</span>
                  <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>

            </div>

            {/* Featured Luxury Showcase Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {luxuryProducts.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenQuickView(item)}
                  className="group bg-[#F4EFE6] rounded-xs border border-[#DFD3BF] p-3 hover:border-[#C5A059] transition shadow-xs hover:shadow-lg cursor-pointer"
                >
                  <div className="aspect-square rounded-xs overflow-hidden bg-[#E6DAC8] mb-3 relative">
                    <img
                      src={item.primaryImage}
                      alt={item.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#241611]/90 text-[#F4EFE6] text-[10px] px-2 py-0.5 rounded-xs">
                      {item.badge || 'إصدار فاخر'}
                    </div>
                  </div>

                  <h4 className="font-heading font-bold text-sm text-[#241611] line-clamp-1">
                    {item.nameAr}
                  </h4>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-brand font-bold text-sm text-[#241611]">
                      {item.price.toLocaleString('ar-EG')} ج.م
                    </span>
                    <span className="text-[11px] text-[#C5A059] font-medium group-hover:underline">
                      معاينة الحذاء
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
