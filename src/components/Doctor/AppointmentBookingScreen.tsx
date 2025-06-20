
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, MapPin, Video, Home, CheckCircle } from 'lucide-react';
import Header from '@/components/Layout/Header';

interface AppointmentBookingScreenProps {
  doctorId: string;
  onBack: () => void;
  onBookingComplete: () => void;
}

const AppointmentBookingScreen: React.FC<AppointmentBookingScreenProps> = ({
  doctorId,
  onBack,
  onBookingComplete
}) => {
  const [selectedVisitType, setSelectedVisitType] = useState<'clinic' | 'home' | 'video'>('clinic');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);

  // Mock doctor data
  const doctor = {
    name: 'د. أحمد محمد',
    specialty: 'طب الأطفال',
    clinicAddress: 'شارع الجمهورية، المنصورة'
  };

  const visitTypes = [
    {
      id: 'clinic' as const,
      title: 'عيادة الطبيب',
      description: 'زيارة العيادة',
      icon: <MapPin className="h-5 w-5" />,
      price: '200 ج.م'
    },
    {
      id: 'home' as const,
      title: 'زيارة منزلية',
      description: 'الطبيب يأتي إليك',
      icon: <Home className="h-5 w-5" />,
      price: '400 ج.م'
    },
    {
      id: 'video' as const,
      title: 'استشارة فيديو',
      description: 'استشارة عبر الإنترنت',
      icon: <Video className="h-5 w-5" />,
      price: '150 ج.م'
    }
  ];

  const availableDates = [
    { date: '2024-12-25', dayName: 'الأربعاء' },
    { date: '2024-12-26', dayName: 'الخميس' },
    { date: '2024-12-27', dayName: 'الجمعة' },
    { date: '2024-12-28', dayName: 'السبت' },
    { date: '2024-12-29', dayName: 'الأحد' }
  ];

  const availableTimes = [
    '09:00 ص', '09:30 ص', '10:00 ص', '10:30 ص',
    '11:00 ص', '11:30 ص', '02:00 م', '02:30 م',
    '03:00 م', '03:30 م', '04:00 م', '04:30 م'
  ];

  const handleNext = () => {
    if (currentStep === 1 && selectedVisitType) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedDate) {
      setCurrentStep(3);
    } else if (currentStep === 3 && selectedTime) {
      setCurrentStep(4);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleConfirmBooking = () => {
    onBookingComplete();
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'اختر نوع الزيارة';
      case 2: return 'اختر التاريخ';
      case 3: return 'اختر الوقت';
      case 4: return 'تأكيد الحجز';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={getStepTitle()}
        onBack={handlePrevious}
        showProfile={false}
      />
      
      <div className="px-4 py-4 pb-24">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${currentStep >= step 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                {currentStep > step ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step
                )}
              </div>
              {step < 4 && (
                <div className={`w-8 h-px mx-2 ${
                  currentStep > step ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Doctor Info Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">👨‍⚕️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">اختر نوع الزيارة</h2>
            <RadioGroup value={selectedVisitType} onValueChange={(value) => setSelectedVisitType(value as any)}>
              {visitTypes.map((type) => (
                <Label key={type.id} htmlFor={type.id} className="cursor-pointer">
                  <Card className={`${selectedVisitType === type.id ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4 flex items-center space-x-3 space-x-reverse">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-primary">
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{type.title}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                        <Badge variant="outline" className="text-primary">
                          {type.price}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">اختر التاريخ</h2>
            <div className="grid grid-cols-1 gap-3">
              {availableDates.map((dateOption) => (
                <Button
                  key={dateOption.date}
                  variant={selectedDate === dateOption.date ? "default" : "outline"}
                  className="justify-between h-auto p-4"
                  onClick={() => setSelectedDate(dateOption.date)}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />
                    <div className="text-right">
                      <div className="font-semibold">{dateOption.dayName}</div>
                      <div className="text-sm opacity-75">
                        {new Date(dateOption.date).toLocaleDateString('ar-EG')}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">اختر الوقت</h2>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="h-12"
                  onClick={() => setSelectedTime(time)}
                >
                  <Clock className="h-4 w-4 ml-2" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">تأكيد الحجز</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ملخص الموعد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">الطبيب</span>
                  <span className="font-semibold">{doctor.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع الزيارة</span>
                  <span className="font-semibold">
                    {visitTypes.find(v => v.id === selectedVisitType)?.title}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">التاريخ</span>
                  <span className="font-semibold">
                    {availableDates.find(d => d.date === selectedDate)?.dayName} - {' '}
                    {selectedDate && new Date(selectedDate).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">الوقت</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>الإجمالي</span>
                    <span className="text-primary">
                      {visitTypes.find(v => v.id === selectedVisitType)?.price}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedVisitType === 'clinic' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">عنوان العيادة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{doctor.clinicAddress}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex-1"
          >
            {currentStep === 1 ? 'العودة' : 'السابق'}
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedVisitType) ||
                (currentStep === 2 && !selectedDate) ||
                (currentStep === 3 && !selectedTime)
              }
              className="flex-1"
            >
              التالي
            </Button>
          ) : (
            <Button 
              onClick={handleConfirmBooking}
              className="flex-1"
            >
              تأكيد الحجز
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingScreen;
