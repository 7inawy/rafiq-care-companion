
import { Medication, DoseLog, TodaysDose } from '@/types/medication';
import { format, addDays, addHours, startOfDay, isSameDay } from 'date-fns';

export const generateDoseSchedule = (medication: Medication): DoseLog[] => {
  const doses: DoseLog[] = [];
  const startDate = new Date(medication.startDate);
  
  for (let day = 0; day < medication.duration; day++) {
    const currentDay = addDays(startDate, day);
    
    if (medication.frequencyType === 'specific' && medication.specificTimes) {
      medication.specificTimes.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const scheduledDateTime = new Date(currentDay);
        scheduledDateTime.setHours(hours, minutes, 0, 0);
        
        doses.push({
          id: `${medication.id}-${day}-${time}`,
          medicationId: medication.id,
          scheduledDateTime,
          status: 'pending'
        });
      });
    } else if (medication.frequencyType === 'interval' && medication.intervalHours) {
      const dosesPerDay = 24 / medication.intervalHours;
      const startTime = new Date(startDate);
      startTime.setHours(8, 0, 0, 0); // Default start at 8 AM
      
      for (let dose = 0; dose < dosesPerDay; dose++) {
        const scheduledDateTime = addHours(
          new Date(currentDay.setHours(startTime.getHours(), 0, 0, 0)), 
          dose * medication.intervalHours
        );
        
        doses.push({
          id: `${medication.id}-${day}-${dose}`,
          medicationId: medication.id,
          scheduledDateTime,
          status: 'pending'
        });
      }
    }
  }
  
  return doses;
};

export const getTodaysDoses = (
  medications: Medication[], 
  doseLogs: DoseLog[], 
  children: any[]
): TodaysDose[] => {
  const today = new Date();
  const todaysDoses: TodaysDose[] = [];
  
  doseLogs.forEach(doseLog => {
    if (isSameDay(doseLog.scheduledDateTime, today)) {
      const medication = medications.find(med => med.id === doseLog.medicationId);
      const child = children.find(child => child.id === medication?.childId);
      
      if (medication && child) {
        todaysDoses.push({
          id: `${doseLog.id}-today`,
          childName: child.name,
          medicationName: medication.name,
          scheduledTime: format(doseLog.scheduledDateTime, 'HH:mm'),
          status: doseLog.status,
          medicationId: medication.id,
          doseLogId: doseLog.id
        });
      }
    }
  });
  
  return todaysDoses.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
};

export const formatDosageDisplay = (dosage: string, unit: string): string => {
  return `${dosage} ${getDosageUnitLabel(unit)}`;
};

export const getDosageUnitLabel = (unit: string): string => {
  switch (unit) {
    case 'ml':
      return 'مل';
    case 'tablet':
      return 'قرص';
    case 'drops':
      return 'نقطة';
    case 'capsule':
      return 'كبسولة';
    case 'mg':
      return 'مجم';
    default:
      return unit;
  }
};

export const getFrequencyDescription = (medication: Medication): string => {
  if (medication.frequencyType === 'specific' && medication.specificTimes) {
    return `${medication.specificTimes.length} مرات يومياً`;
  } else if (medication.frequencyType === 'interval' && medication.intervalHours) {
    return `كل ${medication.intervalHours} ساعات`;
  }
  return '';
};
