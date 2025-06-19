
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DoctorFilters, AppointmentType } from '@/types/doctor';
import { specialties, cities } from '@/data/doctorsData';

interface DoctorFiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: DoctorFilters;
  onFiltersChange: (filters: DoctorFilters) => void;
}

const DoctorFiltersSheet: React.FC<DoctorFiltersSheetProps> = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange
}) => {
  const updateFilter = (key: keyof DoctorFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>فلترة النتائج</SheetTitle>
          <SheetDescription>
            اختر المعايير لتصفية قائمة الأطباء
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Specialty Filter */}
          <div className="space-y-2">
            <Label>التخصص</Label>
            <Select
              value={filters.specialty || ''}
              onValueChange={(value) => updateFilter('specialty', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر التخصص" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع التخصصات</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Filter */}
          <div className="space-y-2">
            <Label>المدينة</Label>
            <Select
              value={filters.city || ''}
              onValueChange={(value) => updateFilter('city', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع المدن</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Appointment Type Filter */}
          <div className="space-y-2">
            <Label>نوع الزيارة</Label>
            <Select
              value={filters.appointmentType || ''}
              onValueChange={(value) => updateFilter('appointmentType', value as AppointmentType || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الزيارة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الأنواع</SelectItem>
                <SelectItem value="clinic">زيارة العيادة</SelectItem>
                <SelectItem value="home">زيارة منزلية</SelectItem>
                <SelectItem value="video">مكالمة فيديو</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label>ترتيب حسب</Label>
            <Select
              value={filters.sortBy || ''}
              onValueChange={(value) => updateFilter('sortBy', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر طريقة الترتيب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">الافتراضي</SelectItem>
                <SelectItem value="rating">التقييم الأعلى</SelectItem>
                <SelectItem value="price">السعر الأقل</SelectItem>
                <SelectItem value="distance">الأقرب</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={clearFilters} variant="outline" className="flex-1">
              إزالة الفلاتر
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              تطبيق
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorFiltersSheet;
