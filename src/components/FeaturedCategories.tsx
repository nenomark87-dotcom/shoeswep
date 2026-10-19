import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ShoeCategory } from '../types';

interface FeaturedCategoriesProps {
  onSelectCategory: (category: ShoeCategory) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'mens' as ShoeCategory,
      title: 'أحذية رجالية رسمية',
      subtitle: 'أكسفورد، بروغ ودبل مونك للأناقة الرسمية',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      tag: 'كلاسيكيات الرجال',
    },
    {
      id: 'loafers' as ShoeCategory,
      title: 'أحذية لوفر كلاسيكية',
      subtitle: 'بيني لوفر وتاسل بخياطة يدوية للراحة اليومية',
      image: 'https://images.unsplash.com/photo-1582898956396-857502476b7e?auto=format&fit=crop&w=800&q=80',
      tag: 'انسيابية وراحة',
    },
    {
      id: 'womens' as ShoeCategory,
      title: 'أحذية نسائية راقية',
      subtitle: 'تصاميم كلاسيكية بكعوب مريحة وسلينج باك باريسي',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      tag: 'أناقة أنثوية',
    },
    {
      id: 'leather_luxury' as ShoeCategory,
      title: 'أحذية جلدية فاخرة',
      subtitle: 'هول-كت قطة واحدة وبوت تشيلسي من جلود الباتينا',
      image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      tag: 'إصدارات نادرة',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F4EFE6] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-6 h-[1px] bg-[#C5A059]"></div>
            <span className="font-brand uppercase text-xs tracking-widest text-[#C5A059] font-bold">Curated Collections</span>
            <div className="w-6 h-[1px] bg-[#C5A059]"></div>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#241611]">
            المجموعات الكلاسيكية المختارة
          </h2>
          <p className="text-[#6B5546] text-sm sm:text-base mt-2">
            استكشف تشكيلاتنا المصممة بعناية فائقة لتلائم كافة المناسبات الرسمية والاجتماعية
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                const catalogEl = document.getElementById('catalog-section');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-96 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#DFD3BF] bg-[#241611]"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241611] via-[#241611]/40 to-transparent transition-opacity group-hover:from-[#241611]/95" />

              {/* Tag pill */}
              <div className="absolute top-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#241611] text-[11px] font-medium px-2.5 py-1 rounded-xs border border-[#C5A059]/40">
                {cat.tag}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-right transition-transform duration-300">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F4EFE6] group-hover:text-[#C5A059] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#DFCBB7] mt-1.5 line-clamp-2 font-light">
                  {cat.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#C5A059] group-hover:text-white transition-colors">
                  <span>تصفح التشكيلة</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* Subtle top-corner border accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
