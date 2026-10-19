import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-[#F4EFE6] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-6 h-[1px] bg-[#C5A059]"></div>
            <span className="font-brand uppercase text-xs tracking-widest text-[#C5A059] font-bold">Atelier & Showroom</span>
            <div className="w-6 h-[1px] bg-[#C5A059]"></div>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#241611]">
            تواصل معنا وقم بزيارة صالة العرض
          </h2>
          <p className="text-[#6E594B] text-sm sm:text-base mt-2">
            فريق خبرائنا في صناعة وتنسيق الأحذية الكلاسيكية على أتم الاستعداد لمساعدتك في اختيار القالب والمقاس الأنسب.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Showroom info cards (5 cols in RTL) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#FAF7F2] border border-[#DFD3BF] p-6 rounded-xs shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#241611] pb-2 border-b border-[#E8DFC8] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>صالة العرض والمشغل الرئيسي</span>
              </h3>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5C483B]">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#241611] block">فرع الزمالك:</strong>
                  <span>26 شارع شجرة الدر، متفرع من 26 يوليو، الزمالك، القاهرة - مصر.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5C483B]">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#241611] block">مواعيد استقبال الزوار:</strong>
                  <span>يومياً من الساعة 11:00 صباحاً حتى 10:30 مساءً (طوال أيام الأسبوع).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5C483B]">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#241611] block">خدمة العملاء والطلبات:</strong>
                  <a href="tel:01099887766" className="font-brand hover:text-[#C5A059] font-bold text-[#241611] dir-ltr inline-block">
                    010 9988 7766
                  </a>
                  <span className="block text-[11px] text-[#8C7A6B]">متاح أيضاً عبر تطبيق واتساب</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5C483B]">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#241611] block">البريد الإلكتروني:</strong>
                  <span className="font-sans">concierge@classicshoes-eg.com</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/201099887766?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A3%D8%AD%D8%B0%D9%8A%D8%A9%20CLASSIC%20SHOES"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#1E3A2F] hover:bg-[#162D24] text-[#E8DFC8] text-center py-3 px-4 rounded-xs text-xs font-bold transition border border-[#2E5545] shadow-xs"
            >
              محادثة مباشرة عبر واتساب مع خبير الأحذية
            </a>

          </div>

          {/* Contact Form (7 cols in RTL) */}
          <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#DFD3BF] p-6 sm:p-8 rounded-xs shadow-xs">
            <h3 className="font-heading font-bold text-xl text-[#241611] mb-1">
              أرسل لنا استفسارك أو طلبك الخاص
            </h3>
            <p className="text-xs text-[#7A6453] mb-6">
              سواء كنت تبحث عن مقاس خاص، أو ترغب في تنسيق الحذاء المناسب لحفلة زفاف أو مناسبة رسمية، يسعدنا التجاوب معك.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xs text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-xs text-emerald-700">
                  شكراً لتواصلك، سيتصل بك مستشارنا خلال ساعات العمل لتزويدك بكافة التفاصيل.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#241611] mb-1">الاسم الكريم</label>
                    <input
                      type="text"
                      required
                      placeholder="اسمك الكريم"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#241611] mb-1">رقم الهاتف للتواصل</label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="01xxxxxxxxx"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none text-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#241611] mb-1">الموضوع أو الموديل المستفسر عنه</label>
                  <input
                    type="text"
                    placeholder="مثال: استفسار عن مقاس حذاء الأكسفورد الملكي"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2.5 rounded-xs text-xs text-[#241611] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#241611] mb-1">تفاصيل الرسالة</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="اكتب استفسارك هنا بكل تفصيل..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#F4EFE6] border border-[#DFD3BF] focus:border-[#C5A059] px-3.5 py-2 rounded-xs text-xs text-[#241611] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#241611] hover:bg-[#3D2517] text-[#FAF7F2] px-8 py-3 rounded-xs text-xs font-bold transition flex items-center justify-center gap-2 border border-[#C5A059]/40 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>إرسال الرسالة الآن</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
