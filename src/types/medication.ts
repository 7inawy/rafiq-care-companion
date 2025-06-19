
export interface Medication {
  id: string;
  childId: string;
  name: string;
  dosage: string;
  dosageUnit: 'ml' | 'tablet' | 'drops' | 'capsule' | 'mg';
  reason?: string;
  startDate: Date;
  duration: number; // days
  frequencyType: 'specific' | 'interval';
  specificTimes?: string[]; // ['08:00', '16:00', '24:00']
  intervalHours?: number; // for interval-based (e.g., 6 for every 6 hours)
  isActive: boolean;
}

export interface DoseLog {
  id: string;
  medicationId: string;
  scheduledDateTime: Date;
  status: 'pending' | 'given' | 'skipped';
  actualDateTime?: Date;
}

export interface TodaysDose {
  id: string;
  childName: string;
  medicationName: string;
  scheduledTime: string;
  status: 'pending' | 'given' | 'skipped';
  medicationId: string;
  doseLogId: string;
}
