
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Navigation, Filter, RefreshCw, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Layout/Header';

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  availability: 'available' | 'limited' | 'full';
  distance: string;
  rating: number;
  type: 'government' | 'private';
  cost: string;
  latitude?: number;
  longitude?: number;
}

interface NICUFinderProps {
  onBack: () => void;
}

// Mock API function - replace with actual API call
const fetchHospitals = async (): Promise<Hospital[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data - replace with actual API call
  return [
    {
      id: '1',
      name: 'مستشفى أبو الريش الياباني',
      address: 'المنيل، القاهرة',
      phone: '01234567890',
      availability: 'available',
      distance: '2.5 كم',
      rating: 4.8,
      type: 'government',
      cost: 'مجاني',
      latitude: 30.0444,
      longitude: 31.2357
    },
    {
      id: '2',
      name: 'مستشفى الشيخ زايد التخصصي',
      address: '6 أكتوبر، الجيزة',
      phone: '01234567891',
      availability: 'limited',
      distance: '12 كم',
      rating: 4.6,
      type: 'government',
      cost: 'مجاني',
      latitude: 30.0131,
      longitude: 30.9748
    },
    {
      id: '3',
      name: 'مستشفى دار الفؤاد',
      address: 'مدينة نصر، القاهرة',
      phone: '01234567892',
      availability: 'available',
      distance: '8.3 كم',
      rating: 4.9,
      type: 'private',
      cost: '1500-3000 ج.م',
      latitude: 30.0626,
      longitude: 31.3219
    },
    {
      id: '4',
      name: 'مستشفى كليوباترا',
      address: 'المعادي، القاهرة',
      phone: '01234567893',
      availability: 'full',
      distance: '15.2 كم',
      rating: 4.7,
      type: 'private',
      cost: '2000-4000 ج.م',
      latitude: 29.9602,
      longitude: 31.2569
    },
    {
      id: '5',
      name: 'مستشفى قصر العيني',
      address: 'قصر العيني، القاهرة',
      phone: '01234567894',
      availability: 'available',
      distance: '5.8 كم',
      rating: 4.5,
      type: 'government',
      cost: 'مجاني',
      latitude: 30.0444,
      longitude: 31.2357
    }
  ];
};

const NICUFinder: React.FC<NICUFinderProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'government' | 'private'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Fetch hospitals data using React Query
  const { 
    data: hospitals = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['hospitals'],
    queryFn: fetchHospitals,
  });

  // Filter and search logic
  const filteredHospitals = useMemo(() => {
    let filtered = hospitals;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(hospital => hospital.type === selectedType);
    }

    return filtered;
  }, [hospitals, searchQuery, selectedType]);

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">متاح</Badge>;
      case 'limited':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">محدود</Badge>;
      case 'full':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ممتلئ</Badge>;
      default:
        return null;
    }
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  // Loading skeleton component
  const HospitalSkeleton = () => (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Error state component
  const ErrorState = () => (
    <Card className="shadow-sm">
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center">
            <span className="text-2xl text-red-600">⚠️</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">خطأ في تحميل البيانات</h3>
            <p className="text-gray-600 mb-4">عذراً، حدث خطأ أثناء تحميل قائمة المستشفيات</p>
            <Button onClick={() => refetch()} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Simple map placeholder - replace with actual map implementation
  const MapView = () => (
    <Card className="shadow-sm">
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
            <Map className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">عرض الخريطة</h3>
            <p className="text-gray-600 mb-4">سيتم تطبيق عرض الخريطة التفاعلية قريباً</p>
            <p className="text-sm text-gray-500">عدد المستشفيات الظاهرة: {filteredHospitals.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="مراكز الحضانات" />
      
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث عن مستشفى أو منطقة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
            <Button 
              variant={selectedType === 'government' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType(selectedType === 'government' ? 'all' : 'government')}
            >
              حكومي
            </Button>
            <Button 
              variant={selectedType === 'private' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType(selectedType === 'private' ? 'all' : 'private')}
            >
              خاص
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="flex-1"
          >
            عرض القائمة
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
            className="flex-1"
          >
            عرض الخريطة
          </Button>
        </div>

        {/* Emergency Alert */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">🚨</span>
              </div>
              <div>
                <p className="font-semibold text-red-900">حالة طوارئ؟</p>
                <p className="text-sm text-red-700">اتصل بالرقم 123 للإسعاف الفوري</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        <div className="space-y-3">
          {/* Loading State */}
          {isLoading && (
            <>
              {[...Array(3)].map((_, index) => (
                <HospitalSkeleton key={index} />
              ))}
            </>
          )}

          {/* Error State */}
          {error && <ErrorState />}

          {/* Map View */}
          {!isLoading && !error && viewMode === 'map' && <MapView />}

          {/* List View */}
          {!isLoading && !error && viewMode === 'list' && (
            <>
              {filteredHospitals.length === 0 ? (
                <Card className="shadow-sm">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
                        <p className="text-gray-600">لم يتم العثور على مستشفيات تطابق معايير البحث</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredHospitals.map((hospital) => (
                  <Card key={hospital.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{hospital.address}</span>
                              <span className="text-primary">• {hospital.distance}</span>
                            </div>
                          </div>
                          {getAvailabilityBadge(hospital.availability)}
                        </div>

                        {/* Details */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="text-yellow-500">★ {hospital.rating}</span>
                            <Badge variant="outline" className="text-xs">
                              {hospital.type === 'government' ? 'حكومي' : 'خاص'}
                            </Badge>
                            <span className="text-gray-600">التكلفة: {hospital.cost}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-primary hover:bg-primary/90"
                            onClick={() => handleCall(hospital.phone)}
                          >
                            <Phone className="h-4 w-4 ml-2" />
                            اتصال
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleDirections(hospital.address)}
                          >
                            <Navigation className="h-4 w-4 ml-2" />
                            الاتجاهات
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}
        </div>

        {/* Results Summary */}
        {!isLoading && !error && viewMode === 'list' && filteredHospitals.length > 0 && (
          <div className="text-center text-sm text-gray-500 py-4">
            عرض {filteredHospitals.length} من {hospitals.length} مستشفى
          </div>
        )}
      </div>
    </div>
  );
};

export default NICUFinder;
