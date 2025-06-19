
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Layout/Header';
import { Doctor, DoctorFilters } from '@/types/doctor';
import { mockDoctors, specialties } from '@/data/doctorsData';
import DoctorCard from './DoctorCard';
import DoctorFiltersSheet from './DoctorFiltersSheet';

interface DoctorDirectoryScreenProps {
  onBack: () => void;
  onDoctorSelect: (doctorId: string) => void;
}

const DoctorDirectoryScreen: React.FC<DoctorDirectoryScreenProps> = ({
  onBack,
  onDoctorSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<DoctorFilters>({});
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, [searchQuery, selectedSpecialty, filters]);

  const loadDoctors = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredDoctors = [...mockDoctors];

    // Apply search filter
    if (searchQuery) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.fullName.includes(searchQuery) ||
        doctor.primarySpecialty.includes(searchQuery) ||
        doctor.subSpecialties.some(sub => sub.includes(searchQuery))
      );
    }

    // Apply specialty filter
    if (selectedSpecialty) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.primarySpecialty === selectedSpecialty ||
        doctor.subSpecialties.includes(selectedSpecialty)
      );
    }

    // Apply additional filters
    if (filters.appointmentType) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.availableServices.includes(filters.appointmentType!)
      );
    }

    // Apply sorting
    if (filters.sortBy === 'rating') {
      filteredDoctors.sort((a, b) => b.overallRating - a.overallRating);
    } else if (filters.sortBy === 'price') {
      filteredDoctors.sort((a, b) => a.consultationFeeStart - b.consultationFeeStart);
    }

    setDoctors(filteredDoctors);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="دليل الأطباء" />
      
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="ابحث عن طبيب، تخصص، أو مستشفى..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Filter Button */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            فلترة
          </Button>
          <span className="text-sm text-gray-500">
            {doctors.length} طبيب متاح
          </span>
        </div>

        {/* Specialty Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedSpecialty === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSpecialty('')}
            className="whitespace-nowrap"
          >
            الكل
          </Button>
          {specialties.slice(0, 6).map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSpecialty(specialty)}
              className="whitespace-nowrap"
            >
              {specialty}
            </Button>
          ))}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {doctors.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">لم يتم العثور على أطباء</p>
                <p className="text-sm text-gray-400 mt-1">جرب البحث بكلمات مختلفة</p>
              </div>
            ) : (
              doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onClick={() => onDoctorSelect(doctor.id)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Filters Sheet */}
      <DoctorFiltersSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
};

export default DoctorDirectoryScreen;
