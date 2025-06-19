
import React from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { X, Shield, AlertCircle, Heart } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { GenericVaccine, ChildVaccineRecord } from '@/types/vaccination';

interface VaccineDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaccine: GenericVaccine | null;
  record: ChildVaccineRecord | null;
}

const VaccineDetailsModal: React.FC<VaccineDetailsModalProps> = ({
  isOpen,
  onClose,
  vaccine,
  record
}) => {
  if (!vaccine || !record) return null;

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', { locale: ar });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-right border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold text-gray-900">
              {vaccine.nameAr}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <p className="text-sm text-gray-600 mt-1 text-right">
            {vaccine.nameEn}
          </p>
        </DrawerHeader>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Status and Date Info */}
          <div className="bg-gradient-to-l from-primary/5 to-secondary/5 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">معلومات التطعيم</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الاستحقاق:</span>
                <span className="font-medium">{formatDate(record.dueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">العمر المناسب:</span>
                <span className="font-medium">
                  {vaccine.recommendedAgeMonths === 0 
                    ? 'عند الولادة' 
                    : `${vaccine.recommendedAgeMonths} شهر`}
                </span>
              </div>
              {record.administeredDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ الإعطاء:</span>
                  <span className="font-medium text-green-700">
                    {formatDate(record.administeredDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Protection Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              يحمي من
            </h3>
            <div className="grid gap-2">
              {vaccine.protectsAgainst.map((disease, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">{disease}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              الآثار الجانبية المحتملة
            </h3>
            <div className="space-y-2">
              {vaccine.sideEffects.map((effect, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-yellow-800">{effect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Care Tips */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              نصائح الرعاية
            </h3>
            <div className="space-y-2">
              {vaccine.careTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-blue-800">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">وصف التطعيم</h3>
            <p className="text-gray-700 leading-relaxed">{vaccine.description}</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default VaccineDetailsModal;
