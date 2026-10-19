import React, { useState } from 'react';
import { X, Ruler, HelpCircle, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

  if (!isOpen) return null;

  const menSizes = [
    { eu: 39, uk: 6, us: 7, cm: 24.5 },
    { eu: 40, uk: 6.5, us: 7.5, cm: 25.0 },
    { eu: 41, uk: 7.5, us: 8.5, cm: 26.0 },
    { eu: 42, uk: 8, us: 9, cm: 26.5 },
    { eu: 43, uk: 9, us: 10, cm: 27.5 },
    { eu: 44, uk: 9.5, us: 10.5, cm: 28.0 },
    { eu: 45, uk: 10.5, us: 11.5, cm: 29.0 },
    { eu: 46, uk: 11.5, us: 12.5, cm: 30.0 },
  ];

  const womenSizes = [
    { eu: 36, uk: 3.5, us: 5.5, cm: 22.5 },
    { eu: 37, uk: 4, us: 6, cm: 23.0 },
    { eu: 38, uk: 5, us: 7, cm: 24.0 },
    { eu: 39, uk: 6, us: 8, cm: 24.5 },
    { eu: 40, uk: 6.5, us: 8.5, cm: 25.5 },
    { eu: 41, uk: 7.5, us: 9.5, cm: 26.0 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241611]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] w-full max-w-2xl rounded-sm shadow-2xl border border-[#C5A059]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col text-right"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8DFC8] bg-[#F4EFE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-heading font-bold text-lg text-[#241611]">
              دليل المقاسات ونظام القياس الأوروبي
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EBE2D4] border border-[#DFD3BF] text-[#241611] flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Gender Tab Switch */}
          <div className="flex justify-center">
            <div className="inline-flex bg-[#EFE7D8] p-1 rounded-xs border border-[#DFD3BF]">
              <button
                onClick={() => setActiveTab('men')}
                className={`px-6 py-1.5 text-xs font-bold rounded-xs transition cursor-pointer ${
                  activeTab === 'men'
                    ? 'bg-[#241611] text-[#E8DFC8] shadow-xs'
                    : 'text-[#644E40] hover:text-[#241611]'
                }`}
              >
                أحذية رجالية (Men)
              </button>
              <button
                onClick={() => setActiveTab('women')}
                className={`px-6 py-1.5 text-xs font-bold rounded-xs transition cursor-pointer ${
                  activeTab === 'women'
                    ? 'bg-[#241611] text-[#E8DFC8] shadow-xs'
                    : 'text-[#644E40] hover:text-[#241611]'
                }`}
              >
                أحذية نسائية (Women)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#DFD3BF] rounded-xs overflow-hidden shadow-2xs">
            <table className="w-full text-center text-xs">
              <thead className="bg-[#241611] text-[#E8DFC8]">
                <tr>
                  <th className="py-2.5 px-3 font-brand font-bold border-l border-[#3D2517]">المقاس الأوروبي (EU)</th>
                  <th className="py-2.5 px-3 font-brand font-medium border-l border-[#3D2517]">البريطاني (UK)</th>
                  <th className="py-2.5 px-3 font-brand font-medium border-l border-[#3D2517]">الأمريكي (US)</th>
                  <th className="py-2.5 px-3 font-brand font-medium">طول القدم (سم)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFC8] bg-[#FAF7F2]">
                {(activeTab === 'men' ? menSizes : womenSizes).map((row, idx) => (
                  <tr key={row.eu} className={idx % 2 === 1 ? 'bg-[#F4EFE6]' : ''}>
                    <td className="py-2 px-3 font-bold text-[#241611] font-sans border-l border-[#E8DFC8]">
                      {row.eu}
                    </td>
                    <td className="py-2 px-3 text-[#5C483B] font-sans border-l border-[#E8DFC8]">
                      {row.uk}
                    </td>
                    <td className="py-2 px-3 text-[#5C483B] font-sans border-l border-[#E8DFC8]">
                      {row.us}
                    </td>
                    <td className="py-2 px-3 text-[#241611] font-bold font-sans">
                      {row.cm} سم
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure feet */}
          <div className="bg-[#F4EFE6] border border-[#DFD3BF] p-4 rounded-xs text-xs space-y-2 text-[#5C483B]">
            <h4 className="font-bold text-[#241611] flex items-center gap-1.5 text-sm">
              <HelpCircle className="w-4 h-4 text-[#C5A059]" />
              <span>كيف تقيس طول قدمك بدقة في المنزل؟</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 pr-1 leading-relaxed">
              <li>ضع ورقة بيضاء على أرضية مستوية وثبت كعبك على الحائط.</li>
              <li>ارسم خطاً بالقلم الرصاص عند أطول نقطة في أصابع قدمك (مع ارتداء الجورب المعتاد).</li>
              <li>قس المسافة بالمسطرة من حافة الورقة حتى الخط بالسنتمتر.</li>
              <li>طابق الرقم بالجدول أعلاه. إذا كان مقاسك بين رقمين، اختر المقاس الأكبر دائماً.</li>
            </ol>
          </div>

          {/* Reassurance */}
          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-300 p-3 rounded-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
            <span>
              لا تقلق بشأن المقاس: مندوب الشحن ينتظرك لتجربة الحذاء، وإذا لم يناسبك يمكنك استبداله مجاناً دون أي تعقيد.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
