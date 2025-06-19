
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface MarkVaccineDoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  vaccineName: string;
}

const MarkVaccineDoneDialog: React.FC<MarkVaccineDoneDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  vaccineName
}) => {
  const [selectedDate,setSelectedDate] = useState<Date>(new Date());

  const handleConfirm = () => {
    onConfirm(selectedDate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-right">
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            تأكيد إعطاء التطعيم
          </DialogTitle>
          <DialogDescription className="text-right">
            متى تم إعطاء تطعيم "{vaccineName}"؟
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            className="rounded-md border w-full"
            locale={ar}
          />
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-right">
              التاريخ المحدد: {format(selectedDate, 'dd MMMM yyyy', { locale: ar })}
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
            تأكيد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkVaccineDoneDialog;
