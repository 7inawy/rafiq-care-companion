
import { Product } from '@/types/marketplace';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'كرة تمارين التوازن للأطفال',
    imageUrls: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    description: 'كرة تمارين مخصصة لتحسين التوازن والتناسق الحركي عند الأطفال. مصنوعة من مواد آمنة ومقاومة للانفجار.',
    specifications: [
      'قطر 45 سم',
      'مقاومة للانفجار حتى 300 كيلو',
      'مواد خالية من البي في سي',
      'مناسبة للأعمار 3-12 سنة'
    ],
    price: 250,
    originalPrice: 300,
    category: 'أدوات علاجية',
    rating: 4.8,
    reviewCount: 156,
    reviews: [
      {
        id: '1',
        reviewerName: 'أم محمد',
        rating: 5,
        comment: 'منتج ممتاز ساعد ابني كثيراً في تحسين توازنه',
        date: '2024-01-15'
      },
      {
        id: '2',
        reviewerName: 'د. سارة أحمد',
        rating: 5,
        comment: 'أنصح به كأخصائية علاج طبيعي، جودة عالية',
        date: '2024-01-20'
      }
    ],
    isExpertRecommended: true,
    inStock: true
  },
  {
    id: '2',
    name: 'مجموعة أدوات العلاج الحسي للمضغ',
    imageUrls: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    description: 'مجموعة متنوعة من أدوات المضغ الآمنة لمساعدة الأطفال ذوي الاحتياجات الحسية على التنظيم الذاتي.',
    specifications: [
      'مجموعة من 6 قطع',
      'مواد سيليكون طبي آمن',
      'أشكال وملمس متنوع',
      'سهلة التنظيف'
    ],
    price: 180,
    category: 'أدوات علاجية',
    rating: 4.6,
    reviewCount: 89,
    reviews: [
      {
        id: '3',
        reviewerName: 'أم علي',
        rating: 5,
        comment: 'ساعدت ابنتي كثيراً في التحكم في سلوك المضغ',
        date: '2024-01-10'
      }
    ],
    isExpertRecommended: true,
    inStock: true
  },
  {
    id: '3',
    name: 'جهاز قياس الحرارة بدون لمس',
    imageUrls: ['/api/placeholder/300/300'],
    description: 'ترمومتر رقمي دقيق يقيس الحرارة من الجبهة بدون لمس، مناسب للأطفال من جميع الأعمار.',
    specifications: [
      'دقة ±0.2 درجة مئوية',
      'قياس سريع خلال ثانية واحدة',
      'ذاكرة لحفظ 32 قراءة',
      'شاشة LED ملونة'
    ],
    price: 320,
    originalPrice: 380,
    category: 'أجهزة صحية',
    rating: 4.7,
    reviewCount: 203,
    reviews: [
      {
        id: '4',
        reviewerName: 'أم آية',
        rating: 5,
        comment: 'دقيق جداً وسهل الاستخدام، لا يزعج الطفل',
        date: '2024-01-25'
      }
    ],
    isExpertRecommended: false,
    inStock: true
  },
  {
    id: '4',
    name: 'كتاب "فهم طفلك الحساس"',
    imageUrls: ['/api/placeholder/300/300'],
    description: 'دليل شامل للوالدين لفهم وتربية الأطفال ذوي الحساسية العالية والاحتياجات الحسية الخاصة.',
    specifications: [
      '280 صفحة',
      'تأليف د. إيلين آرون',
      'ترجمة عربية معتمدة',
      'غلاف مقوى'
    ],
    price: 120,
    category: 'كتب ومصادر',
    rating: 4.9,
    reviewCount: 78,
    reviews: [
      {
        id: '5',
        reviewerName: 'أم نور',
        rating: 5,
        comment: 'كتاب رائع غير نظرتي لطفلي الحساس',
        date: '2024-01-30'
      }
    ],
    isExpertRecommended: true,
    inStock: true
  },
  {
    id: '5',
    name: 'لعبة مكعبات التطوير الحسي',
    imageUrls: ['/api/placeholder/300/300'],
    description: 'مجموعة مكعبات متنوعة الملمس والألوان لتطوير المهارات الحسية والحركية الدقيقة.',
    specifications: [
      '12 مكعب بملمس مختلف',
      'ألوان زاهية آمنة',
      'مناسب للأعمار 6 أشهر - 3 سنوات',
      'خالية من المواد الضارة'
    ],
    price: 95,
    category: 'ألعاب تنمية',
    rating: 4.4,
    reviewCount: 124,
    reviews: [
      {
        id: '6',
        reviewerName: 'أم زياد',
        rating: 4,
        comment: 'ابني يحبها كثيراً، لكن أتمنى أن تكون أكبر حجماً',
        date: '2024-02-01'
      }
    ],
    isExpertRecommended: false,
    inStock: true
  },
  {
    id: '6',
    name: 'جهاز ترطيب الهواء للأطفال',
    imageUrls: ['/api/placeholder/300/300'],
    description: 'جهاز ترطيب آمن للأطفال مع إضاءة هادئة وعمل صامت لبيئة نوم مثالية.',
    specifications: [
      'سعة خزان 2.5 لتر',
      'عمل مستمر 12 ساعة',
      'إضاءة LED متعددة الألوان',
      'إيقاف تلقائي عند انتهاء الماء'
    ],
    price: 280,
    category: 'أجهزة صحية',
    rating: 4.5,
    reviewCount: 67,
    reviews: [
      {
        id: '7',
        reviewerName: 'أم مريم',
        rating: 5,
        comment: 'ممتاز لغرفة الأطفال، صوت هادئ جداً',
        date: '2024-02-05'
      }
    ],
    isExpertRecommended: false,
    inStock: false
  }
];

export const productCategories = [
  { id: 'all', name: 'الكل', icon: '🛍️' },
  { id: 'therapy-tools', name: 'أدوات علاجية', icon: '🔧' },
  { id: 'developmental-toys', name: 'ألعاب تنمية', icon: '🧸' },
  { id: 'health-devices', name: 'أجهزة صحية', icon: '🩺' },
  { id: 'books-resources', name: 'كتب ومصادر', icon: '📚' }
];

export const egyptianGovernorates = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الغربية',
  'المنوفية',
  'القليوبية',
  'البحيرة',
  'كفر الشيخ',
  'الدقهلية',
  'دمياط',
  'الشرقية',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'شمال سيناء',
  'جنوب سيناء',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'الفيوم',
  'بني سويف'
];

export const governorateCities: Record<string, string[]> = {
  'الغربية': ['طنطا', 'المحلة الكبرى', 'كفر الزيات', 'زفتى', 'السنطة', 'قطور', 'بسيون'],
  'القاهرة': ['مصر الجديدة', 'المعادي', 'الزمالك', 'الدقي', 'مدينة نصر', 'الجيزة', 'حلوان'],
  'الإسكندرية': ['المنتزه', 'وسط الإسكندرية', 'العامرية', 'الجمرك', 'اللبان', 'الدخيلة']
};
