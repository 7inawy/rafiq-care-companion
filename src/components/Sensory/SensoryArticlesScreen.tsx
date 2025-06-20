
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Layout/Header';

interface SensoryArticlesScreenProps {
  onBack: () => void;
  onNavigateToArticle: (articleId: string) => void;
}

const SensoryArticlesScreen: React.FC<SensoryArticlesScreenProps> = ({ onBack, onNavigateToArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'الكل', count: 24 },
    { id: 'understanding', label: 'فهم الاضطرابات الحسية', count: 8 },
    { id: 'home-strategies', label: 'استراتيجيات المنزل', count: 7 },
    { id: 'school-learning', label: 'المدرسة والتعلم', count: 5 },
    { id: 'nutrition', label: 'التغذية والحساسيات', count: 4 }
  ];

  const articles = [
    {
      id: '1',
      title: 'فهم معالجة المعلومات الحسية عند الأطفال',
      excerpt: 'دليل شامل لفهم كيفية معالجة الدماغ للمعلومات الحسية وما يحدث عند وجود اضطراب في هذه العملية',
      category: 'understanding',
      author: {
        name: 'د. منى أحمد',
        credentials: 'أخصائي علاج وظيفي - ماجستير في تطوير الطفولة',
        avatar: '/api/placeholder/40/40'
      },
      readTime: 8,
      publishDate: new Date('2024-12-15'),
      viewCount: 2340,
      isBookmarked: true,
      tags: ['أساسيات', 'تعريف', 'أعراض']
    },
    {
      id: '2',
      title: 'علامات مبكرة للاضطرابات الحسية في الرضع',
      excerpt: 'كيفية تحديد العلامات المبكرة للاضطرابات الحسية عند الأطفال الرضع والتدخل المبكر',
      category: 'understanding',
      author: {
        name: 'د. سارة حسين',
        credentials: 'طبيب أطفال - دكتوراه في النمو العصبي',
        avatar: '/api/placeholder/40/40'
      },
      readTime: 6,
      publishDate: new Date('2024-12-10'),
      viewCount: 1890,
      isBookmarked: false,
      tags: ['رضع', 'تشخيص مبكر', 'علامات']
    },
    {
      id: '3',
      title: 'كيفية إنشاء بيئة داعمة في المنزل',
      excerpt: 'نصائح عملية لتهيئة البيئة المنزلية لتكون مريحة ومحفزة للأطفال ذوي الاضطرابات الحسية',
      category: 'home-strategies',
      author: {
        name: 'أ. ليلى محمد',
        credentials: 'مستشار تربوي - خبرة 15 عام',
        avatar: '/api/placeholder/40/40'
      },
      readTime: 10,
      publishDate: new Date('2024-12-08'),
      viewCount: 3120,
      isBookmarked: true,
      tags: ['المنزل', 'بيئة', 'تنظيم']
    },
    {
      id: '4',
      title: 'التعامل مع الحساسية للأصوات العالية',
      excerpt: 'استراتيجيات مجربة للتعامل مع فرط الحساسية السمعية وتقليل التوتر الناتج عنها',
      category: 'home-strategies',
      author: {
        name: 'د. أحمد علي',
        credentials: 'أخصائي سمعيات - ماجستير علاج النطق',
        avatar: '/api/placeholder/40/40'
      },
      readTime: 7,
      publishDate: new Date('2024-12-05'),
      viewCount: 1560,
      isBookmarked: false,
      tags: ['حساسية سمعية', 'أصوات', 'تهدئة']
    },
    {
      id: '5',
      title: 'دمج الطفل في الأنشطة المدرسية',
      excerpt: 'كيفية العمل مع المدرسة لضمان مشاركة الطفل الفعالة في الأنشطة التعليمية',
      category: 'school-learning',
      author: {
        name: 'أ. نورا سليم',
        credentials: 'مدرس تربية خاصة - خبرة 12 عام',
        avatar: '/api/placeholder/40/40'
      },
      readTime: 9,
      publishDate: new Date('2024-12-03'),
      viewCount: 980,
      isBookmarked: false,
      tags: ['مدرسة', 'دمج', 'تعليم']
    },
    {
      id: '6',
      title: 'الأطعمة المفيدة لتطوير الحواس',
      excerpt: 'دليل غذائي شامل للأطعمة التي تساعد على تطوير الحواس وتحسين معالجة المعلومات',
      category: 'nutrition',
      author: {
        name: 'د. هالة أحمد',
        credentials: 'أخصائي تغذية أطفال - دبلوم تغذية علاجية',
        avatar: '/api/placeholder/40/40'
      },
      readTime: 12,
      publishDate: new Date('2024-12-01'),
      viewCount: 2240,
      isBookmarked: true,
      tags: ['تغذية', 'أطعمة', 'تطوير']
    }
  ];

  const recentlyRead = [
    { id: '1', title: 'فهم معالجة المعلومات الحسية عند الأطفال', progress: 85 },
    { id: '3', title: 'كيفية إنشاء بيئة داعمة في المنزل', progress: 60 },
    { id: '6', title: 'الأطعمة المفيدة لتطوير الحواس', progress: 30 }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="المقالات والأدلة" onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Input
            placeholder="ابحث في المقالات والأدلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Recently Read Section */}
        {recentlyRead.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">المقالات المقروءة مؤخراً</h3>
            <div className="space-y-2">
              {recentlyRead.map((article) => (
                <Card 
                  key={article.id} 
                  className="bg-blue-50 border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => onNavigateToArticle(article.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-900 text-sm line-clamp-1">
                        {article.title}
                      </h4>
                      <span className="text-xs text-blue-600">{article.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all" 
                        style={{ width: `${article.progress}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              المقالات ({filteredArticles.length})
            </h3>
          </div>
          
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="bg-white shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigateToArticle(article.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Article Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="flex-shrink-0 mr-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`p-1 ${article.isBookmarked ? 'text-yellow-500' : 'text-gray-400'}`}
                        >
                          {article.isBookmarked ? '🔖' : '🏷️'}
                        </Button>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900">{article.author.name}</p>
                        <p className="text-xs text-gray-500">{article.author.credentials}</p>
                      </div>
                    </div>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span>⏱️ {article.readTime} دقائق</span>
                        <span>👀 {article.viewCount.toLocaleString()}</span>
                        <span>📅 {formatDate(article.publishDate)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      {article.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مقالات</h3>
              <p className="text-gray-600">جرب تغيير المرشحات أو البحث بكلمات أخرى</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensoryArticlesScreen;
