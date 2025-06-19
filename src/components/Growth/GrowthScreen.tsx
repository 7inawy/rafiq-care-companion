
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Layout/Header';
import GrowthChart from './GrowthChart';
import AddMeasurementDialog from './AddMeasurementDialog';
import { GrowthRecord, GrowthChartType } from '@/types/growth';
import { getChartTitle } from '@/utils/growthUtils';

interface Child {
  id: string;
  name: string;
  birthDate: Date;
  gender: 'male' | 'female';
}

interface GrowthScreenProps {
  selectedChild: Child;
  onBack: () => void;
}

const GrowthScreen: React.FC<GrowthScreenProps> = ({ selectedChild, onBack }) => {
  const [activeTab, setActiveTab] = useState<GrowthChartType>('weight');
  
  // Mock data - in real app, this would come from state management
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([
    {
      id: '1',
      childId: selectedChild.id,
      date: new Date('2024-07-01'),
      weight: 4.2,
      height: 52.0,
      headCircumference: 36.0
    },
    {
      id: '2',
      childId: selectedChil.id,
      date: new Date('2024-09-01'),
      weight: 6.8,
      height: 62.5,
      headCircumference: 40.5
    },
    {
      id: '3',
      childId: selectedChild.id,
      date: new Date('2024-12-01'),
      weight: 8.1,
      height: 68.0,
      headCircumference: 43.2
    }
  ]);

  const handleAddMeasurement = (newRecord: Omit<GrowthRecord, 'id'>) => {
    const record: GrowthRecord = {
      ...newRecord,
      id: Date.now().toString()
    };
    setGrowthRecords(prev => [...prev, record].sort((a, b) => a.date.getTime() - b.date.getTime()));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="مخططات النمو" 
        showBack 
        onBack={onBack}
      />
      
      <div className="p-4 space-y-6">
        {/* Child Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">{selectedChild.name}</h2>
          <p className="text-gray-600 text-sm">
            تاريخ الميلاد: {selectedChild.birthDate.toLocaleDateString('ar-EG')}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">متابعة النمو</h3>
          <AddMeasurementDialog 
            childId={selectedChild.id}
            onAdd={handleAddMeasurement}
          />
        </div>

        {/* Growth Charts */}
        <div className="bg-white rounded-xl shadow-sm">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as GrowthChartType)}>
            <TabsList className="grid w-full grid-cols-3 p-1 m-4 mb-0">
              <TabsTrigger value="weight" className="text-sm">الوزن</TabsTrigger>
              <TabsTrigger value="height" className="text-sm">الطول</TabsTrigger>
              <TabsTrigger value="headCircumference" className="text-sm">محيط الرأس</TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              <h4 className="text-base font-semibold text-gray-900 mb-4">
                {getChartTitle(activeTab)}
              </h4>
              
              <TabsContent value="weight" className="mt-0">
                <GrowthChart
                  records={growthRecords}
                  chartType="weight"
                  childGender={selectedChild.gender}
                  childBirthDate={selectedChild.birthDate}
                />
              </TabsContent>
              
              <TabsContent value="height" className="mt-0">
                <GrowthChart
                  records={growthRecords}
                  chartType="height"
                  childGender={selectedChild.gender}
                  childBirthDate={selectedChild.birthDate}
                />
              </TabsContent>
              
              <TabsContent value="headCircumference" className="mt-0">
                <GrowthChart
                  records={growthRecords}
                  chartType="headCircumference"
                  childGender={selectedChild.gender}
                  childBirthDate={selectedChild.birthDate}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Recent Measurements */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">آخر القياسات</h4>
          <div className="space-y-3">
            {growthRecords.slice(-3).reverse().map((record) => (
              <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{record.date.toLocaleDateString('ar-EG')}</p>
                  <p className="text-xs text-gray-500">
                    الوزن: {record.weight} كجم، الطول: {record.height} سم، محيط الرأس: {record.headCircumference} سم
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthScreen;
