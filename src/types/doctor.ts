
export interface Doctor {
  id: string;
  fullName: string;
  profilePhoto: string;
  primarySpecialty: string;
  subSpecialties: string[];
  qualifications: string[];
  yearsOfExperience: number;
  biography: string;
  languagesSpoken: string[];
  overallRating: number;
  totalReviews: number;
  consultationFeeStart: number;
  availableServices: AppointmentType[];
  acceptedInsurance?: string[];
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  photos: string[];
  doctorId: string;
}

export type AppointmentType = 'clinic' | 'home' | 'video';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled-user' | 'cancelled-doctor';

export interface Appointment {
  id: string;
  doctorId: string;
  childId: string;
  parentId: string;
  type: AppointmentType;
  scheduledDate: Date;
  scheduledTime: string;
  clinicId?: string;
  consultationFee: number;
  status: AppointmentStatus;
  notes?: string;
  bookingDate: Date;
}

export interface Review {
  id: string;
  appointmentId: string;
  doctorId: string;
  parentId: string;
  rating: number;
  comment?: string;
  reviewDate: Date;
  parentName: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DoctorFilters {
  specialty?: string;
  subSpecialty?: string;
  city?: string;
  insurance?: string;
  appointmentType?: AppointmentType;
  sortBy?: 'distance' | 'rating' | 'price';
}
