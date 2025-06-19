
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar } from 'lucide-react';

interface GrowthSummaryCardProps {
  childName: string;
  lastMeasurement?: {
    date: Date;
    weight: number;
    height: number;
  };
  onViewCharts: () => void;
}

const GrowthSummaryCard: React.FC<GrowthSummaryCardProps> = ({ 
  childName, 
  lastMeasurement, 
  onViewCharts 
}) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          مخططات النمو
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lastMeasurement ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              آخر قياس: {lastMeasurement.date.toLocaleDateString('ar-EG')}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{lastMeasurement.weight}</p>
                <p className="text-xs text-gray-600">كجم</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{lastMeasurement.height}</p>
                <p className="text-xs text-gray-600">سم</p>
              </div>
            </div>
            <Button onClick={onViewCharts} variant="outline" className="w-full">
              عرض المخططات التفصيلية
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <p className="text-gray-600 mb-3">لم يتم تسجيل أي قياسات بعد</p>
            <Button onClick={onViewCharts} className="w-full">
              بدء متابعة النمو
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GrowthSummaryCard;
