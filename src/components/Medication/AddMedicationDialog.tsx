
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2 } from 'lucide-react';
import { Medication } from '@/types/medication';

interface AddMedicationDialogProps {
  childId: string;
  onAdd: (medication: Omit<Medication, 'id'>) => void;
}

const AddMedicationDialog: React.FC<AddMedicationDialogProps> = ({ childId, onAdd }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [dosageUnit, setDosageUnit] = useState<'ml' | 'tablet' | 'drops' | 'capsule' | 'mg'>('ml');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState('');
  const [frequencyType, setFrequencyType] = useState<'specific' | 'interval'>('specific');
  const [specificTimes, setSpecificTimes] = useState<string[]>(['08:00']);
  const [intervalHours, setIntervalHours] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !dosage || !duration) {
      return;
    }

    const medication: Omit<Medication, 'id'> = {
      childId,
      name,
      dosage,
      dosageUnit,
      reason,
      startDate: new Date(),
      duration: parseInt(duration),
      frequencyType,
      specificTimes: frequencyType === 'specific' ? specificTimes : undefined,
      intervalHours: frequencyType === 'interval' ? parseInt(intervalHours) : undefined,
      isActive: true
    };

    onAdd(medication);
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setName('');
    setDosage('');
    setDosageUnit('ml');
    setReason('');
    setDuration('');
    setFrequencyType('specific');
    setSpecificTimes(['08:00']);
    setIntervalHours('');
  };

  const addTimeSlot = () => {
    setSpecificTimes([...specificTimes, '12:00']);
  };

  const removeTimeSlot = (index: number) => {
    setSpecificTimes(specificTimes.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, time: string) => {
    const newTimes = [...specificTimes];
    newTimes[index] = time;
    setSpecificTimes(newTimes);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة دواء
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة دواء جديد</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم الدواء</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: بانادول"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="dosage">الجرعة</Label>
              <Input
                id="dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="مثال: 5"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>الوحدة</Label>
              <Select value={dosageUnit} onValueChange={(value: any) => setDosageUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ml">مل</SelectItem>
                  <SelectItem value="tablet">قرص</SelectItem>
                  <SelectItem value="drops">نقطة</SelectItem>
                  <SelectItem value="capsule">كبسولة</SelectItem>
                  <SelectItem value="mg">مجم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">السبب (اختياري)</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="مثال: حمى"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">مدة العلاج (بالأيام)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="مثال: 7"
              min="1"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>نوع الجدولة</Label>
            <RadioGroup value={frequencyType} onValueChange={(value: any) => setFrequencyType(value)}>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific">أوقات محددة</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="interval" id="interval" />
                <Label htmlFor="interval">كل عدد ساعات</Label>
              </div>
            </RadioGroup>
          </div>

          {frequencyType === 'specific' && (
            <div className="space-y-2">
              <Label>الأوقات</Label>
              {specificTimes.map((time, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => updateTimeSlot(index, e.target.value)}
                    className="flex-1"
                  />
                  {specificTimes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTimeSlot(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addTimeSlot} className="w-full">
                إضافة وقت
              </Button>
            </div>
          )}

          {frequencyType === 'interval' && (
            <div className="space-y-2">
              <Label htmlFor="intervalHours">عدد الساعات</Label>
              <Select value={intervalHours} onValueChange={setIntervalHours}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر عدد الساعات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">كل 4 ساعات</SelectItem>
                  <SelectItem value="6">كل 6 ساعات</SelectItem>
                  <SelectItem value="8">كل 8 ساعات</SelectItem>
                  <SelectItem value="12">كل 12 ساعة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              إضافة الدواء
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

export default AddMedicationDialog;
