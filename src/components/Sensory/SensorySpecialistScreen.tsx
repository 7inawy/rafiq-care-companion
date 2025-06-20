
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Layout/Header';

interface SensorySpecialistScreenProps {
  onBack: () => void;
  onNavigateToProfile: (specialistId: string) => void;
}

const SensorySpecialistScreen: React.FC<SensorySpecialistScreenProps> = ({ onBack, onNavigateToProfile }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const specialties = [
    { id: 'all', label: 'جميع التخصصات', count: 42 },
    { id: 'occupational-therapy', label: 'علاج وظيفي', count: 15 },
    { id: 'speech-therapy', label: 'تخاطب', count: 12 },
    { id: 'physical-therapy', label: 'علاج طبيعي', count: 8 },
    { id: 'rehabilitation-center', label: 'مراكز تأهيل', count: 7 }
  ];

  const specialists = [
    {
      id: '1',
      name: 'د. منى أحمد محمد',
      specialty: 'occupational-therapy',
      credentials: 'ماجستير العلاج الوظيفي - جامعة القاهرة',
      experience: 12,
      rating: 4.9,
      reviewCount: 156,
      location: 'المهندسين، الجيزة',
      approach: ['العلاج الحسي', 'التكامل الحسي', 'تطوير المهارات الحركية'],
      acceptsInsurance: true,
      consultationFee: 400,
      avatar: '/api/placeholder/60/60',
      bio: 'أخصائي علاج وظيفي معتمد مع خبرة واسعة في التعامل مع الاضطرابات الحسية عند الأطفال',
      availableSlots: ['الأحد 10:00 ص', 'الثلاثاء 2:00 م', 'الخميس 11:00 ص']
    },
    {
      id: '2',
      name: 'أ. سارة حسين علي',
      specialty: 'speech-therapy',
      credentials: 'بكالوريوس علوم التخاطب - جامعة عين شمس',
      experience: 8,
      rating: 4.7,
      reviewCount: 89,
      location: 'مصر الجديدة، القاهرة',
      approach: ['تطوير التواصل', 'تحسين النطق', 'العلاج السلوكي'],
      acceptsInsurance: false,
      consultationFee: 350,
      avatar: '/api/placeholder/60/60',
      bio: 'أخصائي تخاطب متخصص في التعامل مع صعوبات التواصل المرتبطة بالاضطرابات الحسية',
      availableSlots: ['السبت 9:00 ص', 'الاثنين 3:00 م']
    },
    {
      id: '3',
      name: 'د. أحمد سليم إبراهيم',
      specialty: 'physical-therapy',
      credentials: 'دكتوراه العلاج الطبيعي - جامعة الإسكندرية',
      experience: 15,
      rating: 4.8,
      reviewCount: 203,
      location: 'الدقي، الجيزة',
      approach: ['تطوير التوازن', 'تقوية العضلات', 'تحسين التنسيق'],
      acceptsInsurance: true,
      consultationFee: 450,
      avatar: '/api/placeholder/60/60',
      bio: 'خبير في العلاج الطبيعي للأطفال مع تركيز خاص على المشاكل الحركية المرتبطة بالاضطرابات الحسية',
      availableSlots: ['الأحد 1:00 م', 'الأربعاء 10:00 ص', 'الجمعة 2:00 م']
    },
    {
      id: '4',
      name: 'مركز النور للتأهيل',
      specialty: 'rehabilitation-center',
      credentials: 'مركز معتمد من وزارة الصحة',
      experience: 20,
      rating: 4.6,
      reviewCount: 342,
      location: 'مدينة نصر، القاهرة',
      approach: ['برامج شاملة', 'فريق متعدد التخصصات', 'خطط فردية'],
      acceptsInsurance: true,
      consultationFee: 300,
      avatar: '/api/placeholder/60/60',
      bio: 'مركز متخصص يقدم خدمات تأهيل شاملة للأطفال ذوي الاضطرابات الحسية',
      availableSlots: ['يومياً 9:00 ص - 5:00 م']
    },
    {
      id: '5',
      name: 'أ. نورا محمد فاروق',
      specialty: 'occupational-therapy',
      credentials: 'ماجستير العلاج الوظيفي - الجامعة الأمريكية',
      experience: 10,
      rating: 4.9,
      reviewCount: 127,
      location: 'الزمالك، القاهرة',
      approach: ['اللعب العلاجي', 'تطوير المهارات اليومية', 'التدريب الأسري'],
      acceptsInsurance: false,
      consultationFee: 500,
      avatar: '/api/placeholder/60/60',
      bio: 'متخصص في استخدام الأنشطة العلاجية لتطوير قدرات الأطفال ذوي الاضطرابات الحسية',
      availableSlots: ['الثلاثاء 11:00 ص', 'الخميس 3:00 م']
    },
    {
      id: '6',
      name: 'د. هالة عبد الرحمن',
      specialty: 'speech-therapy',
      credentials: 'دكتوراه اضطرابات التواصل - جامعة حلوان',
      experience: 14,
      rating: 4.8,
      reviewCount: 198,
      location: 'المعادي، القاهرة',
      approach: ['تحليل السلوك التطبيقي', 'تطوير اللغة', 'التدخل المبكر'],
      acceptsInsurance: true,
      consultationFee: 420,
      avatar: '/api/placeholder/60/60',
      bio: 'خبيرة في علاج اضطرابات التواصل والنطق المرتبطة بالمشاكل الحسية',
      availableSlots: ['السبت 2:00 م', 'الاثنين 10:00 ص', 'الأربعاء 4:00 م']
    }
  ];

  const getSpecialtyLabel = (specialty: string) => {
    const spec = specialties.find(s => s.id === specialty);
    return spec ? spec.label : specialty;
  };

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case 'occupational-therapy': return '🧩';
      case 'speech-therapy': return '🗣️';
      case 'physical-therapy': return '🏃‍♂️';
      case 'rehabilitation-center': return '🏥';
      default: return '👩‍⚕️';
    }
  };

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSpecialty = selectedSpecialty === 'all' || specialist.specialty === selectedSpecialty;
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.approach.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="دليل المختصين" onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Input
            placeholder="ابحث عن مختص أو موقع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Specialty Filters */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">التخصصات</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {specialties.map((specialty) => (
              <Button
                key={specialty.id}
                variant={selectedSpecialty === specialty.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedSpecialty === specialty.id 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSpecialty(specialty.id)}
              >
                {specialty.label} ({specialty.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Specialists List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              المختصين ({filteredSpecialists.length})
            </h3>
          </div>
          
          <div className="space-y-4">
            {filteredSpecialists.map((specialist) => (
              <Card 
                key={specialist.id} 
                className="bg-white shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigateToProfile(specialist.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img 
                        src={specialist.avatar} 
                        alt={specialist.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>

                    {/* Specialist Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {specialist.name}
                          </h4>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{getSpecialtyIcon(specialist.specialty)}</span>
                            <span className="text-xs text-purple-600 font-medium">
                              {getSpecialtyLabel(specialist.specialty)}
                            </span>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm font-semibold">{specialist.rating}</span>
                            <span className="text-xs text-gray-500">({specialist.reviewCount})</span>
                          </div>
                          <p className="text-xs text-gray-500">{specialist.experience} سنة خبرة</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mb-2">{specialist.credentials}</p>
                      <p className="text-xs text-gray-600 mb-3">📍 {specialist.location}</p>

                      {/* Approach Tags */}
                      <div className="flex gap-1 flex-wrap mb-3">
                        {specialist.approach.slice(0, 3).map((approach, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                          >
                            {approach}
                          </span>
                        ))}
                        {specialist.approach.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{specialist.approach.length - 3} أخرى
                          </span>
                        )}
                      </div>

                      {/* Bottom Info */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-green-600">
                            {specialist.consultationFee} جنيه
                          </span>
                          {specialist.acceptsInsurance && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              يقبل التأمين
                            </span>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700 text-xs px-3 py-1"
                        >
                          احجز الآن
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSpecialists.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍⚕️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا يوجد مختصين</h3>
              <p className="text-gray-600">جرب تغيير المرشحات أو البحث بكلمات أخرى</p>
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🚨</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 text-sm mb-1">
                حالة طوارئ؟
              </h3>
              <p className="text-xs text-red-700">
                اتصل بخط المساعدة للحصول على استشارة فورية
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              اتصل الآن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorySpecialistScreen;
