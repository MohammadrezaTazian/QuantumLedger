import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const { sendCode, login } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  const handleSendCode = async () => {
    if (!phone) return;
    
    setIsLoading(true);
    try {
      await sendCode(phone);
      setStep("code");
    } catch (error) {
      console.error("Send code error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return;
    
    setIsLoading(true);
    try {
      // Clear any existing level selection
      localStorage.removeItem("selectedLevel");
      await login(phone, code);
      // Force redirect to level selection
      setLocation("/level-selection");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="text-white w-8 h-8" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {t.loginTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Educational Platform</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.phoneNumber}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="mt-2"
                />
              </div>
              
              <Button 
                onClick={handleSendCode} 
                disabled={!phone || isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {t.sendVerificationCode}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="code" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.verificationCode}
                </Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="12345"
                  maxLength={5}
                  className="mt-2 text-center text-lg tracking-wider"
                />
              </div>
              
              <Button 
                onClick={handleVerifyCode} 
                disabled={!code || isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {t.verify}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => setStep("phone")}
                className="w-full"
              >
                {t.resendCode}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
