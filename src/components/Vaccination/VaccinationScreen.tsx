
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/Layout/Header';
import VaccineTimelineItem from './VaccineTimelineItem';
import VaccineDetailsModal from './VaccineDetailsModal';
import MarkVaccineDoneDialog from './MarkVaccineDoneDialog';
import { Button } from '@/components/ui/button';
import { GenericVaccine, ChildVaccineRecord, VaccinationSchedule } from '@/types/vaccination';
import { 
  generateVaccinationSchedule, 
  getVaccinesByStatus, 
  markVaccineAsDone,
  getVaccineById 
} from '@/utils/vaccinationLogic';

interface VaccinationScreenProps {
  onBack: () => void;
  selectedChild: {
    id: string;
    name: string;
    age: string;
    birthDate?: Date;
  };
}

const VaccinationScreen: React.FC<VaccinationScreenProps> = ({
  onBack,
  selectedChild
}) => {
  const [schedule, setSchedule] = useState<VaccinationSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVaccine, setSelectedVaccine] = useState<{
    vaccine: GenericVaccine;
    record: ChildVaccineRecord;
  } | null>(null);
  const [markingVaccine, setMarkingVaccine] = useState<{
    vaccineId: string;
    vaccineName: string;
  } | null>(null);

  useEffect(() => {
    loadVaccinationSchedule();
  }, [selectedChild.id]);

  const loadVaccinationSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use a mock birth date if not provided
      const birthDate = selectedChild.birthDate || new Date('2024-06-01');
      
      const generatedSchedule = generateVaccinationSchedule(selectedChild.id, birthDate);
      setSchedule(generatedSchedule);
    } catch (err) {
      setError('حدث خطأ في تحميل جدول التطعيمات');
      console.error('Error loading vaccination schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDone = (vaccineId: string) => {
    const vaccine = getVaccineById(vaccineId);
    if (vaccine) {
      setMarkingVaccine({
        vaccineId,
        vaccineName: vaccine.nameAr
      });
    }
  };

  const handleConfirmVaccination = (administeredDate: Date) => {
    if (!schedule || !markingVaccine) return;

    const updatedSchedule = markVaccineAsDone(
      schedule,
      markingVaccine.vaccineId,
      administeredDate
    );
    
    setSchedule(updatedSchedule);
    setMarkingVaccine(null);
  };

  const handleViewDetails = (vaccine: GenericVaccine, record: ChildVaccineRecord) => {
    setSelectedVaccine({ vaccine, record });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="متابعة التطعيمات" 
          showProfile={false} 
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">جاري تحميل جدول التطعيمات...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="متابعة التطعيمات" 
          showProfile={false} 
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">خطأ في التحميل</h3>
              <p className="text-gray-600 mt-1">{error}</p>
              <Button 
                onClick={loadVaccinationSchedule}
                className="mt-4"
              >
                إعادة المحاولة
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!schedule) return null;

  const vaccinesByStatus = getVaccinesByStatus(schedule);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="متابعة التطعيمات" 
        showProfile={false} 
      />
      
      <div className="p-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="h-4 w-4" />
          العودة للرئيسية
        </Button>

        {/* Child Info */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            جدول تطعيمات {selectedChild.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            العمر: {selectedChild.age}
          </p>
        </div>

        {/* Vaccination Timeline */}
        <div className="space-y-8">
          {/* Overdue Vaccines */}
          {vaccinesByStatus.overdue.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                متأخر ({vaccinesByStatus.overdue.length})
              </h3>
              <div className="space-y-4">
                {vaccinesByStatus.overdue.map(({ record, vaccine }, index) => (
                  <VaccineTimelineItem
                    key={record.id}
                    record={record}
                    vaccine={vaccine}
                    onMarkAsDone={handleMarkAsDone}
                    onViewDetails={handleViewDetails}
                    showConnector={index < vaccinesByStatus.overdue.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pending Vaccines */}
          {vaccinesByStatus.pending.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-yellow-700 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                قريباً ({vaccinesByStatus.pending.length})
              </h3>
              <div className="space-y-4">
                {vaccinesByStatus.pending.map(({ record, vaccine }, index) => (
                  <VaccineTimelineItem
                    key={record.id}
                    record={record}
                    vaccine={vaccine}
                    onMarkAsDone={handleMarkAsDone}
                    onViewDetails={handleViewDetails}
                    showConnector={index < vaccinesByStatus.pending.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Vaccines */}
          {vaccinesByStatus.upcoming.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                قادم ({vaccinesByStatus.upcoming.length})
              </h3>
              <div className="space-y-4">
                {vaccinesByStatus.upcoming.map(({ record, vaccine }, index) => (
                  <VaccineTimelineItem
                    key={record.id}
                    record={record}
                    vaccine={vaccine}
                    onMarkAsDone={handleMarkAsDone}
                    onViewDetails={handleViewDetails}
                    showConnector={index < vaccinesByStatus.upcoming.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Done Vaccines */}
          {vaccinesByStatus.done.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                مكتمل ({vaccinesByStatus.done.length})
              </h3>
              <div className="space-y-4">
                {vaccinesByStatus.done.map(({ record, vaccine }, index) => (
                  <VaccineTimelineItem
                    key={record.id}
                    record={record}
                    vaccine={vaccine}
                    onMarkAsDone={handleMarkAsDone}
                    onViewDetails={handleViewDetails}
                    showConnector={index < vaccinesByStatus.done.length - 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vaccine Details Modal */}
      <VaccineDetailsModal
        isOpen={!!selectedVaccine}
        onClose={() => setSelectedVaccine(null)}
        vaccine={selectedVaccine?.vaccine || null}
        record={selectedVaccine?.record || null}
      />

      {/* Mark Vaccine Done Dialog */}
      <MarkVaccineDoneDialog
        isOpen={!!markingVaccine}
        onClose={() => setMarkingVaccine(null)}
        onConfirm={handleConfirmVaccination}
        vaccineName={markingVaccine?.vaccineName || ''}
      />
    </div>
  );
};

export default VaccinationScreen;
