
import { GenericVaccine, ChildVaccineRecord, VaccinationStatus, VaccinationSchedule } from '@/types/vaccination';
import { EGYPTIAN_VACCINE_SCHEDULE } from '@/data/egyptianVaccineSchedule';

export const generateVaccinationSchedule = (childId: string, birthDate: Date): VaccinationSchedule => {
  const records: ChildVaccineRecord[] = EGYPTIAN_VACCINE_SCHEDULE.map(vaccine => {
    const dueDate = new Date(birthDate);
    dueDate.setMonth(dueDate.getMonth() + vaccine.recommendedAgeMonths);
    
    return {
      id: `${childId}-${vaccine.id}`,
      childId,
      vaccineId: vaccine.id,
      dueDate,
      status: calculateVaccineStatus(dueDate)
    };
  });

  return {
    childId,
    records,
    lastUpdated: new Date()
  };
};

export const calculateVaccineStatus = (dueDate: Date, administeredDate?: Date): VaccinationStatus => {
  if (administeredDate) {
    return 'done';
  }

  const now = new Date();
  const diffInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays > 7) {
    return 'upcoming';
  } else if (diffInDays >= -7) {
    return 'pending';
  } else {
    return 'overdue';
  }
};

export const getVaccineById = (vaccineId: string): GenericVaccine | undefined => {
  return EGYPTIAN_VACCINE_SCHEDULE.find(vaccine => vaccine.id === vaccineId);
};

export const markVaccineAsDone = (
  schedule: VaccinationSchedule, 
  vaccineId: string, 
  administeredDate: Date
): VaccinationSchedule => {
  const updatedRecords = schedule.records.map(record => {
    if (record.vaccineId === vaccineId) {
      return {
        ...record,
        administeredDate,
        status: 'done' as VaccinationStatus
      };
    }
    return record;
  });

  return {
    ...schedule,
    records: updatedRecords,
    lastUpdated: new Date()
  };
};

export const getNextUpcomingVaccine = (schedule: VaccinationSchedule): { record: ChildVaccineRecord; vaccine: GenericVaccine } | null => {
  const upcomingRecords = schedule.records
    .filter(record => record.status === 'upcoming' || record.status === 'pending')
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  if (upcomingRecords.length === 0) return null;

  const nextRecord = upcomingRecords[0];
  const vaccine = getVaccineById(nextRecord.vaccineId);
  
  if (!vaccine) return null;

  return { record: nextRecord, vaccine };
};

export const getVaccinesByStatus = (schedule: VaccinationSchedule) => {
  const grouped = {
    overdue: [] as Array<{ record: ChildVaccineRecord; vaccine: GenericVaccine }>,
    pending: [] as Array<{ record: ChildVaccineRecord; vaccine: GenericVaccine }>,
    upcoming: [] as Array<{ record: ChildVaccineRecord; vaccine: GenericVaccine }>,
    done: [] as Array<{ record: ChildVaccineRecord; vaccine: GenericVaccine }>
  };

  schedule.records.forEach(record => {
    const vaccine = getVaccineById(record.vaccineId);
    if (vaccine) {
      grouped[record.status].push({ record, vaccine });
    }
  });

  // Sort each group by due date
  Object.keys(grouped).forEach(status => {
    grouped[status as keyof typeof grouped].sort((a, b) => 
      a.record.dueDate.getTime() - b.record.dueDate.getTime()
    );
  });

  return grouped;
};
