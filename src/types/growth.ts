
export interface GrowthRecord {
  id: string;
  childId: string;
  date: Date;
  weight: number; // kg
  height: number; // cm
  headCircumference: number; // cm
}

export interface WHOPercentile {
  age: number; // in months
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}

export interface WHOStandards {
  weightForAge: {
    boys: WHOPercentile[];
    girls: WHOPercentile[];
  };
  heightForAge: {
    boys: WHOPercentile[];
    girls: WHOPercentile[];
  };
  headCircumferenceForAge: {
    boys: WHOPercentile[];
    girls: WHOPercentile[];
  };
}

export type GrowthChartType = 'weight' | 'height' | 'headCircumference';
