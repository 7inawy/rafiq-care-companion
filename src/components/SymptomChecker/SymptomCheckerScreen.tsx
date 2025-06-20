
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Layout/Header';
import { ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuestionOption {
  id: string;
  text: string;
  value: string;
}

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

interface SymptomCheckerScreenProps {
  onBack: () => void;
  onGoToResults: (answers: Record<string, string>) => void;
}

const SymptomCheckerScreen: React.FC<SymptomCheckerScreenProps> = ({
  onBack,
  onGoToResults
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions: Question[] = [
    {
      id: 'primary_symptom',
      text: 'ما هو العرض الأساسي لطفلك؟',
      options: [
        { id: 'fever', text: 'حرارة', value: 'fever' },
        { id: 'cough', text: 'كحة', value: 'cough' },
        { id: 'rash', text: 'طفح جلدي', value: 'rash' }
      ]
    },
    {
      id: 'age',
      text: 'كم عمر الطفل؟',
      options: [
        { id: 'under_3m', text: 'أقل من 3 أشهر', value: 'under_3m' },
        { id: '3_12m', text: '3 - 12 شهرًا', value: '3_12m' },
        { id: 'over_1y', text: 'أكبر من سنة', value: 'over_1y' }
      ]
    },
    {
      id: 'fever_level',
      text: 'ما مستوى الحرارة؟',
      options: [
        { id: 'moderate', text: 'متوسطة (38-39°)', value: 'moderate' },
        { id: 'high', text: 'عالية (أكثر من 39°)', value: 'high' }
      ]
    },
    {
      id: 'other_symptoms',
      text: 'هل يوجد أعراض أخرى خطيرة؟',
      options: [
        { id: 'breathing', text: 'صعوبة في التنفس', value: 'breathing' },
        { id: 'convulsions', text: 'تشنجات', value: 'convulsions' },
        { id: 'none', text: 'لا يوجد', value: 'none' }
      ]
    }
  ];

  useEffect(() => {
    // Start conversation with welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: 'مرحباً! أنا هنا لمساعدتك في تحليل أعراض طفلك. سأطرح عليك بضعة أسئلة بسيطة.',
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    // Show first question after a delay
    setTimeout(() => {
      askQuestion(0);
    }, 1500);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const askQuestion = (questionIndex: number) => {
    if (questionIndex >= questions.length) {
      // End of questions, go to results
      onGoToResults(answers);
      return;
    }

    const question = questions[questionIndex];
    const questionMessage: Message = {
      id: `q_${questionIndex}`,
      text: question.text,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, questionMessage]);
    
    setTimeout(() => {
      setShowOptions(true);
    }, 800);
  };

  const handleOptionSelect = (option: QuestionOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Add user's answer to messages
    const answerMessage: Message = {
      id: `a_${currentQuestionIndex}`,
      text: option.text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, answerMessage]);
    
    // Store answer
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: option.value
    };
    setAnswers(newAnswers);

    // Hide options
    setShowOptions(false);

    // Move to next question or finish
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Skip fever level question if not fever
      if (currentQuestion.id === 'primary_symptom' && option.value !== 'fever') {
        // Skip to other symptoms question
        const skipToIndex = 3; // other_symptoms
        setCurrentQuestionIndex(skipToIndex);
        askQuestion(skipToIndex);
      } else {
        askQuestion(nextIndex);
      }
    }, 1000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="محلل الأعراض الذكي" />
      
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4 max-w-lg mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-white text-gray-900 rounded-bl-md shadow-sm border'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Options Area */}
        {showOptions && currentQuestion && (
          <div className="p-4 bg-white border-t">
            <div className="max-w-lg mx-auto">
              <div className="grid gap-2">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="justify-start h-auto p-3 text-right"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="p-4 border-t bg-white">
          <div className="max-w-lg mx-auto">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerScreen;
