
import { Doctor, Clinic, Review } from '@/types/doctor';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    fullName: 'د. أميرة محمد حسن',
    profilePhoto: '/api/placeholder/120/120',
    primarySpecialty: 'طب الأطفال العام',
    subSpecialties: ['حديثي الولادة', 'تغذية الأطفال'],
    qualifications: ['دكتوراه طب الأطفال - جامعة القاهرة', 'ماجستير حديثي الولادة'],
    yearsOfExperience: 12,
    biography: 'طبيبة أطفال متخصصة مع خبرة واسعة في رعاية الأطفال حديثي الولادة والرضع. حاصلة على العديد من الشهادات المتخصصة.',
    languagesSpoken: ['العربية', 'الإنجليزية'],
    overallRating: 4.8,
    totalReviews: 156,
    consultationFeeStart: 300,
    availableServices: ['clinic', 'home', 'video'],
    acceptedInsurance: ['مصر للتأمين', 'الشركة الأهلية للتأمين']
  },
  {
    id: '2',
    fullName: 'د. محمد أحمد الشناوي',
    profilePhoto: '/api/placeholder/120/120',
    primarySpecialty: 'حساسية ومناعة الأطفال',
    subSpecialties: ['الربو', 'الحساسية الغذائية'],
    qualifications: ['دكتوراه المناعة والحساسية', 'زمالة الكلية الملكية البريطانية'],
    yearsOfExperience: 8,
    biography: 'متخصص في علاج حساسية الأطفال والربو مع خبرة في أحدث طرق العلاج المناعي.',
    languagesSpoken: ['العربية', 'الإنجليزية', 'الفرنسية'],
    overallRating: 4.9,
    totalReviews: 89,
    consultationFeeStart: 350,
    availableServices: ['clinic', 'video'],
    acceptedInsurance: ['مصر للتأمين']
  },
  {
    id: '3',
    fullName: 'د. سارة علي منصور',
    profilePhoto: '/api/placeholder/120/120',
    primarySpecialty: 'أسنان الأطفال',
    subSpecialties: ['تقويم الأسنان', 'طب أسنان الأطفال الوقائي'],
    qualifications: ['دكتوراه طب أسنان الأطفال', 'دبلوم تقويم الأسنان'],
    yearsOfExperience: 6,
    biography: 'طبيبة أسنان متخصصة في علاج الأطفال مع التركيز على الوقاية والعلاج المبكر.',
    languagesSpoken: ['العربية', 'الإنجليزية'],
    overallRating: 4.7,
    totalReviews: 67,
    consultationFeeStart: 250,
    availableServices: ['clinic'],
    acceptedInsurance: ['الشركة الأهلية للتأمين']
  }
];

export const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'عيادة د. أميرة حسن - مدينة نصر',
    address: 'شارع مصطفى النحاس، مدينة نصر، القاهرة',
    phone: '01012345678',
    latitude: 30.0626,
    longitude: 31.3549,
    photos: ['/api/placeholder/300/200'],
    doctorId: '1'
  },
  {
    id: '2',
    name: 'عيادة د. أميرة حسن - الزمالك',
    address: 'شارع البرازيل، الزمالك، القاهرة',
    phone: '01012345679',
    latitude: 30.0626,
    longitude: 31.2337,
    photos: ['/api/placeholder/300/200'],
    doctorId: '1'
  },
  {
    id: '3',
    name: 'مركز الشناوي للحساسية',
    address: 'كورنيش النيل، المعادي، القاهرة',
    phone: '01098765432',
    latitude: 29.9601,
    longitude: 31.2569,
    photos: ['/api/placeholder/300/200'],
    doctorId: '2'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    appointmentId: 'app1',
    doctorId: '1',
    parentId: 'parent1',
    rating: 5,
    comment: 'دكتورة ممتازة وصبورة مع الأطفال. شرحت كل شيء بوضوح وأعطتني نصائح مفيدة.',
    reviewDate: new Date('2024-11-15'),
    parentName: 'أم محمد'
  },
  {
    id: '2',
    appointmentId: 'app2',
    doctorId: '1',
    parentId: 'parent2',
    rating: 5,
    comment: 'أفضل طبيبة أطفال تعاملت معها. ابنتي تحبها كثيراً.',
    reviewDate: new Date('2024-11-10'),
    parentName: 'أم فاطمة'
  },
  {
    id: '3',
    appointmentId: 'app3',
    doctorId: '2',
    parentId: 'parent3',
    rating: 4,
    comment: 'طبيب متخصص ومتمكن. ساعدني كثيراً في علاج حساسية ابني.',
    reviewDate: new Date('2024-11-08'),
    parentName: 'أم أحمد'
  }
];

export const specialties = [
  'طب الأطفال العام',
  'حديثي الولادة',
  'حساسية ومناعة',
  'تخاطب',
  'أسنان أطفال',
  'جراحة أطفال',
  'قلب أطفال',
  'جهاز هضمي أطفال'
];

export const cities = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الشرقية',
  'الدقهلية',
  'البحيرة',
  'الفيوم',
  'بني سويف'
];
