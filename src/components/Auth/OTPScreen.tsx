
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface OTPScreenProps {
  phoneNumber: string;
  onNext: () => void;
  onBack: () => void;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ phoneNumber, onNext, onBack }) => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(120);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1000);
  };

  const handleResend = () => {
    setCountdown(120);
    setOtp('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center">
            <span className="text-2xl text-white">📱</span>
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">تأكيد رقم الهاتف</CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              أدخل الرمز المرسل على الرقم
            </p>
            <p className="text-primary font-semibold">+20 {phoneNumber}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={setOtp}
                  dir="ltr"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading || otp.length !== 4}
              >
                {isLoading ? 'جاري التحقق...' : 'تأكيد'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              {countdown > 0 ? (
                <p className="text-gray-500 text-sm">
                  إعادة الإرسال خلال {formatTime(countdown)}
                </p>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleResend}
                  className="text-primary"
                >
                  إعادة إرسال الرمز
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-500"
              >
                تغيير رقم الهاتف
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPScreen;
