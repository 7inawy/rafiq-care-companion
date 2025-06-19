
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { TodaysDose } from '@/types/medication';

interface TodaysDosesCardProps {
  doses: TodaysDose[];
  onMarkAsGiven: (doseLogId: string) => void;
  onViewAll: () => void;
}

const TodaysDosesCard: React.FC<TodaysDosesCardProps> = ({ 
  doses, 
  onMarkAsGiven, 
  onViewAll 
}) => {
  const pendingDoses = doses.filter(dose => dose.status === 'pending');
  const completedDoses = doses.filter(dose => dose.status === 'given');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'given':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'skipped':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'given':
        return 'تم';
      case 'pending':
        return 'معلق';
      case 'skipped':
        return 'متخطى';
      default:
        return status;
    }
  };

  if (doses.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">جرعات اليوم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-gray-600">لا توجد أدوية مجدولة اليوم</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">جرعات اليوم</CardTitle>
        <div className="flex gap-2">
          <Badge variant="secondary">{completedDoses.length} تم</Badge>
          <Badge variant="outline">{pendingDoses.length} معلق</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {doses.slice(0, 3).map((dose) => (
          <div 
            key={dose.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(dose.status)}
              <div>
                <p className="font-medium text-sm">
                  {dose.childName} - {dose.medicationName}
                </p>
                <p className="text-xs text-gray-500">{dose.scheduledTime}</p>
              </div>
            </div>
            
            {dose.status === 'pending' && (
              <Button 
                size="sm" 
                onClick={() => onMarkAsGiven(dose.doseLogId)}
                className="text-xs"
              >
                تم الإعطاء
              </Button>
            )}
            
            {dose.status !== 'pending' && (
              <Badge variant={dose.status === 'given' ? 'default' : 'destructive'}>
                {getStatusLabel(dose.status)}
              </Badge>
            )}
          </div>
        ))}
        
        {doses.length > 3 && (
          <Button variant="outline" onClick={onViewAll} className="w-full">
            عرض جميع الجرعات ({doses.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysDosesCard;
