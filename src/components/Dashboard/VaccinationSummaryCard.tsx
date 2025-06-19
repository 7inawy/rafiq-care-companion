
import React from 'react';
import { Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface VaccinationSummaryCardProps {
  childName: string;
  nextVaccine?: {
    name: string;
    dueDate: Date;
    status: 'upcoming' | 'pending' | 'overdue';
  };
  completedCount: number;
  totalCount: number;
  onViewAll: () => void;
}

const VaccinationSummaryCard: React.FC<VaccinationSummaryCardProps> = ({
  childName,
  nextVaccine,
  completedCount,
  totalCount,
  onViewAll
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'upcoming':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'pending':
      case 'upcoming':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM', { locale: ar });
  };

  return (
    <Card className="bg-gradient-to-l from-primary/5 to-secondary/5 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          جدول تطعيمات {childName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Summary */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div>
            <p className="font-medium text-gray-900">التقدم العام</p>
            <p className="text-sm text-gray-500">
              {completedCount} من {totalCount} تطعيمات مكتملة
            </p>
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-primary">
              {Math.round((completedCount / totalCount) * 100)}%
            </div>
            <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Next Vaccine */}
        {nextVaccine && (
          <div className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(nextVaccine.status)}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(nextVaccine.status)}`}>
                {getStatusIcon(nextVaccine.status)}
              </div>
              <div>
                <p className="font-medium text-gray-900">أقرب تطعيم</p>
                <p className="text-sm text-gray-600">{nextVaccine.name}</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">
                {formatDate(nextVaccine.dueDate)}
              </p>
              <p className="text-xs text-gray-500">
                {nextVaccine.status === 'overdue' ? 'متأخر' : 
                 nextVaccine.status === 'pending' ? 'قريباً' : 'قادم'}
              </p>
            </div>
          </div>
        )}

        {/* View All Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onViewAll}
        >
          عرض جدول التطعيمات الكامل
        </Button>
      </CardContent>
    </Card>
  );
};

export default VaccinationSummaryCard;
