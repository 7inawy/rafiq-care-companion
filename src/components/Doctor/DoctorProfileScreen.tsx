
import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, MapPin, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Layout/Header';
import { Doctor, Clinic, Review } from '@/types/doctor';
import { mockDoctors, mockClinics, mockReviews } from '@/data/doctorsData';

interface DoctorProfileScreenProps {
  doctorId: string;
  onBack: () => void;
  onBookAppointment: (doctorId: string) => void;
}

const DoctorProfileScreen: React.FC<DoctorProfileScreenProps> = ({
  doctorId,
  onBack,
  onBookAppointment
}) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctorData();
  }, [doctorId]);

  const loadDoctorData = async () => {
    setIsLoading(true);
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const doctorData = mockDoctors.find(d => d.id === doctorId);
    const clinicData = mockClinics.filter(c => c.doctorId === doctorId);
    const reviewData = mockReviews.filter(r => r.doctorId === doctorId);
    
    setDoctor(doctorData || null);
    setClinics(clinicData);
    setReviews(reviewData);
    setIsLoading(false);
  };

  if (isLoading || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="الطبيب" />
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={doctor.fullName} />
      
      {/* Doctor Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={doctor.profilePhoto} alt={doctor.fullName} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {doctor.fullName.split(' ')[1]?.charAt(0) || doctor.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-1">{doctor.fullName}</h1>
              <p className="text-gray-600 mb-2">{doctor.primarySpecialty}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{doctor.overallRating}</span>
                  <span className="text-gray-500 text-sm">({doctor.totalReviews})</span>
                </div>
                <span className="text-gray-500 text-sm">{doctor.yearsOfExperience} سنة خبرة</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFollowing(!isFollowing)}
              className={isFollowing ? 'bg-red-50 text-red-600 border-red-200' : ''}
            >
              <Heart className={`h-4 w-4 ml-1 ${isFollowing ? 'fill-current' : ''}`} />
              {isFollowing ? 'متابع' : 'متابعة'}
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {doctor.availableServices.includes('clinic') && (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">زيارة العيادة</span>
            )}
            {doctor.availableServices.includes('home') && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">زيارة منزلية</span>
            )}
            {doctor.availableServices.includes('video') && (
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">مكالمة فيديو</span>
            )}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="p-4">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">عن الطبيب</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            <TabsTrigger value="locations">العناوين</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-4 mt-4">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-3">نبذة عن الطبيب</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{doctor.biography}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">المؤهلات</h4>
                  <ul className="space-y-1">
                    {doctor.qualifications.map((qual, index) => (
                      <li key={index} className="text-gray-600 text-sm">• {qual}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">التخصصات الفرعية</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.subSpecialties.map((specialty, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">اللغات</h4>
                  <p className="text-gray-600">{doctor.languagesSpoken.join('، ')}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4 mt-4">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">التقييمات ({reviews.length})</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{doctor.overallRating}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.parentName}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {review.reviewDate.toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="locations" className="space-y-4 mt-4">
            {clinics.map((clinic) => (
              <div key={clinic.id} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold mb-2">{clinic.name}</h3>
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">{clinic.address}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-600 text-sm">{clinic.phone}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    عرض على الخريطة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 ml-1" />
                    اتصال
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Booking Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          onClick={() => onBookAppointment(doctor.id)}
          className="w-full h-12 text-lg"
        >
          حجز موعد
          <span className="mr-2 text-sm">من {doctor.consultationFeeStart} جنيه</span>
        </Button>
      </div>
    </div>
  );
};

export default DoctorProfileScreen;
