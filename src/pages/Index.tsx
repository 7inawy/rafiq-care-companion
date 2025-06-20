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
import SymptomCheckerScreen from '@/components/SymptomChecker/SymptomCheckerScreen';
import ResultsScreen from '@/components/SymptomChecker/ResultsScreen';
import SensoryHubScreen from '@/components/Sensory/SensoryHubScreen';
import SensoryVideoScreen from '@/components/Sensory/SensoryVideoScreen';
import SensoryArticlesScreen from '@/components/Sensory/SensoryArticlesScreen';
import SensorySpecialistScreen from '@/components/Sensory/SensorySpecialistScreen';

type AppScreen = 'login' | 'otp' | 'dashboard' | 'nicu-finder' | 'vaccinations' | 'add-record' | 'book-doctor' | 'symptom-checker' | 'symptom-results' | 'doctor-directory' | 'doctor-profile' | 'book-appointment' | 'growth-charts' | 'medications' | 'sensory-hub' | 'sensory-videos' | 'sensory-articles' | 'sensory-specialists';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [symptomCheckerAnswers, setSymptomCheckerAnswers] = useState<Record<string, string>>({});
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

  const handleSymptomCheckerResults = (answers: Record<string, string>) => {
    setSymptomCheckerAnswers(answers);
    setCurrentScreen('symptom-results');
  };

  const handleFindDoctor = () => {
    setCurrentScreen('doctor-directory');
  };

  const handleSensoryNavigation = (screen: string) => {
    switch (screen) {
      case 'articles':
        setCurrentScreen('sensory-articles');
        break;
      case 'videos':
        setCurrentScreen('sensory-videos');
        break;
      case 'specialists':
        setCurrentScreen('sensory-specialists');
        break;
      case 'activities':
        // TODO: Implement activities screen
        break;
      case 'sensory-assessment':
        // TODO: Implement assessment screen
        break;
      default:
        break;
    }
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

      case 'symptom-checker':
        return (
          <SymptomCheckerScreen
            onBack={() => handleScreenTransition('dashboard')}
            onGoToResults={handleSymptomCheckerResults}
          />
        );

      case 'symptom-results':
        return (
          <ResultsScreen
            answers={symptomCheckerAnswers}
            onBack={() => handleScreenTransition('symptom-checker')}
            onFindDoctor={handleFindDoctor}
          />
        );

      case 'sensory-hub':
        return (
          <SensoryHubScreen
            onNavigate={handleSensoryNavigation}
            onBack={() => handleScreenTransition('dashboard')}
          />
        );

      case 'sensory-videos':
        return (
          <SensoryVideoScreen
            onBack={() => handleScreenTransition('sensory-hub')}
          />
        );

      case 'sensory-articles':
        return (
          <SensoryArticlesScreen
            onBack={() => handleScreenTransition('sensory-hub')}
            onNavigateToArticle={(articleId) => {
              // TODO: Implement article reader
              console.log('Navigate to article:', articleId);
            }}
          />
        );

      case 'sensory-specialists':
        return (
          <SensorySpecialistScreen
            onBack={() => handleScreenTransition('sensory-hub')}
            onNavigateToProfile={(specialistId) => {
              // TODO: Implement specialist profile
              console.log('Navigate to specialist:', specialistId);
            }}
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
