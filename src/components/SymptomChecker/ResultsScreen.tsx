
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Layout/Header';
import { AlertTriangle, Thermometer, Stethoscope, Home, Users, ArrowLeft } from 'lucide-react';

interface ResultsScreenProps {
  answers: Record<string, string>;
  onBack: () => void;
  onFindDoctor: () => void;
}

interface Outcome {
  title: string;
  description: string;
  urgency: 'urgent' | 'standard' | 'home';
  actions: string[];
  icon: React.ReactNode;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  answers,
  onBack,
  onFindDoctor
}) => {
  const getOutcome = (): Outcome => {
    const { age, fever_level, other_symptoms } = answers;

    // Outcome A: Urgent Care
    if (
      (age === 'under_3m' && fever_level === 'high') ||
      other_symptoms === 'convulsions' ||
      other_symptoms === 'breathing'
    ) {
      return {
        title: 'يتطلب رعاية طبية عاجلة',
        description: 'الأعراض المذكورة تتطلب تقييماً طبياً فورياً',
        urgency: 'urgent',
        actions: [
          'اتصل بطبيب الأطفال فوراً',
          'توجه إلى أقرب مستشفى إذا لزم الأمر',
          'لا تتأخر في طلب المساعدة الطبية'
        ],
        icon: <AlertTriangle className="h-6 w-6 text-red-600" />
      };
    }

    // Outcome B: Home Care
    if (
      age === 'over_1y' &&
      fever_level === 'moderate' &&
      other_symptoms === 'none'
    ) {
      return {
        title: 'قد تكون نزلة برد شائعة',
        description: 'يمكن متابعة العلاج في المنزل مع المراقبة',
        urgency: 'home',
        actions: [
          'الراحة والإكثار من السوائل',
          'مراقبة درجة الحرارة بانتظام',
          'استخدام كمادات ماء فاتر',
          'إعطاء خافض حرارة مناسب للعمر عند الحاجة'
        ],
        icon: <Home className="h-6 w-6 text-green-600" />
      };
    }

    // Outcome C: Standard Doctor Visit
    return {
      title: 'يُنصح بزيارة طبيب الأطفال',
      description: 'الأعراض تتطلب تقييماً طبياً للحصول على العلاج المناسب',
      urgency: 'standard',
      actions: [
        'احجز موعداً مع طبيب الأطفال',
        'راقب الأعراض وسجل أي تغييرات',
        'اتبع تعليمات الطبيب بدقة',
        'لا تتردد في العودة إذا ساءت الأعراض'
      ],
      icon: <Stethoscope className="h-6 w-6 text-blue-600" />
    };
  };

  const outcome = getOutcome();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'home': return 'border-green-200 bg-green-50';
      case 'standard': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="نتائج التحليل" />
      
      <div className="p-4 space-y-6">
        {/* Medical Disclaimer */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>تنبيه مهم:</strong> هذه ليست نصيحة طبية. المعلومات هنا إرشادية فقط ويجب دائماً استشارة طبيب متخصص.
          </AlertDescription>
        </Alert>

        {/* Results Card */}
        <Card className={`${getUrgencyColor(outcome.urgency)} border-2`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              {outcome.icon}
              <span>نتيجة التحليل</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">السبب المحتمل</h3>
              <p className="text-gray-700 text-sm">{outcome.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">الإجراءات الموصى بها</h3>
              <div className="space-y-2">
                {outcome.actions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs text-primary font-medium">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">ملخص الإجابات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {answers.primary_symptom && (
                <div className="flex justify-between">
                  <span className="text-gray-600">العرض الأساسي:</span>
                  <span className="font-medium">
                    {answers.primary_symptom === 'fever' ? 'حرارة' : 
                     answers.primary_symptom === 'cough' ? 'كحة' : 'طفح جلدي'}
                  </span>
                </div>
              )}
              {answers.age && (
                <div className="flex justify-between">
                  <span className="text-gray-600">العمر:</span>
                  <span className="font-medium">
                    {answers.age === 'under_3m' ? 'أقل من 3 أشهر' :
                     answers.age === '3_12m' ? '3 - 12 شهرًا' : 'أكبر من سنة'}
                  </span>
                </div>
              )}
              {answers.fever_level && (
                <div className="flex justify-between">
                  <span className="text-gray-600">مستوى الحرارة:</span>
                  <span className="font-medium">
                    {answers.fever_level === 'moderate' ? 'متوسطة' : 'عالية'}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onFindDoctor}
            className="w-full h-12 text-base"
          >
            <Users className="h-5 w-5 ml-2" />
            ابحث عن طبيب أطفال
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            إعادة التحليل
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
