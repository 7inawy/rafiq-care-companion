
export interface GenericVaccine {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  protectsAgainst: string[];
  recommendedAgeMonths: number;
  sideEffects: string[];
  careTips: string[];
  category: 'birth' | 'infant' | 'toddler';
}

export type VaccinationStatus = 'upcoming' | 'pending' | 'overdue' | 'done';

export interface ChildVaccineRecord {
  id: string;
  childId: string;
  vaccineId: string;
  dueDate: Date;
  administeredDate?: Date;
  status: VaccinationStatus;
  notes?: string;
}

export interface VaccinationSchedule {
  childId: string;
  records: ChildVaccineRecord[];
  lastUpdated: Date;
}
