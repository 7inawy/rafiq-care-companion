
import React, { useState } from 'react';
import { Search, MapPin, Phone, Navigation, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
}

interface NICUFinderProps {
  onBack: () => void;
}

const NICUFinder: React.FC<NICUFinderProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'مستشفى أبو الريش الياباني',
      address: 'المنيل، القاهرة',
      phone: '01234567890',
      availability: 'available',
      distance: '2.5 كم',
      rating: 4.8,
      type: 'government',
      cost: 'مجاني'
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
      cost: 'مجاني'
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
      cost: '1500-3000 ج.م'
    }
  ];

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
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">حكومي</Button>
            <Button variant="outline" size="sm">خاص</Button>
          </div>
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

        {/* Hospital List */}
        <div className="space-y-3">
          {hospitals.map((hospital) => (
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
                      onClick={() => window.open(`tel:${hospital.phone}`)}
                    >
                      <Phone className="h-4 w-4 ml-2" />
                      اتصال
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(`https://maps.google.com/search/${encodeURIComponent(hospital.address)}`)}
                    >
                      <Navigation className="h-4 w-4 ml-2" />
                      الاتجاهات
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map View Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {/* TODO: Implement map view */}}
        >
          عرض الخريطة
        </Button>
      </div>
    </div>
  );
};

export default NICUFinder;
