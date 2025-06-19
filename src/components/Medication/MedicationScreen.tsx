
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Layout/Header';
import AddMedicationDialog from './AddMedicationDialog';
import { Medication, DoseLog } from '@/types/medication';
import { formatDosageDisplay, getFrequencyDescription, generateDoseSchedule } from '@/utils/medicationUtils';
import { format } from 'date-fns';

interface Child {
  id: string;
  name: string;
}

interface MedicationScreenProps {
  selectedChild: Child;
  onBack: () => void;
}

const MedicationScreen: React.FC<MedicationScreenProps> = ({ selectedChild, onBack }) => {
  // Mock data - in real app, this would come from state management
  const [medications, setMedications] = useState<Medication[]>([]);
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([]);

  const activeMedications = medications.filter(med => med.isActive && med.childId === selectedChild.id);
  const pastMedications = medications.filter(med => !med.isActive && med.childId === selectedChild.id);

  const handleAddMedication = (newMedication: Omit<Medication, 'id'>) => {
    const medication: Medication = {
      ...newMedication,
      id: Date.now().toString()
    };
    
    // Generate dose schedule
    const schedule = generateDoseSchedule(medication);
    
    setMedications(prev => [...prev, medication]);
    setDoseLogs(prev => [...prev, ...schedule]);
    
    // In real app, this would also schedule notifications
    console.log('Medication added with schedule:', { medication, schedule });
  };

  const handleStopMedication = (medicationId: string) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === medicationId ? { ...med, isActive: false } : med
      )
    );
  };

  const MedicationCard: React.FC<{ medication: Medication }> = ({ medication }) => {
    const medicationDoses = doseLogs.filter(log => log.medicationId === medication.id);
    const completedDoses = medicationDoses.filter(log => log.status === 'given').length;
    const totalDoses = medicationDoses.length;

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{medication.name}</h3>
            <p className="text-sm text-gray-600">
              {formatDosageDisplay(medication.dosage, medication.dosageUnit)}
            </p>
          </div>
          <Badge variant={medication.isActive ? "default" : "secondary"}>
            {medication.isActive ? "نشط" : "انتهى"}
          </Badge>
        </div>

        {medication.reason && (
          <p className="text-sm text-gray-600 mb-2">السبب: {medication.reason}</p>
        )}

        <div className="text-sm text-gray-600 mb-3">
          <p>المدة: {medication.duration} أيام</p>
          <p>التكرار: {getFrequencyDescription(medication)}</p>
          <p>بدء من: {format(medication.startDate, 'dd/MM/yyyy')}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            تم إعطاء {completedDoses} من {totalDoses} جرعة
          </div>
          {medication.isActive && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStopMedication(medication.id)}
            >
              إيقاف الدواء
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="الأدوية والتذكيرات" 
        showBack 
        onBack={onBack}
      />
      
      <div className="p-4 space-y-6">
        {/* Child Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{selectedChild.name}</h2>
              <p className="text-gray-600 text-sm">إدارة الأدوية والجرعات</p>
            </div>
            <AddMedicationDialog 
              childId={selectedChild.id}
              onAdd={handleAddMedication}
            />
          </div>
        </div>

        {/* Medications List */}
        <div className="bg-white rounded-xl shadow-sm">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 m-4 mb-0">
              <TabsTrigger value="current">الأدوية الحالية</TabsTrigger>
              <TabsTrigger value="past">الأدوية السابقة</TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              <TabsContent value="current" className="mt-0">
                <div className="space-y-4">
                  {activeMedications.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💊</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد أدوية حالية</h3>
                      <p className="text-gray-600 mb-4">قم بإضافة دواء جديد لبدء المتابعة</p>
                      <AddMedicationDialog 
                        childId={selectedChild.id}
                        onAdd={handleAddMedication}
                      />
                    </div>
                  ) : (
                    activeMedications.map((medication) => (
                      <MedicationCard key={medication.id} medication={medication} />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                <div className="space-y-4">
                  {pastMedications.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">لا توجد أدوية سابقة</p>
                    </div>
                  ) : (
                    pastMedications.map((medication) => (
                      <MedicationCard key={medication.id} medication={medication} />
                    ))
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MedicationScreen;
