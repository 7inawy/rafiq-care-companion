
import React, { useState } from 'react';
import LoginScreen from '@/components/Auth/LoginScreen';
import OTPScreen from '@/components/Auth/OTPScreen';
import DashboardScreen from '@/components/Dashboard/DashboardScreen';
import NICUFinder from '@/components/NICU/NICUFinder';
import VaccinationScreen from '@/components/Vaccination/VaccinationScreen';

type AppScreen = 'login' | 'otp' | 'dashboard' | 'nicu-finder' | 'vaccinations' | 'add-record' | 'book-doctor' | 'symptom-checker';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedChild] = useState({
    id: '1',
    name: 'سارة',
    age: '6 أشهر',
    birthDate: new Date('2024-06-01')
  });

  const handleScreenTransition = (screen: AppScreen, phone?: string) => {
    setCurrentScreen(screen);
    if (phone) setPhoneNumber(phone);
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
            onNavigate={(screen) => handleScreenTransition(screen as AppScreen)}
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
