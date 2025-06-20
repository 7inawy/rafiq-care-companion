
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Layout/Header';

interface SensoryHubScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const SensoryHubScreen: React.FC<SensoryHubScreenProps> = ({ onNavigate, onBack }) => {
  const resourceCategories = [
    {
      id: 'articles',
      title: 'المقالات والأدلة',
      description: 'دلائل شاملة لفهم والتعامل مع الاضطرابات الحسية',
      icon: '📚',
      color: 'bg-blue-50 border-blue-100 hover:bg-blue-100',
      articles: 24
    },
    {
      id: 'videos',
      title: 'مكتبة الفيديو',
      description: 'تمارين وأنشطة مرئية من خبراء متخصصين',
      icon: '🎥',
      color: 'bg-green-50 border-green-100 hover:bg-green-100',
      videos: 18
    },
    {
      id: 'specialists',
      title: 'دليل المختصين',
      description: 'أخصائيين علاج وظيفي وتأهيل معتمدين',
      icon: '👩‍⚕️',
      color: 'bg-purple-50 border-purple-100 hover:bg-purple-100',
      specialists: 42
    },
    {
      id: 'activities',
      title: 'أنشطة منزلية',
      description: 'أنشطة عملية يمكن تطبيقها في المنزل',
      icon: '🏠',
      color: 'bg-orange-50 border-orange-100 hover:bg-orange-100',
      activities: 36
    }
  ];

  const featuredContent = [
    {
      title: 'فهم معالجة المعلومات الحسية عند الأطفال',
      type: 'مقال',
      readTime: '8 دقائق',
      author: 'د. منى أحمد - أخصائي علاج وظيفي'
    },
    {
      title: 'تمارين التهدئة الذاتية للأطفال',
      type: 'فيديو',
      duration: '12 دقيقة',
      author: 'أ. سارة محمد - أخصائي تأهيل'
    },
    {
      title: 'أنشطة تطوير الحواس باستخدام أدوات منزلية',
      type: 'نشاط',
      difficulty: 'سهل',
      ageGroup: '2-5 سنوات'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header title="دعم الاضطرابات الحسية" onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-teal-100">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl mx-auto flex items-center justify-center">
              <span className="text-3xl">🤗</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                مركز دعم الاضطرابات الحسية
              </h1>
              <p className="text-gray-600 leading-relaxed">
                موارد شاملة ودعم متخصص لمساعدة طفلك على التطور والنمو الصحي
              </p>
            </div>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl"
              onClick={() => onNavigate('sensory-assessment')}
            >
              <span className="text-lg ml-2">🔍</span>
              تقييم سريع للاحتياجات الحسية
            </Button>
          </div>
        </div>

        {/* Resource Categories */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">المصادر والموارد</h2>
          <div className="grid grid-cols-2 gap-3">
            {resourceCategories.map((category) => (
              <Card 
                key={category.id}
                className={`${category.color} border cursor-pointer transition-colors`}
                onClick={() => onNavigate(`sensory-${category.id}`)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-xs bg-white/80 px-2 py-1 rounded-full text-gray-600">
                        {category.id === 'articles' && `${category.articles} مقال`}
                        {category.id === 'videos' && `${category.videos} فيديو`}
                        {category.id === 'specialists' && `${category.specialists} مختص`}
                        {category.id === 'activities' && `${category.activities} نشاط`}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {category.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Content */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">محتوى مميز</h2>
          <div className="space-y-3">
            {featuredContent.map((content, index) => (
              <Card key={index} className="bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">
                        {content.type === 'مقال' && '📄'}
                        {content.type === 'فيديو' && '▶️'}
                        {content.type === 'نشاط' && '🎯'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                        {content.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{content.author}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                          {content.type}
                        </span>
                        {content.readTime && <span>⏱️ {content.readTime}</span>}
                        {content.duration && <span>⏱️ {content.duration}</span>}
                        {content.difficulty && <span>📊 {content.difficulty}</span>}
                        {content.ageGroup && <span>👶 {content.ageGroup}</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-xl">💡</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 text-sm mb-1">
                هل تحتاج مساعدة فورية؟
              </h3>
              <p className="text-xs text-amber-700">
                تواصل مع المختصين لاستشارة عاجلة
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => onNavigate('sensory-specialists')}
            >
              اتصل الآن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensoryHubScreen;
