import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import ChildSelector from './ChildSelector';
import HealthSummaryCard from './HealthSummaryCard';
import VaccinationSummaryCard from './VaccinationSummaryCard';
import GrowthSummaryCard from './GrowthSummaryCard';
import QuickActions from './QuickActions';
import TodaysDosesCard from '@/components/Medication/TodaysDosesCard';
import { generateVaccinationSchedule, getNextUpcomingVaccine, getVaccinesByStatus } from '@/utils/vaccinationLogic';
import { getTodaysDoses } from '@/utils/medicationUtils';
import { TodaysDose, Medication, DoseLog } from '@/types/medication';

interface Child {
  id: string;
  name: string;
  age: string;
  birthDate?: Date;
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
    birthDate: new Date('2024-06-01'),
    avatar: '/api/placeholder/40/40'
  });

  const [vaccinationData, setVaccinationData] = useState<{
    nextVaccine?: any;
    completedCount: number;
    totalCount: number;
  }>({
    completedCount: 0,
    totalCount: 0
  });

  const children: Child[] = [
    { id: '1', name: 'سارة', age: '6 أشهر', birthDate: new Date('2024-06-01') },
    { id: '2', name: 'أحمد', age: '3 سنوات', birthDate: new Date('2021-01-15') }
  ];

  const navigationItems = [
    { id: 'home', label: 'الرئيسية', icon: '🏠', isActive: true },
    { id: 'health', label: 'الصحة', icon: '📊' },
    { id: 'doctors', label: 'الأطباء', icon: '👩‍⚕️' },
    { id: 'pharmacy', label: 'الصيدلية', icon: '💊' },
    { id: 'more', label: 'المزيد', icon: '⚙️' }
  ];

  useEffect(() => {
    loadVaccinationData();
  }, [selectedChild.id]);

  const loadVaccinationData = () => {
    if (!selectedChild.birthDate) return;

    const schedule = generateVaccinationSchedule(selectedChild.id, selectedChild.birthDate);
    const vaccinesByStatus = getVaccinesByStatus(schedule);
    const nextUpcoming = getNextUpcomingVaccine(schedule);

    setVaccinationData({
      nextVaccine: nextUpcoming ? {
        name: nextUpcoming.vaccine.nameAr,
        dueDate: nextUpcoming.record.dueDate,
        status: nextUpcoming.record.status
      } : undefined,
      completedCount: vaccinesByStatus.done.length,
      totalCount: schedule.records.length
    });
  };

  // Mock medication data
  const [medications] = useState<Medication[]>([]);
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([]);
  const [todaysDoses, setTodaysDoses] = useState<TodaysDose[]>([]);

  useEffect(() => {
    // Load today's doses
    const doses = getTodaysDoses(medications, doseLogs, children);
    setTodaysDoses(doses);
  }, [medications, doseLogs]);

  const handleMarkDoseAsGiven = (doseLogId: string) => {
    setDoseLogs(prev => 
      prev.map(log => 
        log.id === doseLogId 
          ? { ...log, status: 'given' as const, actualDateTime: new Date() }
          : log
      )
    );
  };

  const handleQuickAction = (actionId: string) => {
    onNavigate(actionId);
  };

  const handleNavigateToVaccinations = () => {
    onNavigate('vaccinations');
  };

  const handleNavigateToGrowthCharts = () => {
    onNavigate('growth-charts');
  };

  const handleNavigateToMedications = () => {
    onNavigate('medications');
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
            onChildSelect={(child) => {
              setSelectedChild(child);
              loadVaccinationData();
            }}
            onAddChild={() => onNavigate('add-child')}
          />
        </div>

        {/* Health Summary */}
        <HealthSummaryCard childName={selectedChild.name} />

        {/* Today's Medication Doses */}
        <TodaysDosesCard
          doses={todaysDoses}
          onMarkAsGiven={handleMarkDoseAsGiven}
          onViewAll={handleNavigateToMedications}
        />

        {/* Vaccination Summary */}
        <VaccinationSummaryCard
          childName={selectedChild.name}
          nextVaccine={vaccinationData.nextVaccine}
          completedCount={vaccinationData.completedCount}
          totalCount={vaccinationData.totalCount}
          onViewAll={handleNavigateToVaccinations}
        />

        {/* Growth Summary */}
        <GrowthSummaryCard
          childName={selectedChild.name}
          lastMeasurement={{
            date: new Date('2024-12-01'),
            weight: 8.1,
            height: 68.0
          }}
          onViewCharts={handleNavigateToGrowthCharts}
        />

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
