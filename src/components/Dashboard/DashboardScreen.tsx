
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import ChildSelector from './ChildSelector';
import HealthSummaryCard from './HealthSummaryCard';
import QuickActions from './QuickActions';

interface Child {
  id: string;
  name: string;
  age: string;
  avatar?: string;
}

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const [selectedChild, setSelectedChild] = useState<Child>({
    id: '1',
    name: 'سارة',
    age: '6 أشهر',
    avatar: '/api/placeholder/40/40'
  });

  const children: Child[] = [
    { id: '1', name: 'سارة', age: '6 أشهر' },
    { id: '2', name: 'أحمد', age: '3 سنوات' }
  ];

  const navigationItems = [
    { id: 'home', label: 'الرئيسية', icon: '🏠', isActive: true },
    { id: 'health', label: 'الصحة', icon: '📊' },
    { id: 'doctors', label: 'الأطباء', icon: '👩‍⚕️' },
    { id: 'pharmacy', label: 'الصيدلية', icon: '💊' },
    { id: 'more', label: 'المزيد', icon: '⚙️' }
  ];

  const handleQuickAction = (actionId: string) => {
    onNavigate(actionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="رفيق الصغار" />
      
      <div className="p-4 space-y-6">
        {/* Child Selector */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <ChildSelector
            selectedChild={selectedChild}
            children={children}
            onChildSelect={setSelectedChild}
            onAddChild={() => onNavigate('add-child')}
          />
        </div>

        {/* Health Summary */}
        <HealthSummaryCard childName={selectedChild.name} />

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">الإجراءات السريعة</h2>
          <QuickActions onActionClick={handleQuickAction} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">النشاط الأخير</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">تم إعطاء التطعيم الخماسي</p>
                <p className="text-xs text-gray-500">أمس، 2:30 م</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📊</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">تم تسجيل الوزن: 7.2 كج</p>
                <p className="text-xs text-gray-500">منذ 3 أيام</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation 
        items={navigationItems}
        onItemClick={(id) => onNavigate(id)}
      />
    </div>
  );
};

export default DashboardScreen;
