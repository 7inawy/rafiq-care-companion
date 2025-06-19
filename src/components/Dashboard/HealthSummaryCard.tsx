
import React from 'react';
import { Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HealthSummaryCardProps {
  childName: string;
}

const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({ childName }) => {
  return (
    <Card className="bg-gradient-to-l from-primary/5 to-secondary/5 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          ملخص صحة {childName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Next Vaccination */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">التطعيم القادم</p>
              <p className="text-sm text-gray-500">تطعيم الشهر السادس</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-primary">25 ديسمبر</p>
            <p className="text-xs text-gray-500">بعد 5 أيام</p>
          </div>
        </div>

        {/* Growth Alert */}
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">تنبيه النمو</p>
              <p className="text-sm text-gray-600">حان وقت قياس الوزن والطول</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="text-xs">
            تسجيل
          </Button>
        </div>

        {/* Medication Reminder */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">💊</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">دواء اليوم</p>
              <p className="text-sm text-gray-600">فيتامين د - مساءً</p>
            </div>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
            تم
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSummaryCard;
