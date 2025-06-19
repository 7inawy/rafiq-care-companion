
import { GrowthRecord, WHOPercentile, GrowthChartType } from '@/types/growth';
import { whoStandards } from '@/data/whoStandards';

export const calculateAgeInMonths = (birthDate: Date, measurementDate: Date): number => {
  const diffTime = measurementDate.getTime() - birthDate.getTime();
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44); // average month length
  return Math.floor(diffMonths);
};

export const getWHOPercentiles = (
  chartType: GrowthChartType, 
  gender: 'male' | 'female'
): WHOPercentile[] => {
  const genderKey = gender === 'male' ? 'boys' : 'girls';
  
  switch (chartType) {
    case 'weight':
      return whoStandards.weightForAge[genderKey];
    case 'height':
      return whoStandards.heightForAge[genderKey];
    case 'headCircumference':
      return whoStandards.headCircumferenceForAge[genderKey];
    default:
      return [];
  }
};

export const findPercentileForValue = (
  value: number, 
  ageInMonths: number, 
  percentiles: WHOPercentile[]
): string => {
  const closestAge = percentiles.reduce((prev, curr) => 
    Math.abs(curr.age - ageInMonths) < Math.abs(prev.age - ageInMonths) ? curr : prev
  );

  if (value <= closestAge.p3) return 'أقل من 3%';
  if (value <= closestAge.p15) return '3% - 15%';
  if (value <= closestAge.p50) return '15% - 50%';
  if (value <= closestAge.p85) return '50% - 85%';
  if (value <= closestAge.p97) return '85% - 97%';
  return 'أكثر من 97%';
};

export const getChartTitle = (chartType: GrowthChartType): string => {
  switch (chartType) {
    case 'weight':
      return 'الوزن حسب العمر';
    case 'height':
      return 'الطول حسب العمر';
    case 'headCircumference':
      return 'محيط الرأس حسب العمر';
    default:
      return '';
  }
};

export const getValueFromRecord = (record: GrowthRecord, chartType: GrowthChartType): number => {
  switch (chartType) {
    case 'weight':
      return record.weight;
    case 'height':
      return record.height;
    case 'headCircumference':
      return record.headCircumference;
    default:
      return 0;
  }
};

export const getUnitLabel = (chartType: GrowthChartType): string => {
  switch (chartType) {
    case 'weight':
      return 'كجم';
    case 'height':
      return 'سم';
    case 'headCircumference':
      return 'سم';
    default:
      return '';
  }
};
