
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { GrowthRecord } from '@/types/growth';

interface AddMeasurementDialogProps {
  childId: string;
  onAdd: (record: Omit<GrowthRecord, 'id'>) => void;
}

const AddMeasurementDialog: React.FC<AddMeasurementDialogProps> = ({ childId, onAdd }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || !height || !headCircumference) {
      return;
    }

    const record: Omit<GrowthRecord, 'id'> = {
      childId,
      date,
      weight: parseFloat(weight),
      height: parseFloat(height),
      headCircumference: parseFloat(headCircumference)
    };

    onAdd(record);
    setOpen(false);
    setWeight('');
    setHeight('');
    setHeadCircumference('');
    setDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة قياس
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إضافة قياس جديد</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>التاريخ</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {format(date, 'dd/MM/yyyy')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">الوزن (كجم)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="مثال: 7.5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">الطول (سم)</Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="مثال: 65.5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headCircumference">محيط الرأس (سم)</Label>
            <Input
              id="headCircumference"
              type="number"
              step="0.1"
              value={headCircumference}
              onChange={(e) => setHeadCircumference(e.target.value)}
              placeholder="مثال: 42.0"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              حفظ القياس
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMeasurementDialog;
