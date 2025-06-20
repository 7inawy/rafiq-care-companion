
export interface SensoryArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'understanding' | 'home-strategies' | 'school-learning' | 'nutrition';
  author: {
    name: string;
    credentials: string;
    avatar?: string;
  };
  readTime: number;
  publishDate: Date;
  isBookmarked?: boolean;
  viewCount: number;
  tags: string[];
}

export interface SensoryVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  category: 'sensory-exercises' | 'skill-development' | 'parent-tips' | 'success-stories';
  ageGroup: '0-2' | '2-5' | '5+' | 'all';
  difficulty: 'easy' | 'medium' | 'hard';
  viewCount: number;
  url: string;
  instructor?: {
    name: string;
    credentials: string;
  };
}

export interface SensorySpecialist {
  id: string;
  name: string;
  specialty: 'occupational-therapy' | 'speech-therapy' | 'physical-therapy' | 'rehabilitation-center';
  credentials: string;
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  approach: string[];
  acceptsInsurance: boolean;
  consultationFee: number;
  avatar?: string;
  bio: string;
  availableSlots: string[];
}

export interface HomeActivity {
  id: string;
  title: string;
  description: string;
  category: 'calming' | 'stimulating' | 'focus' | 'movement';
  ageGroup: '0-2' | '2-5' | '5+' | 'all';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  materials: string[];
  steps: string[];
  benefits: string[];
  safetyTips: string[];
  illustration?: string;
  isCompleted?: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  category: 'tactile' | 'auditory' | 'visual' | 'movement' | 'emotional';
  options: {
    value: string;
    label: string;
    score: number;
  }[];
}

export interface AssessmentResult {
  overallScore: number;
  categoryScores: Record<string, number>;
  recommendations: string[];
  suggestedActivities: string[];
  specialistRecommendation?: boolean;
}
