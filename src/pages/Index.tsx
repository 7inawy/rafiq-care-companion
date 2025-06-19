
import React, { useState } from 'react';
import LoginScreen from '@/components/Auth/LoginScreen';
import OTPScreen from '@/components/Auth/OTPScreen';
import DashboardScreen from '@/components/Dashboard/DashboardScreen';
import NICUFinder from '@/components/NICU/NICUFinder';
import VaccinationScreen from '@/components/Vaccination/VaccinationScreen';
import DoctorDirectoryScreen from '@/components/Doctor/DoctorDirectoryScreen';
import DoctorProfileScreen from '@/components/Doctor/DoctorProfileScreen';
import GrowthScreen from '@/components/Growth/GrowthScreen';
import MedicationScreen from '@/components/Medication/MedicationScreen';

type AppScreen = 'login' | 'otp' | 'dashboard' | 'nicu-finder' | 'vaccinations' | 'add-record' | 'book-doctor' | 'symptom-checker' | 'doctor-directory' | 'doctor-profile' | 'book-appointment' | 'growth-charts' | 'medications';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedChild] = useState({
    id: '1',
    name: 'سارة',
    age: '6 أشهر',
    birthDate: new Date('2024-06-01'),
    gender: 'female' as const
  });

  const handleScreenTransition = (screen: AppScreen, phone?: string) => {
    setCurrentScreen(screen);
    if (phone) setPhoneNumber(phone);
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setCurrentScreen('doctor-profile');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onNext={() => handleScreenTransition('otp', '1234567890')} 
          />
        );
      
      case 'otp':
        return (
          <OTPScreen
            phoneNumber={phoneNumber}
            onNext={() => handleScreenTransition('dashboard')}
            onBack={() => handleScreenTransition('login')}
          />
        );
      
      case 'dashboard':
        return (
          <DashboardScreen 
            onNavigate={(screen) => {
              if (screen === 'book-doctor') {
                handleScreenTransition('doctor-directory');
              } else {
                handleScreenTransition(screen as AppScreen);
              }
            }}
          />
        );
      
      case 'nicu-finder':
        return (
          <NICUFinder 
            onBack={() => handleScreenTransition('dashboard')}
          />
        );

      case 'vaccinations':
        return (
          <VaccinationScreen
            onBack={() => handleScreenTransition('dashboard')}
            selectedChild={selectedChild}
          />
        );

      case 'doctor-directory':
        return (
          <DoctorDirectoryScreen
            onBack={() => handleScreenTransition('dashboard')}
            onDoctorSelect={handleDoctorSelect}
          />
        );

      case 'doctor-profile':
        return (
          <DoctorProfileScreen
            doctorId={selectedDoctorId}
            onBack={() => handleScreenTransition('doctor-directory')}
            onBookAppointment={(doctorId) => {
              setSelectedDoctorId(doctorId);
              handleScreenTransition('book-appointment');
            }}
          />
        );
      
      case 'growth-charts':
        return (
          <GrowthScreen
            selectedChild={selectedChild}
            onBack={() => handleScreenTransition('dashboard')}
          />
        );
      
      case 'medications':
        return (
          <MedicationScreen
            selectedChild={selectedChild}
            onBack={() => handleScreenTransition('dashboard')}
          />
        );
      
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-2xl text-white">🚧</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">قريباً</h2>
                <p className="text-gray-600 mt-2">هذه الميزة قيد التطوير</p>
                <button 
                  onClick={() => handleScreenTransition('dashboard')}
                  className="mt-4 text-primary underline"
                >
                  العودة للرئيسية
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="font-arabic" dir="rtl">
      {renderScreen()}
    </div>
  );
};

export default Index;
