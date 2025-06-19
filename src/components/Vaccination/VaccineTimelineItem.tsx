
import React from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GenericVaccine, ChildVaccineRecord } from '@/types/vaccination';

interface VaccineTimelineItemProps {
  record: ChildVaccineRecord;
  vaccine: GenericVaccine;
  onMarkAsDone: (vaccineId: string) => void;
  onViewDetails: (vaccine: GenericVaccine, record: ChildVaccineRecord) => void;
  showConnector?: boolean;
}

const VaccineTimelineItem: React.FC<VaccineTimelineItemProps> = ({
  record,
  vaccine,
  onMarkAsDone,
  onViewDetails,
  showConnector = true
}) => {
  const getStatusIcon = () => {
    switch (record.status) {
      case 'done':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'overdue':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'upcoming':
        return <Calendar className="h-6 w-6 text-blue-600" />;
      default:
        return <Calendar className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (record.status) {
      case 'done':
        return 'border-green-200 bg-green-50';
      case 'overdue':
        return 'border-red-200 bg-red-50';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
      case 'upcoming':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: ar });
  };

  return (
    <div className="flex items-start gap-4 relative">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white shadow-md bg-white flex items-center justify-center">
          {getStatusIcon()}
        </div>
        {showConnector && (
          <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
        )}
      </div>

      {/* Vaccine Card */}
      <Card 
        className={`flex-1 cursor-pointer transition-all hover:shadow-md ${getStatusColor()}`}
        onClick={() => onViewDetails(vaccine, record)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                {vaccine.nameAr}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {vaccine.description}
              </p>
              
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    تاريخ الاستحقاق: {formatDate(record.dueDate)}
                  </span>
                </div>
                
                {record.administeredDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium">
                      تم إعطاؤه في: {formatDate(record.administeredDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              {record.status !== 'done' ? (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsDone(vaccine.id);
                  }}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  تم الإعطاء
                </Button>
              ) : (
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  مكتمل
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccineTimelineItem;
