
import { GenericVaccine } from '@/types/vaccination';

export const EGYPTIAN_VACCINE_SCHEDULE: GenericVaccine[] = [
  // Birth vaccines (within 24 hours)
  {
    id: 'bcg',
    nameAr: 'تطعيم الدرن',
    nameEn: 'BCG',
    description: 'يحمي من مرض السل الرئوي',
    protectsAgainst: ['السل الرئوي', 'التهاب السحايا السلي'],
    recommendedAgeMonths: 0,
    sideEffects: ['احمرار مكان الحقن', 'تورم بسيط', 'تكون ندبة صغيرة'],
    careTips: ['حافظي على نظافة مكان الحقن', 'لا تضعي أي كريمات', 'الندبة الصغيرة طبيعية'],
    category: 'birth'
  },
  {
    id: 'polio-0',
    nameAr: 'شلل الأطفال (الجرعة الصفرية)',
    nameEn: 'Polio (Birth Dose)',
    description: 'الجرعة الأولى للحماية من شلل الأطفال',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 0,
    sideEffects: ['حمى خفيفة', 'هياج بسيط'],
    careTips: ['أعطي الطفل السوائل الكافية', 'راقبي درجة الحرارة'],
    category: 'birth'
  },
  {
    id: 'hep-b-birth',
    nameAr: 'الالتهاب الكبدي "ب"',
    nameEn: 'Hepatitis B',
    description: 'يحمي من التهاب الكبد الوبائي ب',
    protectsAgainst: ['التهاب الكبد الوبائي ب'],
    recommendedAgeMonths: 0,
    sideEffects: ['ألم مكان الحقن', 'حمى خفيفة'],
    careTips: ['كمادات باردة على مكان الحقن', 'مسكن حسب إرشادات الطبيب'],
    category: 'birth'
  },

  // 2 Months vaccines
  {
    id: 'pentavalent-1',
    nameAr: 'التطعيم الخماسي (الجرعة الأولى)',
    nameEn: 'Pentavalent (1st dose)',
    description: 'يحمي من خمسة أمراض خطيرة',
    protectsAgainst: ['الدفتريا', 'السعال الديكي', 'التيتانوس', 'التهاب الكبد ب', 'المستدمية النزلية'],
    recommendedAgeMonths: 2,
    sideEffects: ['حمى', 'هياج', 'فقدان شهية مؤقت', 'تورم مكان الحقن'],
    careTips: ['خافض حرارة عند الحاجة', 'كثري الرضاعة', 'راحة تامة للطفل'],
    category: 'infant'
  },
  {
    id: 'polio-1',
    nameAr: 'شلل الأطفال (الجرعة الأولى)',
    nameEn: 'Polio (1st dose)',
    description: 'الجرعة الثانية للحماية من شلل الأطفال',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 2,
    sideEffects: ['حمى خفيفة', 'هياج بسيط'],
    careTips: ['أعطي الطفل السوائل الكافية', 'راقبي درجة الحرارة'],
    category: 'infant'
  },

  // 4 Months vaccines
  {
    id: 'pentavalent-2',
    nameAr: 'التطعيم الخماسي (الجرعة الثانية)',
    nameEn: 'Pentavalent (2nd dose)',
    description: 'الجرعة التنشيطية الأولى للتطعيم الخماسي',
    protectsAgainst: ['الدفتريا', 'السعال الديكي', 'التيتانوس', 'التهاب الكبد ب', 'المستدمية النزلية'],
    recommendedAgeMonths: 4,
    sideEffects: ['حمى', 'هياج', 'تورم مكان الحقن'],
    careTips: ['خافض حرارة عند الحاجة', 'كثري الرضاعة', 'مراقبة مستمرة'],
    category: 'infant'
  },
  {
    id: 'polio-2',
    nameAr: 'شلل الأطفال (الجرعة الثانية)',
    nameEn: 'Polio (2nd dose)',
    description: 'الجرعة الثالثة للحماية من شلل الأطفال',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 4,
    sideEffects: ['حمى خفيفة'],
    careTips: ['سوائل كافية', 'راحة'],
    category: 'infant'
  },
  {
    id: 'ipv-1',
    nameAr: 'شلل الأطفال بالحقن (سولك)',
    nameEn: 'IPV (Salk)',
    description: 'تطعيم شلل الأطفال المعطل بالحقن',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 4,
    sideEffects: ['ألم بسيط مكان الحقن'],
    careTips: ['كمادات باردة', 'مراقبة مكان الحقن'],
    category: 'infant'
  },

  // 6 Months vaccines
  {
    id: 'pentavalent-3',
    nameAr: 'التطعيم الخماسي (الجرعة الثالثة)',
    nameEn: 'Pentavalent (3rd dose)',
    description: 'الجرعة الأخيرة من السلسلة الأولية للتطعيم الخماسي',
    protectsAgainst: ['الدفتريا', 'السعال الديكي', 'التيتانوس', 'التهاب الكبد ب', 'المستدمية النزلية'],
    recommendedAgeMonths: 6,
    sideEffects: ['حمى', 'هياج', 'تورم مكان الحقن'],
    careTips: ['خافض حرارة عند الحاجة', 'راحة تامة', 'مراقبة مستمرة'],
    category: 'infant'
  },
  {
    id: 'polio-3',
    nameAr: 'شلل الأطفال (الجرعة الثالثة)',
    nameEn: 'Polio (3rd dose)',
    description: 'الجرعة الرابعة للحماية من شلل الأطفال',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 6,
    sideEffects: ['حمى خفيفة'],
    careTips: ['سوائل كافية', 'راحة'],
    category: 'infant'
  },

  // 9 Months vaccines
  {
    id: 'polio-4',
    nameAr: 'شلل الأطفال (الجرعة الرابعة)',
    nameEn: 'Polio (4th dose)',
    description: 'الجرعة الخامسة للحماية من شلل الأطفال',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 9,
    sideEffects: ['حمى خفيفة'],
    careTips: ['سوائل كافية', 'راحة'],
    category: 'infant'
  },

  // 12 Months vaccines
  {
    id: 'mmr-1',
    nameAr: 'تطعيم MMR (الجرعة الأولى)',
    nameEn: 'MMR (1st dose)',
    description: 'يحمي من الحصبة والنكاف والحصبة الألمانية',
    protectsAgainst: ['الحصبة', 'النكاف', 'الحصبة الألمانية'],
    recommendedAgeMonths: 12,
    sideEffects: ['حمى', 'طفح جلدي خفيف', 'تورم الغدد اللمفاوية'],
    careTips: ['خافض حرارة', 'ملاحظة أي طفح جلدي', 'تجنب الأسبرين'],
    category: 'toddler'
  },
  {
    id: 'polio-5',
    nameAr: 'شلل الأطفال (الجرعة الخامسة)',
    nameEn: 'Polio (5th dose)',
    description: 'الجرعة السادسة للحماية من شلل الأطفال',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 12,
    sideEffects: ['حمى خفيفة'],
    careTips: ['سوائل كافية', 'راحة'],
    category: 'toddler'
  },

  // 18 Months vaccines
  {
    id: 'dpt-booster',
    nameAr: 'الجرعة المنشطة DPT',
    nameEn: 'DPT Booster',
    description: 'جرعة تنشيطية للدفتريا والسعال الديكي والتيتانوس',
    protectsAgainst: ['الدفتريا', 'السعال الديكي', 'التيتانوس'],
    recommendedAgeMonths: 18,
    sideEffects: ['حمى', 'ألم مكان الحقن', 'هياج'],
    careTips: ['خافض حرارة عند الحاجة', 'كمادات باردة', 'راحة'],
    category: 'toddler'
  },
  {
    id: 'mmr-booster',
    nameAr: 'الجرعة المنشطة MMR',
    nameEn: 'MMR Booster',
    description: 'جرعة تنشيطية للحصبة والنكاف والحصبة الألمانية',
    protectsAgainst: ['الحصبة', 'النكاف', 'الحصبة الألمانية'],
    recommendedAgeMonths: 18,
    sideEffects: ['حمى', 'طفح جلدي خفيف'],
    careTips: ['خافض حرارة', 'مراقبة الطفح الجلدي', 'راحة تامة'],
    category: 'toddler'
  },
  {
    id: 'polio-booster',
    nameAr: 'شلل الأطفال (جرعة منشطة)',
    nameEn: 'Polio Booster',
    description: 'جرعة تنشيطية لشلل الأطفال',
    protectsAgainst: ['شلل الأطفال'],
    recommendedAgeMonths: 18,
    sideEffects: ['حمى خفيفة'],
    careTips: ['سوائل كافية', 'راحة'],
    category: 'toddler'
  }
];
