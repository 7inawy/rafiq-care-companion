
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { GrowthRecord, GrowthChartType } from '@/types/growth';
import { calculateAgeInMonths, getWHOPercentiles, getValueFromRecord, getUnitLabel } from '@/utils/growthUtils';

interface GrowthChartProps {
  records: GrowthRecord[];
  chartType: GrowthChartType;
  childGender: 'male' | 'female';
  childBirthDate: Date;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ 
  records, 
  chartType, 
  childGender, 
  childBirthDate 
}) => {
  const whoPercentiles = getWHOPercentiles(chartType, childGender);
  const unitLabel = getUnitLabel(chartType);

  // Prepare chart data
  const chartData = whoPercentiles.map(percentile => {
    const childRecord = records.find(record => {
      const recordAge = calculateAgeInMonths(childBirthDate, record.date);
      return Math.abs(recordAge - percentile.age) <= 1; // Match within 1 month
    });

    return {
      age: percentile.age,
      p3: percentile.p3,
      p15: percentile.p15,
      p50: percentile.p50,
      p85: percentile.p85,
      p97: percentile.p97,
      child: childRecord ? getValueFromRecord(childRecord, chartType) : null
    };
  });

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="age" 
            label={{ value: 'العمر (شهر)', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ value: unitLabel, angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Legend />
          
          {/* WHO Percentile Lines */}
          <Line 
            type="monotone" 
            dataKey="p3" 
            stroke="#ff6b6b" 
            strokeWidth={1} 
            strokeDasharray="5 5"
            dot={false}
            name="3%"
          />
          <Line 
            type="monotone" 
            dataKey="p15" 
            stroke="#ffa726" 
            strokeWidth={1} 
            strokeDasharray="3 3"
            dot={false}
            name="15%"
          />
          <Line 
            type="monotone" 
            dataKey="p50" 
            stroke="#66bb6a" 
            strokeWidth={2}
            dot={false}
            name="50%"
          />
          <Line 
            type="monotone" 
            dataKey="p85" 
            stroke="#ffa726" 
            strokeWidth={1} 
            strokeDasharray="3 3"
            dot={false}
            name="85%"
          />
          <Line 
            type="monotone" 
            dataKey="p97" 
            stroke="#ff6b6b" 
            strokeWidth={1} 
            strokeDasharray="5 5"
            dot={false}
            name="97%"
          />
          
          {/* Child's Growth Line */}
          <Line 
            type="monotone" 
            dataKey="child" 
            stroke="#4A90E2" 
            strokeWidth={3}
            dot={{ fill: '#4A90E2', strokeWidth: 2, r: 6 }}
            connectNulls={false}
            name="طفلك"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
