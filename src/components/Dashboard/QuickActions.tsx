
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions: QuickAction[] = [
    {
      id: 'nicu-finder',
      title: 'مراكز الحضانات',
      icon: '🏥',
      description: 'العثور على أقرب مراكز الرعاية المركزة',
      color: 'bg-red-50 border-red-100 hover:bg-red-100'
    },
    {
      id: 'symptom-checker',
      title: 'محلل الأعراض',
      icon: '🔍',
      description: 'تحليل ذكي لأعراض طفلك والحصول على نصائح',
      color: 'bg-teal-50 border-teal-100 hover:bg-teal-100'
    },
    {
      id: 'sensory-hub',
      title: 'دعم الاضطرابات الحسية',
      icon: '🤗',
      description: 'موارد ومختصين للاضطرابات الحسية',
      color: 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100'
    },
    {
      id: 'vaccinations',
      title: 'متابعة التطعيمات',
      icon: '💉',
      description: 'جدول التطعيمات والمواعيد القادمة',
      color: 'bg-green-50 border-green-100 hover:bg-green-100'
    },
    {
      id: 'book-doctor',
      title: 'حجز طبيب',
      icon: '👩‍⚕️',
      description: 'البحث وحجز موعد مع طبيب أطفال',
      color: 'bg-purple-50 border-purple-100 hover:bg-purple-100'
    },
    {
      id: 'growth-charts',
      title: 'مخططات النمو',
      icon: '📈',
      description: 'متابعة نمو الطفل والمقارنة مع المعايير',
      color: 'bg-orange-50 border-orange-100 hover:bg-orange-100'
    },
    {
      id: 'medications',
      title: 'إدارة الأدوية',
      icon: '💊',
      description: 'متابعة الأدوية وتذكير الجرعات',
      color: 'bg-pink-50 border-pink-100 hover:bg-pink-100'
    },
    {
      id: 'add-record',
      title: 'إضافة سجل',
      icon: '📝',
      description: 'تسجيل معلومات صحية جديدة',
      color: 'bg-blue-50 border-blue-100 hover:bg-blue-100'
    },
    {
      id: 'marketplace',
      title: 'المتجر',
      icon: '🛍️',
      description: 'منتجات مخصصة لصحة الطفل',
      color: 'bg-purple-50 border-purple-100 hover:bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          className={`${action.color} h-auto p-4 flex flex-col items-center gap-2 text-center border transition-colors`}
          onClick={() => onActionClick(action.id)}
        >
          <span className="text-2xl">{action.icon}</span>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{action.title}</p>
            <p className="text-xs text-gray-600 mt-1">{action.description}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
