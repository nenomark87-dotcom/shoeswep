export interface Governorate {
  id: string;
  nameAr: string;
  nameEn: string;
  deliveryDays: string;
  shippingFee: number;
}

export const EGYPTIAN_GOVERNORATES: Governorate[] = [
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', deliveryDays: 'خلال 24-48 ساعة', shippingFee: 65 },
  { id: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', deliveryDays: 'خلال 24-48 ساعة', shippingFee: 65 },
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', deliveryDays: 'خلال 48 ساعة', shippingFee: 75 },
  { id: 'dakahlia', nameAr: 'الدقهلية (المنصورة)', nameEn: 'Dakahlia', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 80 },
  { id: 'gharbia', nameAr: 'الغربية (طنطا)', nameEn: 'Gharbia', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 80 },
  { id: 'sharqia', nameAr: 'الشرقية (الزقازيق)', nameEn: 'Sharqia', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 80 },
  { id: 'qalyubia', nameAr: 'القليوبية', nameEn: 'Qalyubia', deliveryDays: 'خلال 24-48 ساعة', shippingFee: 70 },
  { id: 'menofia', nameAr: 'المنوفية', nameEn: 'Menofia', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 80 },
  { id: 'beheira', nameAr: 'البحيرة', nameEn: 'Beheira', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 85 },
  { id: 'damietta', nameAr: 'دمياط', nameEn: 'Damietta', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 85 },
  { id: 'port_said', nameAr: 'بورسعيد', nameEn: 'Port Said', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 85 },
  { id: 'ismailia', nameAr: 'الإسماعيلية', nameEn: 'Ismailia', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 85 },
  { id: 'suez', nameAr: 'السويس', nameEn: 'Suez', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 85 },
  { id: 'kafr_el_sheikh', nameAr: 'كفر الشيخ', nameEn: 'Kafr El Sheikh', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 85 },
  { id: 'fayoum', nameAr: 'الفيوم', nameEn: 'Fayoum', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 90 },
  { id: 'beni_suef', nameAr: 'بني سويف', nameEn: 'Beni Suef', deliveryDays: 'خلال 48-72 ساعة', shippingFee: 90 },
  { id: 'minya', nameAr: 'المنيا', nameEn: 'Minya', deliveryDays: 'خلال 3-4 أيام', shippingFee: 100 },
  { id: 'assiut', nameAr: 'أسيوط', nameEn: 'Assiut', deliveryDays: 'خلال 3-4 أيام', shippingFee: 100 },
  { id: 'sohag', nameAr: 'سوهاج', nameEn: 'Sohag', deliveryDays: 'خلال 3-4 أيام', shippingFee: 110 },
  { id: 'qena', nameAr: 'قنا', nameEn: 'Qena', deliveryDays: 'خلال 3-4 أيام', shippingFee: 110 },
  { id: 'luxor', nameAr: 'الأقصر', nameEn: 'Luxor', deliveryDays: 'خلال 3-4 أيام', shippingFee: 120 },
  { id: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', deliveryDays: 'خلال 3-4 أيام', shippingFee: 120 },
  { id: 'red_sea', nameAr: 'البحر الأحمر (الغردقة)', nameEn: 'Red Sea', deliveryDays: 'خلال 3-4 أيام', shippingFee: 120 },
];
