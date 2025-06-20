
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Layout/Header';

interface SensoryVideoScreenProps {
  onBack: () => void;
}

const SensoryVideoScreen: React.FC<SensoryVideoScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'الكل', count: 18 },
    { id: 'sensory-exercises', label: 'تمارين حسية', count: 6 },
    { id: 'skill-development', label: 'تطوير المهارات', count: 5 },
    { id: 'parent-tips', label: 'نصائح للأهل', count: 4 },
    { id: 'success-stories', label: 'قصص نجاح', count: 3 }
  ];

  const ageGroups = [
    { id: 'all', label: 'جميع الأعمار' },
    { id: '0-2', label: '0-2 سنة' },
    { id: '2-5', label: '2-5 سنوات' },
    { id: '5+', label: '5+ سنوات' }
  ];

  const videos = [
    {
      id: '1',
      title: 'تمارين التهدئة الذاتية للأطفال',
      description: 'تقنيات بسيطة لمساعدة الطفل على تنظيم مشاعره',
      thumbnail: '/api/placeholder/300/200',
      duration: 720, // 12 minutes
      category: 'sensory-exercises',
      ageGroup: '2-5',
      difficulty: 'easy',
      viewCount: 1240,
      instructor: {
        name: 'د. سارة محمد',
        credentials: 'أخصائي علاج وظيفي'
      }
    },
    {
      id: '2',
      title: 'أنشطة تحفيز اللمس الآمنة',
      description: 'تمارين متدرجة لتطوير الحساسية اللمسية',
      thumbnail: '/api/placeholder/300/200',
      duration: 900, // 15 minutes
      category: 'sensory-exercises',
      ageGroup: '0-2',
      difficulty: 'medium',
      viewCount: 890,
      instructor: {
        name: 'أ. مها أحمد',
        credentials: 'أخصائي تأهيل طفولة مبكرة'
      }
    },
    {
      id: '3',
      title: 'كيفية التعامل مع نوبات الغضب الحسية',
      description: 'استراتيجيات عملية للوالدين',
      thumbnail: '/api/placeholder/300/200',
      duration: 1080, // 18 minutes
      category: 'parent-tips',
      ageGroup: '2-5',
      difficulty: 'medium',
      viewCount: 2100,
      instructor: {
        name: 'د. أحمد حسين',
        credentials: 'أخصائي سلوك أطفال'
      }
    },
    {
      id: '4',
      title: 'قصة نجاح: رحلة سارة مع العلاج الحسي',
      description: 'تجربة حقيقية لأسرة مصرية',
      thumbnail: '/api/placeholder/300/200',
      duration: 600, // 10 minutes
      category: 'success-stories',
      ageGroup: '5+',
      difficulty: 'easy',
      viewCount: 750,
      instructor: {
        name: 'أسرة محمد',
        credentials: 'تجربة شخصية'
      }
    },
    {
      id: '5',
      title: 'تطوير المهارات الحركية الدقيقة',
      description: 'أنشطة لتحسين التنسيق والبراعة',
      thumbnail: '/api/placeholder/300/200',
      duration: 840, // 14 minutes
      category: 'skill-development',
      ageGroup: '2-5',
      difficulty: 'hard',
      viewCount: 1680,
      instructor: {
        name: 'د. نورا سليم',
        credentials: 'أخصائي علاج طبيعي'
      }
    },
    {
      id: '6',
      title: 'تقنيات التنظيم الحسي في المنزل',
      description: 'طرق عملية لخلق بيئة داعمة',
      thumbnail: '/api/placeholder/300/200',
      duration: 960, // 16 minutes
      category: 'parent-tips',
      ageGroup: 'all',
      difficulty: 'easy',
      viewCount: 1450,
      instructor: {
        name: 'أ. ياسمين علي',
        credentials: 'مستشار أسري'
      }
    }
  ];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} دقيقة`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'سهل';
      case 'medium': return 'متوسط';
      case 'hard': return 'صعب';
      default: return difficulty;
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesAgeGroup = selectedAgeGroup === 'all' || video.ageGroup === selectedAgeGroup || video.ageGroup === 'all';
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAgeGroup && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="مكتبة الفيديو" onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Input
            placeholder="ابحث في مكتبة الفيديو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">التصنيفات</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedCategory === category.id 
                    ? 'bg-teal-600 hover:bg-teal-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Age Group Filters */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">الفئة العمرية</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {ageGroups.map((ageGroup) => (
              <Button
                key={ageGroup.id}
                variant={selectedAgeGroup === ageGroup.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedAgeGroup === ageGroup.id 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAgeGroup(ageGroup.id)}
              >
                {ageGroup.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              الفيديوهات ({filteredVideos.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="bg-white shadow-sm border cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    {/* Video Thumbnail */}
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover rounded-r-lg"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-r-lg flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                          <span className="text-lg">▶️</span>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 p-4 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {video.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {video.instructor.name} • {video.instructor.credentials}
                      </p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(video.difficulty)}`}>
                          {getDifficultyText(video.difficulty)}
                        </span>
                        <span className="text-xs text-gray-500">
                          👀 {video.viewCount.toLocaleString()} مشاهدة
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {ageGroups.find(ag => ag.id === video.ageGroup)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد فيديوهات</h3>
              <p className="text-gray-600">جرب تغيير المرشحات أو البحث بكلمات أخرى</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensoryVideoScreen;
