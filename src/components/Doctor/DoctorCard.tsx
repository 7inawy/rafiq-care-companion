
import React from 'react';
import { Star, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doctor } from '@/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={doctor.profilePhoto} alt={doctor.fullName} />
          <AvatarFallback className="bg-primary/10 text-primary text-lg">
            {doctor.fullName.split(' ')[1]?.charAt(0) || doctor.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{doctor.fullName}</h3>
          <p className="text-sm text-gray-600 mb-2">{doctor.primarySpecialty}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{doctor.overallRating}</span>
              <span className="text-xs text-gray-500">({doctor.totalReviews})</span>
            </div>
            <div className="text-sm text-gray-600">
              {doctor.yearsOfExperience} سنة خبرة
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-gray-500">يبدأ من </span>
              <span className="font-semibold text-primary">{doctor.consultationFeeStart} جنيه</span>
            </div>
            
            <div className="flex gap-1">
              {doctor.availableServices.includes('clinic') && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">عيادة</span>
              )}
              {doctor.availableServices.includes('home') && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">منزلي</span>
              )}
              {doctor.availableServices.includes('video') && (
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">فيديو</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
